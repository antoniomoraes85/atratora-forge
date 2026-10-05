import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Info, CarFront, Ruler, Droplets, CheckCircle2 } from 'lucide-react';
import type { ForensicAnalysis, TrackSegment, TrackType, TrackMoment, MeasurementMethod, DataSource, ContactMode } from '../../types/analysis';
import type { SurfaceType, SurfaceCondition } from '../../data/technicalBase';
import {
  TRACK_TYPE_LABELS, TRACK_MOMENT_LABELS, MEASUREMENT_METHOD_LABELS,
  DATA_SOURCE_LABELS, CONTACT_MODE_LABELS, SURFACE_LABELS, CONDITION_LABELS,
  SURFACE_OPTIONS, CONDITION_OPTIONS,
} from '../../utils/labels';
import { resolveTrack } from '../../engine/trackValidation';
import type { AnalysisIssue } from '../../types/analysis';

interface Props {
  analysis: ForensicAnalysis;
  correction?: AnalysisIssue;
  onChange: (partial: Partial<ForensicAnalysis>) => void;
}

function createTrack(vehicleId: string): TrackSegment {
  return {
    id: crypto.randomUUID(),
    type: 'frenagem',
    vehicleId,
    moment: 'nao-determinado',
    distanceM: 0,
    surface: 'asfalto',
    condition: 'seca',
    contactMode: 'pneus',
    measurementMethod: 'trena',
    dataSource: 'medicao-direta',
  };
}

const Field: React.FC<{ label: string; tooltip?: string; children: React.ReactNode }> = ({ label, tooltip, children }) => (
  <div>
    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {label}
      {tooltip && <span title={tooltip} style={{ color: 'var(--text-dim)', cursor: 'help' }}>ⓘ</span>}
    </label>
    {children}
  </div>
);

