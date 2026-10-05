import { hasQuantitativeResult } from '../engine/trackValidation';
import type { AnalysisIssue } from '../types/analysis';
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Save, Check } from 'lucide-react';
import { saveAnalysis, loadAnalyses } from '../store/localStore';
import { computeMethods, computeIndices, generateTechnicalSummary } from '../engine/methodsEngine';
import type { ForensicAnalysis, WizardStep, RoadInfo } from '../types/analysis';
import type { VFTab } from './VetorForense';

import { WizardStepCaso } from './wizard/WizardStepCaso';
import { WizardStepElementos } from './wizard/WizardStepElementos';
import { WizardStepVeiculos } from './wizard/WizardStepVeiculos';
import { WizardStepVia } from './wizard/WizardStepVia';
import { WizardStepVestigios } from './wizard/WizardStepVestigios';
import { WizardStepMetodos } from './wizard/WizardStepMetodos';
import { WizardStepResultado } from './wizard/WizardStepResultado';

const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: 'caso', label: 'Caso' },
  { id: 'elementos', label: 'Elementos' },
  { id: 'veiculos', label: 'Veículos' },
  { id: 'via', label: 'Via' },
  { id: 'vestigios', label: 'Vestígios' },
  { id: 'metodos', label: 'Métodos' },
  { id: 'resultado', label: 'Resultado' },
];

function createEmptyAnalysis(): ForensicAnalysis {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: 'Nova análise',
    date: new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' }),
    createdAt: now,
    updatedAt: now,
    availableElements: [],
    vehicles: [],
    road: {
      surface: 'asfalto',
      condition: 'seca',
      geometry: 'nao-determinada',
      profile: 'nivel',
      dayPhase: 'nao-determinada',
      visibility: 'nao-determinada',
      sceneCondition: 'nao-determinado',
    } as RoadInfo,
    tracks: [],
    damages: [],
    electronicRecords: [],
    methods: [],
  };
}

interface VFNewAnalysisProps {
  analysisId: string | null;
  onNavigate: (tab: VFTab) => void;
}

