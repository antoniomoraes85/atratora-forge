import React from 'react';
import { FileText, Hash, CalendarDays, ShieldCheck } from 'lucide-react';
import type { ForensicAnalysis } from '../../types/analysis';

interface Props {
  analysis: ForensicAnalysis;
  onChange: (partial: Partial<ForensicAnalysis>) => void;
}

export const WizardStepCaso: React.FC<Props> = ({ analysis, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Dados do caso</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
          Informações básicas de identificação da análise.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <FileText size={14} color="#38bdf8" /> Título da análise *
          </label>
          <input
            type="text"
            value={analysis.title}
            onChange={e => onChange({ title: e.target.value })}
            placeholder="Ex.: Caso 001/2025 — Colisão traseira"
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Hash size={14} color="#a78bfa" /> Nº do caso (opcional)
          </label>
          <input
            type="text"
            value={analysis.caseNumber ?? ''}
            onChange={e => onChange({ caseNumber: e.target.value })}
            placeholder="Ex.: 001/2025"
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <CalendarDays size={14} color="#34d399" /> Data do sinistro (opcional)
          </label>
          <input
            type="date"
            value={analysis.date}
            onChange={e => onChange({ date: e.target.value })}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div style={{
        padding: '14px 16px', background: 'rgba(56,189,248,0.06)',
        border: '1px solid rgba(56,189,248,0.15)', borderRadius: 'var(--radius-sm)',
        fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--info-text)', display: 'inline-flex', alignItems: 'center', gap: 5 }}><ShieldCheck size={14} /> Privacidade:</strong>{' '}
        Todos os dados são armazenados exclusivamente neste dispositivo.
        Nenhuma informação é transmitida a servidores externos.
      </div>
    </div>
  );
};
