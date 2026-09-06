import React from 'react';
import { GuideDefinition } from '../../../app/config/guides';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GuideCompletionProps {
  guide: GuideDefinition;
  onRestart: () => void;
}

export const GuideCompletion: React.FC<GuideCompletionProps> = ({ guide, onRestart }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        textAlign: 'center',
        flex: 1,
        animation: 'fadeIn 0.5s ease-out'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--success-text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
        }}
      >
        <CheckCircle2 size={32} />
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
        Tutorial concluído
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--text-dim)', marginBottom: '32px' }}>
        Você concluiu o guia do {guide.title}.
      </p>

      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          textAlign: 'left',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '40px'
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Você aprendeu:
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {guide.steps.filter(s => s.target && s.target !== 'none').slice(0, 5).map((step) => (
            <li key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={16} color="var(--success-text)" />
              {step.title}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {guide.status === 'available' && guide.toolId && (
          <button
            onClick={() => navigate(`/tools/${guide.toolId}`)}
            className="btn btn-primary"
            style={{ padding: '12px 24px' }}
          >
            Usar ferramenta <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
        )}
        <button
          onClick={onRestart}
          className="btn btn-outline"
          style={{ padding: '12px 24px' }}
        >
          Reiniciar tutorial
        </button>
        <button
          onClick={() => navigate('/guides')}
          className="btn btn-ghost"
          style={{ padding: '12px 24px' }}
        >
          <Home size={16} style={{ marginRight: '8px' }} /> Voltar aos Guias
        </button>
      </div>
    </div>
  );
};