export const VFNewAnalysis: React.FC<VFNewAnalysisProps> = ({ analysisId }) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('caso');
  const [analysis, setAnalysis] = useState<ForensicAnalysis>(() => {
    if (analysisId) {
      const existing = loadAnalyses().find(a => a.id === analysisId);
      if (existing) return existing;
    }
    return createEmptyAnalysis();
  });
  const [correction, setCorrection] = useState<AnalysisIssue>();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Recarregar se analysisId mudar
    if (analysisId) {
      const existing = loadAnalyses().find(a => a.id === analysisId);
      if (existing) {
        setAnalysis(existing);
        setCurrentStep('caso');
      }
    } else {
      setAnalysis(createEmptyAnalysis());
      setCurrentStep('caso');
    }
  }, [analysisId]);

  const update = (partial: Partial<ForensicAnalysis>) => {
    setAnalysis(prev => ({ ...prev, ...partial }));
    setSaved(false);
  };

  const handleSave = () => {
    // Recalcula métodos e índices antes de salvar
    const methods = computeMethods(analysis);
    const { ift, ica, iae, iftInput } = computeIndices(analysis, methods);
    const technicalSummary = generateTechnicalSummary(analysis, methods, ift, ica, iae);

    const updated: ForensicAnalysis = {
      ...analysis,
      methods,
      ift,
      ica,
      iae,
      iftInput,
      technicalSummary,
      updatedAt: new Date().toISOString(),
    };
    setAnalysis(updated);
    saveAnalysis(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const stepIndex = WIZARD_STEPS.findIndex(s => s.id === currentStep);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === WIZARD_STEPS.length - 1;

  const currentMethods = computeMethods(analysis);
  const canShowResult = hasQuantitativeResult(currentMethods);
  const issues = currentMethods.flatMap(m => m.issues ?? []);
  const correct = (issue: AnalysisIssue) => {
    setCorrection(issue);
    setCurrentStep(issue.step);
    if (issue.step !== 'vestigios') setTimeout(() => document.getElementById(issue.field)?.focus(), 0);
  };
  const navigateStep = (step: WizardStep) => setCurrentStep(step === 'resultado' && !canShowResult ? 'metodos' : step);

  const goNext = () => {
    if (!isLast) {
      navigateStep(WIZARD_STEPS[stepIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const goPrev = () => {
    if (!isFirst) {
      setCurrentStep(WIZARD_STEPS[stepIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '0', overflowX: 'auto', paddingBottom: '4px' }}>
        {WIZARD_STEPS.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isDone = idx < stepIndex;
          return (
            <button
              key={step.id}
              onClick={() => navigateStep(step.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', border: 'none',
                borderBottom: isActive ? '2px solid #38bdf8' : '2px solid var(--border-subtle)',
                background: 'transparent',
                color: isActive ? '#38bdf8' : isDone ? 'var(--success-text)' : 'var(--text-dim)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
              }}
            >
              {isDone ? <Check size={13} /> : (
                <span style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: isActive ? 'rgba(56,189,248,0.2)' : 'transparent',
                  border: `1px solid ${isActive ? '#38bdf8' : 'var(--border-default)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700, color: isActive ? '#38bdf8' : 'var(--text-dim)',
                  flexShrink: 0,
                }}>
                  {idx + 1}
                </span>
              )}
              {step.label}
            </button>
          );
        })}
      </div>

      {/* Conteúdo da etapa */}
      <div>
        {currentStep === 'caso' && (
          <WizardStepCaso analysis={analysis} onChange={update} />
        )}
        {currentStep === 'elementos' && (
          <WizardStepElementos analysis={analysis} onChange={update} />
        )}
        {currentStep === 'veiculos' && (
          <WizardStepVeiculos analysis={analysis} onChange={update} />
        )}
        {currentStep === 'via' && (
          <WizardStepVia analysis={analysis} onChange={update} />
        )}
        {currentStep === 'vestigios' && (
          <WizardStepVestigios correction={correction} analysis={analysis} onChange={update} />
        )}
        {currentStep === 'metodos' && (
          <WizardStepMetodos onCorrect={correct} analysis={analysis} onChange={update} />
        )}
        {currentStep === 'resultado' && canShowResult && (
          <WizardStepResultado analysis={analysis} onSave={handleSave} />
        )}
      </div>

      {currentStep === 'metodos' && !canShowResult && <section role="alert">
        <h2>Ainda não é possível estimar a velocidade</h2>
        <p>{issues.length ? `Faltam ${issues.length} informações:` : 'Cadastre um vestígio de método implementado com distância e coeficiente válido.'}</p>
        <ul>{issues.map((issue, i) => <li key={i}>{issue.message}</li>)}</ul>
        <button onClick={() => correct(issues[0] ?? { step: analysis.vehicles.length ? 'vestigios' : 'veiculos', field: 'add-track', message: '' })}>Corrigir dados</button>
        <button onClick={handleSave}>{saved ? 'Salvo!' : 'Salvar e continuar depois'}</button>
      </section>}
      {/* Controles */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '20px', borderTop: '1px solid var(--border-subtle)',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <button
          onClick={goPrev}
          disabled={isFirst}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '10px 18px', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)', background: 'transparent',
            color: isFirst ? 'var(--text-dim)' : 'var(--text-muted)',
            fontSize: '13px', fontWeight: 600,
            cursor: isFirst ? 'not-allowed' : 'pointer', opacity: isFirst ? 0.5 : 1,
          }}
        >
          <ChevronLeft size={16} /> Anterior
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 18px', border: `1px solid ${saved ? 'var(--success-border)' : 'var(--border-default)'}`,
              borderRadius: 'var(--radius-md)',
              background: saved ? 'var(--success-bg)' : 'transparent',
              color: saved ? 'var(--success-text)' : 'var(--text-muted)',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? 'Salvo!' : 'Salvar'}
          </button>

          {!isLast && (
            <button
              onClick={goNext}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 20px', border: '1px solid rgba(56,189,248,0.4)',
                borderRadius: 'var(--radius-md)', background: 'rgba(56,189,248,0.12)',
                color: '#38bdf8', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Próxima <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
