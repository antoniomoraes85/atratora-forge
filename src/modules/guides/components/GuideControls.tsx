import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, X } from 'lucide-react';

interface GuideControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export const GuideControls: React.FC<GuideControlsProps> = ({
  currentStepIndex,
  totalSteps,
  onNext,
  onPrev,
  onRestart,
  onExit
}) => {
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === totalSteps - 1;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
      }}
    >
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onExit}
          className="btn btn-ghost"
          style={{ fontSize: '13px', padding: '8px 12px' }}
          aria-label="Sair do guia"
        >
          <X size={16} /> Sair
        </button>
        <button
          onClick={onRestart}
          className="btn btn-ghost"
          style={{ fontSize: '13px', padding: '8px 12px', display: isFirst ? 'none' : 'flex' }}
        >
          <RotateCcw size={16} /> Reiniciar
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginRight: '8px' }}>
          Passo {currentStepIndex + 1} de {totalSteps}
        </div>
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="btn btn-secondary"
          style={{ padding: '8px 16px', opacity: isFirst ? 0.5 : 1 }}
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <button
          onClick={onNext}
          className="btn btn-primary"
          style={{ padding: '8px 24px' }}
        >
          {isLast ? 'Concluir' : 'Próximo'} <ArrowRight size={16} style={{ marginLeft: '4px' }} />
        </button>
      </div>
    </div>
  );
};