export const WizardStepVestigios: React.FC<Props> = ({ analysis, onChange, correction }) => {
  const [expanded, setExpanded] = useState<string | null>(analysis.tracks[0]?.id ?? null);

  useEffect(() => {
    if (correction?.trackId) setExpanded(correction.trackId);
  }, [correction]);
  useEffect(() => {
    if (!correction) return;
    const element = document.getElementById(correction.trackId ? `${correction.trackId}-${correction.field}` : correction.field);
    element?.scrollIntoView({ block: 'center' });
    element?.focus();
  }, [correction, expanded]);

  const updateTrack = (id: string, partial: Partial<TrackSegment>) => {
    onChange({ tracks: analysis.tracks.map(t => t.id === id ? { ...t, ...partial, parameterRefId: ['surface', 'condition', 'contactMode', 'vehicleId', 'type'].some(k => k in partial) ? undefined : ('parameterRefId' in partial ? partial.parameterRefId : t.parameterRefId) } : t) });
  };

  const addTrack = () => {
    const vehicleId = analysis.vehicles[0]?.id ?? 'V1';
    const newTrack = { ...createTrack(vehicleId), surface: analysis.road.surface, condition: analysis.road.condition };
    onChange({ tracks: [...analysis.tracks, newTrack] });
    setExpanded(newTrack.id);
  };

  const removeTrack = (id: string) => {
    onChange({ tracks: analysis.tracks.filter(t => t.id !== id) });
    if (expanded === id) setExpanded(null);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Vestígios</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
          Cadastre cada trecho de vestígio identificado. O sistema sugerirá o coeficiente de atrito automaticamente.
        </p>
      </div>

      <div style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid rgba(56,189,248,.2)', background: 'linear-gradient(110deg, rgba(56,189,248,.1), rgba(56,189,248,.02))' }}>
        <strong style={{ display: 'block', marginBottom: 10 }}>O que torna um vestígio calculável?</strong>
        <span style={{ display: 'block', marginBottom: 10, fontSize: 12, color: 'var(--text-dim)' }}>Obrigatórios para calcular</span>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: 12 }}>
          <span><CarFront size={14} /> veículo</span><span><Ruler size={14} /> distância medida</span><span><Droplets size={14} /> superfície e condição</span><span><CheckCircle2 size={14} /> coeficiente compatível</span>
        </div>
      </div>
      {analysis.tracks.map((track) => {
        const { parameter: suggestedMu, candidates, mu, issues } = resolveTrack(track, analysis);
        const isExpanded = expanded === track.id;

        return (
          <div
            key={track.id}
            style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
            }}
          >
            {/* Header colapsável */}
            <div
              onClick={() => setExpanded(isExpanded ? null : track.id)}
              style={{
                padding: '16px 20px', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', cursor: 'pointer',
                background: isExpanded ? 'var(--bg-elevated)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '11px', fontWeight: 700, padding: '2px 8px',
                  background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.25)',
                  borderRadius: 'var(--radius-full)', color: '#38bdf8',
                }}>
                  {track.vehicleId}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {TRACK_TYPE_LABELS[track.type]}
                </span>
                {track.distanceM > 0 && (
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                    {track.distanceM} m
                  </span>
                )}
                {mu && (
                  <span style={{ fontSize: '11px', color: '#38bdf8', padding: '2px 6px', background: 'rgba(56,189,248,0.1)', borderRadius: '4px' }}>
                    µ={mu.muCentral}
                  </span>
                )}
                {!mu && (
                  <span style={{ fontSize: '11px', color: 'var(--warning-text)', padding: '2px 6px', background: 'var(--warning-bg)', borderRadius: '4px' }}>
                    {candidates.length > 1 ? 'Escolha o coeficiente' : 'Parâmetro não cadastrado'}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={e => { e.stopPropagation(); removeTrack(track.id); }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--danger-text)', cursor: 'pointer', padding: '2px' }}
                >
                  <Trash2 size={14} />
                </button>
                {isExpanded ? <ChevronUp size={16} color="var(--text-dim)" /> : <ChevronDown size={16} color="var(--text-dim)" />}
              </div>
            </div>

            <div role="status" style={{ padding: '8px 20px', color: issues.length ? 'var(--warning-text)' : 'var(--success-text)' }}>
              {issues.length ? `⚠ ${issues.length === 1 ? 'Falta 1 informação' : `Faltam ${issues.length} informações`}: ${issues.map(i => i.message).join(' ')}` : '✓ Dados suficientes para cálculo'}
            </div>
            {/* Campos expandidos */}
            {isExpanded && (
              <div style={{ padding: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                  <Field label="Tipo *">
                    <select id={`${track.id}-type`} aria-label="type" value={track.type} onChange={e => updateTrack(track.id, { type: e.target.value as TrackType, contactMode: e.target.value === 'motocicleta-tombada' ? 'motocicleta-tombada' : e.target.value === 'sobre-teto' ? 'teto' : e.target.value === 'deslizamento-lateral' ? 'lateral' : 'pneus' })} style={{ width: '100%' }}>
                      {Object.entries(TRACK_TYPE_LABELS).map(([k, lbl]) => (
                        <option key={k} value={k}>{lbl}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Veículo *">
                    <select id={`${track.id}-vehicleId`} aria-label="vehicleId" value={track.vehicleId} onChange={e => updateTrack(track.id, { vehicleId: e.target.value })} style={{ width: '100%' }}>
                      <option value="">Selecione o veículo</option>
                      {analysis.vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.id}</option>
                      ))}

                    </select>
                  </Field>

                  <Field label="Momento">
                    <select value={track.moment} onChange={e => updateTrack(track.id, { moment: e.target.value as TrackMoment })} style={{ width: '100%' }}>
                      {Object.entries(TRACK_MOMENT_LABELS).map(([k, lbl]) => (
                        <option key={k} value={k}>{lbl}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Distância (m) *" tooltip="Comprimento efetivamente medido entre início e fim do vestígio.">
                    <input
                      id={`${track.id}-distanceM`} aria-label="Distância do vestígio" type="number"
                      value={track.distanceM || ''}
                      onChange={e => updateTrack(track.id, { distanceM: Number(e.target.value) })}
                      placeholder="Ex.: 42.3"
                      min={0}
                      step={0.1}
                      style={{ width: '100%' }}
                    />
                  </Field>

                  <Field label="Superfície *">
                    <select id={`${track.id}-surface`} aria-label="surface" value={track.surface} onChange={e => updateTrack(track.id, { surface: e.target.value as SurfaceType })} style={{ width: '100%' }}>
                      {SURFACE_OPTIONS.map(s => (
                        <option key={s} value={s}>{SURFACE_LABELS[s]}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Condição *">
                    <select id={`${track.id}-condition`} aria-label="condition" value={track.condition} onChange={e => updateTrack(track.id, { condition: e.target.value as SurfaceCondition })} style={{ width: '100%' }}>
                      {CONDITION_OPTIONS.map(c => (
                        <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Modo de contato">
                    <select id={`${track.id}-contactMode`} aria-label="contactMode" value={track.contactMode} onChange={e => updateTrack(track.id, { contactMode: e.target.value as ContactMode })} style={{ width: '100%' }}>
                      {Object.entries(CONTACT_MODE_LABELS).map(([k, lbl]) => (
                        <option key={k} value={k}>{lbl}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Método de medição">
                    <select value={track.measurementMethod} onChange={e => updateTrack(track.id, { measurementMethod: e.target.value as MeasurementMethod })} style={{ width: '100%' }}>
                      {Object.entries(MEASUREMENT_METHOD_LABELS).map(([k, lbl]) => (
                        <option key={k} value={k}>{lbl}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Fonte dos dados">
                    <select value={track.dataSource} onChange={e => updateTrack(track.id, { dataSource: e.target.value as DataSource })} style={{ width: '100%' }}>
                      {Object.entries(DATA_SOURCE_LABELS).map(([k, lbl]) => (
                        <option key={k} value={k}>{lbl}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {candidates.length > 1 && !track.frictionOverride && <Field label="Escolher coeficiente compatível">
                  <p>As opções diferem por veículo, pneus ou condições de aplicação. Escolha conforme o observado.</p>
                  <select id={`${track.id}-parameterRefId`} aria-label="Coeficiente compatível" value={suggestedMu?.id ?? ''} onChange={e => updateTrack(track.id, { parameterRefId: e.target.value })}>
                    <option value="">Selecione o parâmetro</option>
                    {candidates.map(p => <option key={p.id} value={p.id}>{p.vehicleType ?? 'Veículos em geral'} · pneus {p.tireCondition ?? 'não específicos'} · µ {p.muMin} / {p.muCentral} / {p.muMax} · {p.note ?? p.id}</option>)}
                  </select>
                </Field>}
                {/* Coeficiente sugerido */}
                <div style={{
                  padding: '14px 16px',
                  background: suggestedMu ? 'rgba(56,189,248,0.07)' : 'var(--warning-bg)',
                  border: `1px solid ${suggestedMu ? 'rgba(56,189,248,0.2)' : 'var(--warning-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Info size={14} color={suggestedMu ? '#38bdf8' : 'var(--warning-text)'} />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: suggestedMu ? '#38bdf8' : 'var(--warning-text)' }}>
                      {track.frictionOverride ? 'Coeficiente manual adotado' : 'Coeficiente sugerido'}
                    </span>
                  </div>
                  {mu ? (
                    <div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-dim)' }}>Min: <strong style={{ color: 'var(--text-primary)' }}>{mu.muMin}</strong></span>
                        <span style={{ color: '#38bdf8' }}>Central: <strong>{mu.muCentral}</strong></span>
                        <span style={{ color: 'var(--text-dim)' }}>Max: <strong style={{ color: 'var(--text-primary)' }}>{mu.muMax}</strong></span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                        {track.frictionOverride ? `Fonte externa: ${track.frictionOverride.source}` : <details><summary>Fonte técnica disponível</summary>{suggestedMu?.source} — {suggestedMu?.chapter}<br />{suggestedMu?.note}</details>}
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: 'var(--warning-text)' }}>
                      {candidates.length > 1 ? 'Escolha uma das opções compatíveis acima.' : 'Nenhum coeficiente compatível foi encontrado na base técnica. Informe manualmente com fonte e justificativa.'}
                    </div>
                  )}
                </div>

                {/* Override manual */}
                <div style={{ marginTop: '14px' }}>
                  <details open={!!track.frictionOverride || correction?.field === 'frictionOverride' || correction?.field === 'parameterRefId'}>
                    <summary id={`${track.id}-${candidates.length === 0 && correction?.field === 'parameterRefId' ? 'parameterRefId' : 'frictionOverride'}`} tabIndex={-1} style={{ fontSize: '12px', color: 'var(--text-dim)', cursor: 'pointer', fontWeight: 600 }}>
                      Substituir coeficiente manualmente (parâmetro externo)
                    </summary>
                    {track.frictionOverride && <button onClick={() => updateTrack(track.id, { frictionOverride: undefined })}>Usar coeficiente da base técnica</button>}
                    <div style={{ paddingTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                      <Field label="µ mínimo">
                        <input type="number" step={0.01} min={0} max={2}
                          value={track.frictionOverride?.muMin ?? ''}
                          onChange={e => updateTrack(track.id, { frictionOverride: { ...track.frictionOverride, muMin: Number(e.target.value), muCentral: track.frictionOverride?.muCentral ?? 0, muMax: track.frictionOverride?.muMax ?? 0, source: track.frictionOverride?.source ?? '', justification: track.frictionOverride?.justification ?? '' } })}
                          placeholder="0.00" style={{ width: '100%' }}
                        />
                      </Field>
                      <Field label="µ central">
                        <input type="number" step={0.01} min={0} max={2}
                          value={track.frictionOverride?.muCentral ?? ''}
                          onChange={e => updateTrack(track.id, { frictionOverride: { ...track.frictionOverride, muMin: track.frictionOverride?.muMin ?? 0, muCentral: Number(e.target.value), muMax: track.frictionOverride?.muMax ?? 0, source: track.frictionOverride?.source ?? '', justification: track.frictionOverride?.justification ?? '' } })}
                          placeholder="0.00" style={{ width: '100%' }}
                        />
                      </Field>
                      <Field label="µ máximo">
                        <input type="number" step={0.01} min={0} max={2}
                          value={track.frictionOverride?.muMax ?? ''}
                          onChange={e => updateTrack(track.id, { frictionOverride: { ...track.frictionOverride, muMin: track.frictionOverride?.muMin ?? 0, muCentral: track.frictionOverride?.muCentral ?? 0, muMax: Number(e.target.value), source: track.frictionOverride?.source ?? '', justification: track.frictionOverride?.justification ?? '' } })}
                          placeholder="0.00" style={{ width: '100%' }}
                        />
                      </Field>
                      <Field label="Fonte *">
                        <input type="text"
                          value={track.frictionOverride?.source ?? ''}
                          onChange={e => updateTrack(track.id, { frictionOverride: { ...track.frictionOverride, muMin: track.frictionOverride?.muMin ?? 0, muCentral: track.frictionOverride?.muCentral ?? 0, muMax: track.frictionOverride?.muMax ?? 0, source: e.target.value, justification: track.frictionOverride?.justification ?? '' } })}
                          placeholder="Ex.: Ensaio UFSC 2024"
                          style={{ width: '100%' }}
                        />
                      </Field>
                      <Field label="Justificativa *">
                        <input type="text"
                          value={track.frictionOverride?.justification ?? ''}
                          onChange={e => updateTrack(track.id, { frictionOverride: { ...track.frictionOverride, muMin: track.frictionOverride?.muMin ?? 0, muCentral: track.frictionOverride?.muCentral ?? 0, muMax: track.frictionOverride?.muMax ?? 0, source: track.frictionOverride?.source ?? '', justification: e.target.value } })}
                          placeholder="Razão técnica para adoção do valor"
                          style={{ width: '100%' }}
                        />
                      </Field>
                    </div>
                  </details>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        id="add-track" onClick={addTrack}
        disabled={analysis.vehicles.length === 0}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 20px', border: '1px dashed var(--border-default)',
          borderRadius: 'var(--radius-md)', background: 'transparent',
          color: analysis.vehicles.length === 0 ? 'var(--text-dim)' : 'var(--text-muted)',
          fontSize: '13px', fontWeight: 600,
          cursor: analysis.vehicles.length === 0 ? 'not-allowed' : 'pointer',
          opacity: analysis.vehicles.length === 0 ? 0.5 : 1,
        }}
      >
        <PlusCircle size={16} /> Adicionar trecho
      </button>

      {analysis.vehicles.length === 0 && (
        <div style={{ fontSize: '12px', color: 'var(--warning-text)', padding: '10px 14px', background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-sm)' }}>
          Cadastre pelo menos um veículo antes de adicionar vestígios.
        </div>
      )}
    </div>
  );
};
