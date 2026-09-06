import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GUIDES_CATALOG } from '../../../app/config/guides';
import { GuideStepper } from './GuideStepper';
import { GuideControls } from './GuideControls';
import { GuideStage } from './GuideStage';
import { GuideCompletion } from './GuideCompletion';
import { TourOverlay } from './TourOverlay';

// Para o CroquiConverter, vamos injetar dinamicamente se for ele o requisitado
const CroquiConverterLazy = React.lazy(() => import('../../../pages/CroquiConverter/CroquiConverter').then(m => ({ default: m.CroquiConverter })));

export const InteractiveGuide: React.FC = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Compatibilidade com links anteriores; o catálogo usa slugs sem sufixo.
  const resolvedId = guideId?.replace(/-guide$/, '');
  const guide = GUIDES_CATALOG.find(g => g.id === resolvedId);

  // Keybindings
  useEffect(() => {
    if (!guide) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar se o usuário estiver digitando em um input real
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        navigate('/guides');
      } else if (e.key === 'ArrowRight') {
        if (currentStepIndex < guide.steps.length) setCurrentStepIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guide, currentStepIndex, navigate]);

  if (!guide) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-main)' }}>Guia não encontrado</h2>
        <button onClick={() => navigate('/guides')} className="btn btn-secondary" style={{ marginTop: '20px' }}>Voltar aos Guias</button>
      </div>
    );
  }

  const steps = guide.steps;
  const isCompleted = currentStepIndex >= steps.length;
  const currentStep = !isCompleted ? steps[currentStepIndex] : null;

  const handleNext = () => setCurrentStepIndex(prev => prev + 1);
  const handlePrev = () => setCurrentStepIndex(prev => prev - 1);
  const handleRestart = () => setCurrentStepIndex(0);
  const handleExit = () => navigate('/guides');

  const isRealTool = guide.toolId === 'croqui-converter';

  // Gating simples baseado no DOM da ferramenta real
  let canGoNext = true;
  let showSpotlight = true;
  
  if (isRealTool && currentStep) {
    // 1. Upload: só avança se a imagem já estiver no preview
    if (currentStep.target === 'upload') {
      canGoNext = !!document.querySelector('[data-guide="preview"] img');
    }
    // 2. Generate: botão de próximo sempre livre, mas o usuário deve clicar em gerar na tela real
    else if (currentStep.target === 'generate') {
      canGoNext = true; // Botão de gerar na própria ferramenta
    }
    // 3. Result: só avança e só tem spotlight se existir o painel de resultado
    else if (currentStep.target === 'result') {
      const hasResult = !!document.querySelector('[data-guide="result"]');
      canGoNext = hasResult;
      showSpotlight = hasResult;
    }
    // 4. Download: só avança se tiver resultado
    else if (currentStep.target === 'download') {
      const hasResult = !!document.querySelector('[data-guide="result"]');
      canGoNext = hasResult;
      showSpotlight = hasResult;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--header-height))', margin: '-40px' }}>
      
      {/* Header do Guia */}
      <div style={{ padding: '16px 24px', backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--primary-400)', textTransform: 'uppercase' }}>
            Tutorial Interativo
          </span>
          <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            {guide.title}
          </h1>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 600 }}>
          Duração estimada: {guide.duration}
        </div>
      </div>

      {/* Corpo */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Painel Lateral de Passos (Stepper) */}
        <div style={{ width: '280px', backgroundColor: 'var(--bg-primary)', padding: '24px 0 24px 24px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <GuideStepper 
            steps={steps} 
            currentStepIndex={currentStepIndex} 
            onStepSelect={(idx) => setCurrentStepIndex(idx)} 
          />
        </div>

        {/* Palco Principal */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-surface)', position: 'relative' }}>
          
          {isCompleted ? (
             <GuideCompletion guide={guide} onRestart={handleRestart} />
          ) : (
             <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <GuideStage step={currentStep!}>
                  {/* Se for o CroquiConverter, montamos a interface real dele atrás do overlay e limitamos interações */}
                  {isRealTool && (
                     <div style={{ width: '100%', height: '100%', overflowY: 'auto', position: 'relative' }}>
                       <Suspense fallback={<div style={{ padding: '20px' }}>Carregando ferramenta...</div>}>
                         <CroquiConverterLazy />
                       </Suspense>
                     </div>
                  )}
                </GuideStage>
                <GuideControls 
                  currentStepIndex={currentStepIndex} 
                  totalSteps={steps.length}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onRestart={handleRestart}
                  onExit={handleExit}
                  canGoNext={canGoNext}
                />
             </div>
          )}

          {/* Overlay de Spotlight (só desenha se não estiver completado e tivermos um highlightTarget válido) */}
          {!isCompleted && currentStep?.target && currentStep.target !== 'none' && showSpotlight && (
             <TourOverlay 
               targetId={currentStep.target} 
               isActive={true} 
             />
          )}

        </div>
      </div>
    </div>
  );
};
