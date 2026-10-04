import React, { useMemo, useState } from 'react';
import { Info, ChevronDown, ChevronUp, Save, AlertTriangle } from 'lucide-react';
import { computeMethods, computeIndices, generateTechnicalSummary } from '../../engine/methodsEngine';
import { classifyIFT } from '../../engine/calculator';
import { aggregateSpeedRanges } from '../../engine/calculator';
import type { ForensicAnalysis } from '../../types/analysis';

interface Props {
  analysis: ForensicAnalysis;
  onSave: () => void;
}

const IFT_LABELS = {
  'muito-elevada': { label: 'Muito elevada', color: 'var(--success-text)', bg: 'rgba(16,185,129,0.1)' },
  'elevada': { label: 'Elevada', color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
  'moderada': { label: 'Moderada', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
  'baixa': { label: 'Baixa', color: '#fb923c', bg: 'rgba(251,146,60,0.1)' },
  'insuficiente': { label: 'Insuficiente para conclusão robusta', color: 'var(--danger-text)', bg: 'var(--danger-bg)' },
};

export const WizardStepResultado: React.FC<Props> = ({ analysis, onSave }) => {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);

  const methods = useMemo(() => computeMethods(analysis), [analysis]);
  const { ift, ica, iae } = useMemo(() => computeIndices(analysis, methods), [analysis, methods]);
  const technicalSummary = useMemo(() => generateTechnicalSummary(analysis, methods, ift, ica, iae), [analysis, methods, ift, ica, iae]);

  const independentQuantitative = methods.filter(
    m => m.isIndependent && m.status === 'suficiente' && m.centralKmh !== undefined
  );

  const aggregated = useMemo(() => {
    if (independentQuantitative.length === 0) return null;
    return aggregateSpeedRanges(independentQuantitative.map(m => ({
      minKmh: m.minKmh ?? 0,
      centralKmh: m.centralKmh ?? 0,
      maxKmh: m.maxKmh ?? 0,
    })));
  }, [independentQuantitative]);

  const iftClass = classifyIFT(ift);
  const iftStyle = IFT_LABELS[iftClass];

  // Lacunas
  const gaps: string[] = [];
  if (!analysis.road.gradePercent) gaps.push('Inclinação da via (melhora precisão do cálculo)');
  if (analysis.vehicles.some(v => !v.massKg)) gaps.push('Massa do(s) veículo(s) (necessária para método de momentum)');
  if (!analysis.electronicRecords.length) gaps.push('Registro eletrônico (EDR, tacógrafo, GPS)');
  if (analysis.tracks.some(t => t.measurementMethod === 'estimativa-visual')) gaps.push('Substituição de estimativa visual por medição instrumental');
  if (analysis.road.sceneCondition === 'desfeito') gaps.push('Documentação de cena (limitada pela preservação)');

  // Intervalo visual (interval plot SVG simplificado)
  const IntervalBar: React.FC<{ min: number; central: number; max: number; label: string; color: string }> = ({ min, central, max, label, color }) => {
    const allVals = independentQuantitative.flatMap(m => [m.minKmh ?? 0, m.maxKmh ?? 0]);
    const globalMin = Math.min(...allVals, min) * 0.85;
    const globalMax = Math.max(...allVals, max) * 1.08;
    const range = globalMax - globalMin || 1;
    const toX = (v: number) => ((v - globalMin) / range) * 100;

    return (
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginBottom: '4px' }}>{label}</div>
        <div style={{ position: 'relative', height: '28px' }}>
          <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, height: '2px', background: 'var(--border-subtle)' }} />
          {/* Range bar */}
          <div style={{
            position: 'absolute', top: '8px', height: '10px',
            left: `${toX(min)}%`, width: `${toX(max) - toX(min)}%`,
            background: `${color}30`, border: `1px solid ${color}60`,
            borderRadius: '3px',
          }} />
          {/* Min */}
          <div style={{ position: 'absolute', top: '4px', left: `${toX(min)}%`, transform: 'translateX(-50%)' }}>
            <div style={{ width: '2px', height: '18px', background: color, margin: '0 auto' }} />
          </div>
          {/* Central */}
          <div style={{ position: 'absolute', top: '2px', left: `${toX(central)}%`, transform: 'translateX(-50%)' }}>
            <div style={{ width: '4px', height: '22px', background: color, borderRadius: '2px', margin: '0 auto' }} />
          </div>
          {/* Max */}
          <div style={{ position: 'absolute', top: '4px', left: `${toX(max)}%`, transform: 'translateX(-50%)' }}>
            <div style={{ width: '2px', height: '18px', background: color, margin: '0 auto' }} />
          </div>
          {/* Labels */}
          <div style={{ position: 'absolute', top: '0', left: `${toX(min)}%`, transform: 'translateX(-50%)', fontSize: '9px', color, whiteSpace: 'nowrap' }}>{min}</div>
          <div style={{ position: 'absolute', top: '0', left: `${toX(central)}%`, transform: 'translateX(-50%)', fontSize: '10px', fontWeight: 700, color, whiteSpace: 'nowrap' }}>{central}</div>
          <div style={{ position: 'absolute', top: '0', left: `${toX(max)}%`, transform: 'translateX(-50%)', fontSize: '9px', color, whiteSpace: 'nowrap' }}>{max}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Resultado da análise</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
            {independentQuantitative.length} método(s) independente(s) quantitativo(s)
          </p>
        </div>
        <button
          onClick={onSave}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 18px', border: '1px solid rgba(16,185,129,0.4)',
            borderRadius: 'var(--radius-md)', background: 'rgba(16,185,129,0.1)',
            color: 'var(--success-text)', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          <Save size={15} /> Salvar análise
        </button>
      </div>

      {/* Resultado principal */}
      {aggregated ? (
        <div style={{
          padding: '28px', borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(99,102,241,0.06))',
          border: '1px solid rgba(56,189,248,0.2)',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            VELOCIDADE ESTIMADA — {analysis.vehicles[0]?.id ?? 'V1'}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '20px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{aggregated.minKmh}</span>
            <span style={{ fontSize: '14px', color: 'var(--text-dim)' }}>—</span>
            <span style={{ fontSize: '44px', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{aggregated.centralKmh}</span>
            <span style={{ fontSize: '14px', color: 'var(--text-dim)' }}>—</span>
            <span style={{ fontSize: '20px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{aggregated.maxKmh}</span>
            <span style={{ fontSize: '18px', color: 'var(--text-dim)', marginLeft: '4px' }}>km/h</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
            mínimo &nbsp;·&nbsp; valor central de referência &nbsp;·&nbsp; máximo
          </div>
        </div>
      ) : (
        <div style={{ padding: '28px', textAlign: 'center', background: 'var(--bg-surface)', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-md)' }}>
          <AlertTriangle size={32} style={{ color: 'var(--warning-text)', margin: '0 auto 12px' }} />
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Nenhum método independente com dados suficientes. Retorne e informe vestígios com distância e superfície.
          </p>
        </div>
      )}

      {/* Interval plot */}
      {independentQuantitative.length > 0 && (
        <div style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Gráfico de intervalos
          </div>
          {independentQuantitative.map((m, i) => (
            <IntervalBar
              key={m.id}
              min={m.minKmh ?? 0}
              central={m.centralKmh ?? 0}
              max={m.maxKmh ?? 0}
              label={m.name}
              color={i === 0 ? '#38bdf8' : '#c084fc'}
            />
          ))}
          {aggregated && (
            <IntervalBar
              min={aggregated.minKmh}
              central={aggregated.centralKmh}
              max={aggregated.maxKmh}
              label="▶ Resultado consolidado"
              color="var(--success-text)"
            />
          )}
          {analysis.road.speedLimitKmh && (
            <div style={{ fontSize: '11px', color: 'var(--warning-text)', marginTop: '8px' }}>
              Velocidade regulamentar: {analysis.road.speedLimitKmh} km/h (não altera o cálculo)
            </div>
          )}
        </div>
      )}

      {/* Índices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        {/* IFT */}
        <div style={{ padding: '18px', background: iftStyle.bg, border: `1px solid ${iftStyle.color}30`, borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            IFT — Fidedignidade Técnica
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: iftStyle.color, lineHeight: 1, marginBottom: '4px' }}>
            {ift.toFixed(0)}%
          </div>
          <div style={{ fontSize: '12px', color: iftStyle.color }}>{iftStyle.label}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '8px', lineHeight: 1.4 }}>
            Índice interno de qualidade dos dados. Não representa probabilidade de acerto.
          </div>
        </div>

        {/* ICA */}
        <div style={{ padding: '18px', background: ica !== null ? 'rgba(99,102,241,0.08)' : 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            ICA — Convergência Analítica
          </div>
          {ica !== null ? (
            <>
              <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary-400)', lineHeight: 1, marginBottom: '4px' }}>{ica.toFixed(0)}%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{independentQuantitative.length} métodos independentes</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dim)', lineHeight: 1, marginBottom: '4px' }}>Não aferível</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Requer ≥ 2 métodos independentes</div>
            </>
          )}
          <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '8px', lineHeight: 1.4 }}>
            Não representa probabilidade científica de acerto.
          </div>
        </div>

        {/* IAE */}
        <div style={{ padding: '18px', background: iae !== null ? 'rgba(52,211,153,0.06)' : 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            IAE — Assertividade da Estimativa
          </div>
          {iae !== null ? (
            <>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#34d399', lineHeight: 1, marginBottom: '4px' }}>{iae.toFixed(0)}%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>0,60×IFT + 0,40×ICA</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dim)', lineHeight: 1, marginBottom: '4px' }}>Não aferível</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Requer ICA disponível</div>
            </>
          )}
          <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '8px', lineHeight: 1.4 }}>
            Índice técnico interno de robustez.
          </div>
        </div>
      </div>

      {/* Resultado por método */}
      {methods.filter(m => m.status !== 'insuficiente').length > 0 && (
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
            Resultado por método
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)' }}>
                  {['Método', 'Mín.', 'Central', 'Máx.', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {methods.filter(m => m.status !== 'insuficiente').map(m => (
                  <React.Fragment key={m.id}>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', opacity: m.status === 'auxiliar' ? 0.7 : 1 }}>
                      <td style={{ padding: '10px 12px', color: 'var(--text-primary)', fontWeight: 500 }}>{m.name}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        {m.minKmh !== undefined ? `${m.minKmh} km/h` : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', color: '#38bdf8', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {m.centralKmh !== undefined ? `${m.centralKmh} km/h` : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        {m.maxKmh !== undefined ? `${m.maxKmh} km/h` : '—'}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{
                          fontSize: '10px', fontWeight: 700, padding: '2px 6px',
                          background: m.status === 'suficiente' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                          border: `1px solid ${m.status === 'suficiente' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
                          borderRadius: 'var(--radius-full)',
                          color: m.status === 'suficiente' ? 'var(--success-text)' : '#fbbf24',
                          textTransform: 'uppercase',
                        }}>
                          {m.status === 'suficiente' ? 'Calculado' : 'Auxiliar'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {m.formula && (
                          <button
                            onClick={() => setExpandedMethod(expandedMethod === m.id ? null : m.id)}
                            style={{ fontSize: '11px', color: 'var(--primary-400)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
                          >
                            Como foi calculado?
                            {expandedMethod === m.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedMethod === m.id && m.formula && (
                      <tr style={{ background: 'var(--bg-surface)' }}>
                        <td colSpan={6} style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>Fórmula</div>
                              <code style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'var(--font-mono)', display: 'block', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                {m.formula}
                              </code>
                            </div>
                            {m.variables && Object.keys(m.variables).length > 0 && (
                              <div>
                                <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>Variáveis e valores</div>
                                {Object.entries(m.variables).map(([k, v]) => (
                                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                    <span>{k}</span>
                                    <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{v}</strong>
                                  </div>
                                ))}
                              </div>
                            )}
                            {m.parameterRef && (
                              <div>
                                <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>Parâmetro e fonte</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{m.parameterRef}</div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lacunas */}
      {gaps.length > 0 && (
        <div style={{ padding: '18px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Info size={16} color="var(--text-dim)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
              Dados que poderiam melhorar esta estimativa
            </span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {gaps.map(g => (
              <li key={g} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-dim)', flexShrink: 0, marginTop: '6px' }} />
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Texto técnico */}
      <div style={{ padding: '18px 20px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
          Texto técnico (gerado automaticamente)
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
          "{technicalSummary}"
        </p>
        <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '10px' }}>
          Este texto é gerado automaticamente. Revise antes de utilizar em documentos técnicos.
          Não inclui atribuição de culpa, responsabilidade ou certeza absoluta.
        </div>
      </div>
    </div>
  );
};
