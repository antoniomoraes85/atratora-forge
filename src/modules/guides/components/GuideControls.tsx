import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, X } from 'lucide-react';

interface GuideControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onRestart: () => void;
  onExit: () => void;
  canGoNext?: boolean;
}

export const GuideControls: React.FC<GuideControlsProps> = ({
  currentStepIndex,
  totalSteps,
  onNext,
  onPrev,
  onRestart,
  onExit,
  canGoNext = true
}) => {
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === totalSteps - 1;

  return (
    <div className="guide-controls-container">
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onExit}
          className="btn btn-ghost"
          style={{ fontSize: '13px', padding: '8px 12px', minHeight: '44px' }}
          aria-label="Sair do guia"
        >
          <X size={16} /> <span className="hide-on-mobile">Sair</span>
        </button>
        <button
          onClick={onRestart}
          className="btn btn-ghost"
          style={{ fontSize: '13px', padding: '8px 12px', display: isFirst ? 'none' : 'flex', minHeight: '44px' }}
        >
          <RotateCcw size={16} /> <span className="hide-on-mobile">Reiniciar</span>
        </button>
      </div>

      <div className="guide-controls-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginRight: '8px' }} className="hide-on-mobile">
          Passo {currentStepIndex + 1} de {totalSteps}
        </div>
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="btn btn-secondary"
          style={{ padding: '8px 16px', opacity: isFirst ? 0.5 : 1, minHeight: '44px' }}
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="btn btn-primary"
          style={{ padding: '8px 24px', opacity: !canGoNext ? 0.5 : 1, minHeight: '44px' }}
        >
          {isLast ? 'Concluir' : 'Próximo'} <ArrowRight size={16} style={{ marginLeft: '4px' }} />
        </button>
      </div>
    </div>
  );
};
