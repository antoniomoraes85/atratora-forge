import { resolveTrack } from '../../engine/trackValidation';
import { VEHICLE_TYPE_LABELS, TIRE_CONDITION_LABELS, TRACK_TYPE_LABELS, SURFACE_LABELS, CONDITION_LABELS, CONTACT_MODE_LABELS, MEASUREMENT_METHOD_LABELS } from '../../utils/labels';
import React, { useMemo } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { computeMethods } from '../../engine/methodsEngine';
import type { ForensicAnalysis, AnalysisIssue } from '../../types/analysis';

interface Props {
  analysis: ForensicAnalysis;
  onCorrect: (issue: AnalysisIssue) => void;
  onChange: (partial: Partial<ForensicAnalysis>) => void;
}

export const WizardStepMetodos: React.FC<Props> = ({ analysis, onCorrect }) => {
  const methods = useMemo(() => computeMethods(analysis), [analysis]);

  const sufficient = methods.filter(m => m.status === 'suficiente');
  const auxiliary = methods.filter(m => m.status === 'auxiliar');
  const insufficient = methods.filter(m => m.status === 'insuficiente');

  const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
    if (status === 'suficiente') return <CheckCircle size={16} color="var(--success-text)" />;
    if (status === 'auxiliar') return <AlertTriangle size={16} color="#fbbf24" />;
    if (status === 'nao-disponivel') return <span>○</span>;
    return <XCircle size={16} color="var(--danger-text)" />;
  };

  const statusStyle = (status: string) => {
    if (status === 'suficiente') return { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', label: 'Aplicável', color: 'var(--success-text)' };
    if (status === 'auxiliar') return { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', label: 'Auxiliar', color: '#fbbf24' };
    if (status === 'nao-disponivel') return { bg: 'var(--bg-surface)', border: 'var(--border-default)', label: 'Não disponível nesta versão', color: 'var(--text-dim)' };
    return { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.15)', label: 'Dados insuficientes', color: 'var(--danger-text)' };
  };

  const MethodCard: React.FC<{ method: typeof methods[0] }> = ({ method }) => {
    const s = statusStyle(method.status);
    return (
      <div style={{
        padding: '16px 18px', borderRadius: 'var(--radius-md)',
        background: s.bg, border: `1px solid ${s.border}`,
        display: 'flex', alignItems: 'flex-start', gap: '12px',
      }}>
        <StatusIcon status={method.status} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {method.name}
            </span>
            <span style={{
              fontSize: '10px', fontWeight: 700, padding: '2px 6px',
              background: `${s.border}`, borderRadius: 'var(--radius-full)',
              color: s.color, textTransform: 'uppercase', letterSpacing: '0.04em',
              border: `1px solid ${s.border}`,
            }}>
              {s.label}
            </span>
            {method.isIndependent && method.status === 'suficiente' && (
              <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Independente</span>
            )}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {!method.issues?.length && method.availabilityReason}
          </p>
          {method.issues?.map((issue, i) => <div key={i}><p>{issue.message}</p><button onClick={() => onCorrect(issue)}>Corrigir agora</button></div>)}
          {method.minKmh !== undefined && (
            <div style={{ marginTop: '8px', display: 'flex', gap: '16px', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-dim)' }}>Min: <strong style={{ color: 'var(--text-muted)' }}>{method.minKmh} km/h</strong></span>
              <span style={{ color: '#38bdf8' }}>Central: <strong>{method.centralKmh} km/h</strong></span>
              <span style={{ color: 'var(--text-dim)' }}>Max: <strong style={{ color: 'var(--text-muted)' }}>{method.maxKmh} km/h</strong></span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <section>
        <h2>Dados considerados</h2>
        {analysis.tracks.map(t => {
          const v = analysis.vehicles.find(v => v.id === t.vehicleId);
          const { mu } = resolveTrack(t, analysis);
          return <div key={t.id} style={{ padding: '12px', marginTop: '8px', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
            <strong>{t.vehicleId} — {v ? VEHICLE_TYPE_LABELS[v.type] : 'Veículo não cadastrado'}</strong>
            <p>{TRACK_TYPE_LABELS[t.type]} — {t.distanceM || 'Distância não informada'} m</p>
            <p>{SURFACE_LABELS[t.surface] ?? 'Superfície não informada'} · {CONDITION_LABELS[t.condition] ?? 'Condição não informada'} · {CONTACT_MODE_LABELS[t.contactMode]}</p>
            <p>Pneus: {v ? TIRE_CONDITION_LABELS[v.tireCondition] : 'não informados'} · Inclinação: {analysis.road.gradePercent ?? 0}%</p>
            <p>µ adotado: {mu ? `${mu.muMin}–${mu.muMax} (central ${mu.muCentral})` : 'Pendente'}{t.frictionOverride ? ' · Manual' : ''}</p>
            <p>Medição: {MEASUREMENT_METHOD_LABELS[t.measurementMethod]}</p>
          </div>;
        })}
        {!analysis.tracks.length && <p>Nenhum trecho cadastrado.</p>}
      </section>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Métodos identificados</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Com base nos dados informados, o sistema identificou os seguintes métodos.
          Os métodos com dados suficientes serão utilizados no cálculo.
        </p>
      </div>

      {sufficient.length > 0 && (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--success-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            ✓ Aplicável ({sufficient.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sufficient.map(m => <MethodCard key={m.id} method={m} />)}
          </div>
        </div>
      )}

      {auxiliary.length > 0 && (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            △ Auxiliar ({auxiliary.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {auxiliary.map(m => <MethodCard key={m.id} method={m} />)}
          </div>
        </div>
      )}

      {insufficient.length > 0 && (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            ✕ Dados insuficientes ({insufficient.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {insufficient.map(m => <MethodCard key={m.id} method={m} />)}
          </div>
        </div>
      )}

      <section><h3>○ Não disponível nesta versão</h3>{methods.filter(m => m.status === 'nao-disponivel').map(m => <MethodCard key={m.id} method={m} />)}</section>
      {methods.length === 0 && (
        <div style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--bg-surface)', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Nenhum método identificado. Volte e informe vestígios com distância e superfície.
          </p>
        </div>
      )}

      {sufficient.length > 0 && sufficient.filter(m => m.isIndependent).length < 2 && (
        <div style={{ padding: '12px 16px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--warning-text)' }}>
          Apenas {sufficient.filter(m => m.isIndependent).length} método(s) independente(s) com dados suficientes.
          ICA e IAE não serão aferível(is). Para calcular convergência, informe pelo menos 2 métodos independentes
          (ex.: frenagem + registro eletrônico).
        </div>
      )}
    </div>
  );
};
