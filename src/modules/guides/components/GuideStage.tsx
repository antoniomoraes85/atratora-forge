import React, { useEffect, useState } from 'react';
import { GuideStep } from '../../../app/config/guides';
import { Info, Lightbulb, AlertTriangle } from 'lucide-react';

interface GuideStageProps {
  step: GuideStep;
  children?: React.ReactNode;
}

export const GuideStage: React.FC<GuideStageProps> = ({ step, children }) => {
  const [animationKey, setAnimationKey] = useState(0);

  // Forçar re-render das animações a cada passo
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [step.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Container de Demonstração Visual */}
      <div
        key={animationKey} // reseta animações
        style={{
          flex: 1,
          backgroundColor: 'var(--bg-primary)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          animation: 'fadeIn 0.4s ease-out'
        }}
      >
        {/* Renderização simulada se for stageType (guia conceitual) */}
        {step.stage && (
          <ConceptualSimulation stageType={step.stage} />
        )}
        {/* Se a ferramenta real for injetada via children, ela aparece aqui (caso do CroquiConverter na pág de guia) */}
        {children}
      </div>

      {/* Painel Didático (Explicação do passo atual) */}
      <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-surface)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          {step.title}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: step.tip || step.whyItMatters ? '20px' : '0' }}>
          {step.description}
        </p>

        {(step.tip || step.whyItMatters) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {step.tip && (
              <div style={{ display: 'flex', gap: '12px', padding: '16px', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <Info size={18} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Explicação</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.5 }}>{step.tip}</div>
                </div>
              </div>
            )}
            
            {step.whyItMatters && (
              <div style={{ display: 'flex', gap: '12px', padding: '16px', backgroundColor: 'rgba(234, 179, 8, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                <Lightbulb size={18} style={{ color: '#facc15', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#facc15', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Por que isso importa?</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.5 }}>{step.whyItMatters}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente helper para renderizar simulações esquemáticas genéricas baseadas no stageType
const ConceptualSimulation: React.FC<{ stageType: string }> = ({ stageType }) => {
  // Uma caixa abstrata com ícones / animações de acordo com a área
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '500px',
        height: '300px',
        border: '1px dashed var(--border-highlight)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-glass-card)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      <AlertTriangle size={32} style={{ color: 'var(--text-dim)', marginBottom: '16px' }} />
      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
        Simulação em Ambiente de Teste
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        Demonstração do estágio: <code>{stageType}</code>
      </div>
      
      {/* Elemento de animação "pulso" didático */}
      <div 
        style={{
          marginTop: '32px',
          width: '60px',
          height: '6px',
          borderRadius: '3px',
          backgroundColor: 'var(--primary-500)',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      />
    </div>
  );
};
