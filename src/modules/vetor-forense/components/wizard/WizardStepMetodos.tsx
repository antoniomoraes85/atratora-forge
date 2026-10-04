import React, { useMemo } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { computeMethods } from '../../engine/methodsEngine';
import type { ForensicAnalysis } from '../../types/analysis';

interface Props {
  analysis: ForensicAnalysis;
  onChange: (partial: Partial<ForensicAnalysis>) => void;
}

export const WizardStepMetodos: React.FC<Props> = ({ analysis }) => {
  const methods = useMemo(() => computeMethods(analysis), [analysis]);

  const sufficient = methods.filter(m => m.status === 'suficiente');
  const auxiliary = methods.filter(m => m.status === 'auxiliar');
  const insufficient = methods.filter(m => m.status === 'insuficiente');

  const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
    if (status === 'suficiente') return <CheckCircle size={16} color="var(--success-text)" />;
    if (status === 'auxiliar') return <AlertTriangle size={16} color="#fbbf24" />;
    return <XCircle size={16} color="var(--danger-text)" />;
  };

  const statusStyle = (status: string) => {
    if (status === 'suficiente') return { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', label: 'Dados suficientes', color: 'var(--success-text)' };
    if (status === 'auxiliar') return { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', label: 'Indicador auxiliar', color: '#fbbf24' };
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
            {method.availabilityReason}
          </p>
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
            ✓ Disponíveis para cálculo ({sufficient.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sufficient.map(m => <MethodCard key={m.id} method={m} />)}
          </div>
        </div>
      )}

      {auxiliary.length > 0 && (
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            △ Indicadores auxiliares ({auxiliary.length})
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.6 }}>
            {insufficient.map(m => <MethodCard key={m.id} method={m} />)}
          </div>
        </div>
      )}

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
