import React from 'react';
import { GuideStep } from '../../../app/config/guides';

interface GuideStepperProps {
  steps: GuideStep[];
  currentStepIndex: number;
  onStepSelect: (index: number) => void;
}

export const GuideStepper: React.FC<GuideStepperProps> = ({ steps, currentStepIndex, onStepSelect }) => {
  const displayedStep = Math.min(steps.length, Math.max(0, currentStepIndex + 1));

  return (
    <div className="guide-stepper-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Progresso
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>
          Passo {displayedStep} de {steps.length}
        </div>
        
        {/* Barra de progresso */}
        <div
          role="progressbar"
          aria-label="Progresso do guia"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={steps.length ? (displayedStep / steps.length) * 100 : 0}
          style={{ display: 'flex', gap: '4px', marginTop: '8px' }}
        >
          {steps.map((_, idx) => (
            <div
              key={idx}
              style={{
                height: '4px',
                flex: 1,
                borderRadius: '2px',
                backgroundColor: idx <= currentStepIndex ? 'var(--primary-500)' : 'var(--bg-glass-card)',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      <div className="guide-step-list" style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPast = idx < currentStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onStepSelect(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                border: '1px solid',
                borderColor: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                opacity: isPast ? 0.7 : 1,
              }}
              aria-current={isActive ? 'step' : undefined}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: isActive ? 'var(--primary-500)' : isPast ? 'var(--bg-surface)' : 'transparent',
                  color: isActive || isPast ? '#fff' : 'var(--text-dim)',
                  border: `1px solid ${isActive ? 'var(--primary-500)' : 'var(--border-subtle)'}`,
                }}
              >
                {isPast ? '✓' : idx + 1}
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--primary-400)' : 'var(--text-main)',
                }}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
