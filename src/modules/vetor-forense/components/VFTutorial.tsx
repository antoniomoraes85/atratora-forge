import { createDemoAnalysis } from '../data/demoCase';
import { resolveTrack } from '../engine/trackValidation';
import { saveAnalysis } from '../store/localStore';
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import type { VFTab } from './VetorForense';

interface VFTutorialProps {
  onNavigate: (tab: VFTab, analysisId?: string) => void;
}

const demo = createDemoAnalysis();
const demoMethod = demo.methods.find(m => m.status === 'suficiente')!;
const demoMu = resolveTrack(demo.tracks[0], demo).mu!;
const fmt = (v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
const TUTORIAL_STEPS = [
  {
    id: 1,
    title: 'Identificar vestígios disponíveis',
    content: `Antes de iniciar o cálculo, o perito deve identificar quais vestígios estão disponíveis na cena ou na documentação.

Neste caso demonstrativo:
• Marca de frenagem: 42,3 m (medida por distanciômetro)
• Superfície: asfalto, condição seca
• Estado da cena: parcialmente preservado

Selecione todos os elementos disponíveis na etapa "Elementos" do wizard.`,
    tip: 'Quanto mais vestígios documentados, maior a possibilidade de convergência entre métodos.',
  },
  {
    id: 2,
    title: 'Cadastrar veículos',
    content: `Informe os veículos envolvidos. Cada veículo recebe uma identificação (V1, V2...).

Neste caso:
• V1: Automóvel, pneus usados, ABS: não determinado
• Massa: não informada (não obrigatória)

Os dados do veículo influenciam na seleção automática do coeficiente de atrito.`,
    tip: 'Mesmo sem massa ou marca, é possível prosseguir. Os campos obrigatórios são mínimos.',
  },
  {
    id: 3,
    title: 'Caracterizar via e ambiente',
    content: `Informe as condições da via onde os vestígios foram encontrados.

Neste caso:
• Superfície: Asfalto (CBUQ)
• Condição: Seca
• Geometria: Reta
• Perfil: Nível (sem inclinação)
• Fase do dia: Dia
• Visibilidade: Boa
• Estado da cena: Parcialmente preservado`,
    tip: 'A inclinação em % é opcional, mas quando informada melhora a precisão do cálculo.',
  },
  {
    id: 4,
    title: 'Informar medições dos vestígios',
    content: `Cadastre cada trecho de vestígio com tipo, distância, superfície e método de medição.

Neste caso:
• Trecho 1: Frenagem, V1, 42,3 m, asfalto seco, distanciômetro
• Momento: pré-impacto

O sistema buscará automaticamente o coeficiente de atrito correspondente na base técnica.`,
    tip: 'O campo "Distância" é obrigatório para métodos de dissipação por atrito.',
  },
  {
    id: 5,
    title: 'Verificar parâmetros sugeridos',
    content: `Com base na superfície (asfalto seco) e no tipo de pneu (usados), o sistema sugere:

Coeficiente de atrito sugerido (fonte técnica):
• µ mínimo: ${fmt(demoMu.muMin)}
• µ central: ${fmt(demoMu.muCentral)}
• µ máximo: ${fmt(demoMu.muMax)}

Fonte técnica disponível na etapa Vestígios e na Base Técnica.

O usuário pode aceitar o valor sugerido ou substituí-lo manualmente (exige fonte e justificativa).`,
    tip: 'O parâmetro "externo" fica visualmente identificado na interface.',
  },
  {
    id: 6,
    title: 'Identificar métodos aplicáveis',
    content: `O sistema verifica automaticamente quais métodos têm dados suficientes:

✓ Dissipação por atrito — V1
   Dados: distância = 42,3 m | µ = ${fmt(demoMu.muMin)} / ${fmt(demoMu.muCentral)} / ${fmt(demoMu.muMax)}
   Status: Dados suficientes

△ Danos
   Status: Indicador auxiliar

○ Quantidade de movimento
   Status: Não disponível nesta versão`,
    tip: 'Dois vestígios do mesmo tipo (ex: duas frenagens de V1) contam como um único método.',
  },
  {
    id: 7,
    title: 'Calcular velocidade',
    content: `Com os dados do caso demonstrativo, o cálculo produz:

Fórmula do trecho único: v = √(2 · g · μ · d)
g = 9,80665 m/s²

Em múltiplos trechos, o motor usa: v = √(2 · Σᵢ(μ_eff,ᵢ · g · dᵢ))
O símbolo Σᵢ indica a soma da energia dissipada em cada trecho; μ_eff,ᵢ é o atrito efetivo do trecho i.

µ mínimo: ${fmt(demoMu.muMin)} → ${fmt(demoMethod.minKmh!)} km/h
µ central: ${fmt(demoMu.muCentral)} → ${fmt(demoMethod.centralKmh!)} km/h
µ máximo: ${fmt(demoMu.muMax)} → ${fmt(demoMethod.maxKmh!)} km/h

Valores gerados pelo mesmo motor da análise real.`,
    tip: 'O botão "Como foi calculado?" em cada método mostra todas as variáveis e cálculos intermediários.',
  },
  {
    id: 8,
    title: 'Interpretar intervalo de velocidade',
    content: `Resultado do método de dissipação por atrito — V1:

     ${fmt(demoMethod.minKmh!)} ───── ${fmt(demoMethod.centralKmh!)} ───── ${fmt(demoMethod.maxKmh!)} km/h
   (min)        (central)       (max)

Este é o intervalo estimado para a velocidade de V1 no início da marca de frenagem.

O valor central não é uma velocidade "exata" — é calculado com o coeficiente central adotado.`,
    tip: 'Evite apresentar o valor central isoladamente. O intervalo é a informação técnica relevante.',
  },
  {
    id: 9,
    title: 'Interpretar fidedignidade e convergência',
    content: `IFT — Índice de Fidedignidade Técnica: ${fmt(demo.ift!)}%

Composição calculada pelo motor:
• Qualidade da medição: ${fmt(demo.iftInput!.measurementQuality)}/100
• Qualidade do parâmetro: ${fmt(demo.iftInput!.parameterQuality)}/100
• Preservação: ${fmt(demo.iftInput!.preservation)}/100
• Completude: ${fmt(demo.iftInput!.completeness)}/100
• Rastreabilidade: ${fmt(demo.iftInput!.traceability)}/100

ICA: Não aferível (apenas 1 método independente quantitativo)
IAE: Não aferível (requer ICA)

ATENÇÃO: IFT é índice interno de qualidade dos dados. Não representa probabilidade de acerto.`,
    tip: 'Para calcular ICA e IAE são necessários pelo menos 2 métodos independentes quantitativos.',
  },
  {
    id: 10,
    title: 'Analisar limitações e resultado técnico',
    content: `Lacunas identificadas que poderiam melhorar esta estimativa:
• Ensaio de atrito no local (µ medido)
• Registro eletrônico (não disponível)

Texto técnico gerado automaticamente:
${demo.technicalSummary}

Este é um caso demonstrativo — os dados são fictícios.`,
    tip: 'O texto gerado nunca inclui atribuição de culpa, crime ou certeza absoluta.',
  },
];

export const VFTutorial: React.FC<VFTutorialProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const step = TUTORIAL_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TUTORIAL_STEPS.length - 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      <button onClick={() => { const example = createDemoAnalysis(); saveAnalysis(example); onNavigate('nova-analise', example.id); }}>Usar este caso demonstrativo</button>
      {/* Banner tutorial */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)',
        borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <AlertTriangle size={16} color="#c084fc" />
        <div>
          <span style={{ fontWeight: 700, color: '#c084fc', fontSize: '13px' }}>MODO TUTORIAL — DADOS FICTÍCIOS</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>
            Este tutorial utiliza dados simulados para fins pedagógicos.
          </span>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <BookOpen size={18} color="#c084fc" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
            Vetor Forense — Primeiros Passos
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
          Fluxo completo de análise pericial de velocidade em 10 etapas.
        </p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {TUTORIAL_STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(idx)}
            style={{
              flex: 1, height: '4px', borderRadius: '2px',
              background: idx <= currentStep ? '#c084fc' : 'var(--border-default)',
              border: 'none', cursor: 'pointer', transition: 'background var(--transition-fast)',
              padding: 0,
            }}
            title={`Etapa ${idx + 1}: ${s.title}`}
          />
        ))}
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
        Etapa {currentStep + 1} de {TUTORIAL_STEPS.length}
      </div>

      {/* Conteúdo da etapa */}
      <div style={{
        padding: '28px', background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)',
        minHeight: '300px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#c084fc', fontWeight: 700, fontSize: '14px', flexShrink: 0,
          }}>
            {step.id}
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
            {step.title}
          </h3>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: '24px' }}>
          {step.content}
        </div>

        {/* Tip */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)',
          borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'flex-start', gap: '8px',
        }}>
          <CheckCircle size={15} color="#38bdf8" style={{ flexShrink: 0, marginTop: '1px' }} />
          <span style={{ fontSize: '13px', color: '#38bdf8', lineHeight: 1.6 }}>{step.tip}</span>
        </div>
      </div>

      {/* Navegação */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <button
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          disabled={isFirst}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '10px 18px', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)', background: 'transparent',
            color: isFirst ? 'var(--text-dim)' : 'var(--text-muted)',
            fontSize: '13px', fontWeight: 600, cursor: isFirst ? 'not-allowed' : 'pointer',
            opacity: isFirst ? 0.5 : 1,
          }}
        >
          <ChevronLeft size={16} /> Anterior
        </button>

        <div style={{ display: 'flex', gap: '4px' }}>
          {TUTORIAL_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: idx === currentStep ? '#c084fc' : 'var(--border-default)',
                border: 'none', cursor: 'pointer', padding: 0,
              }}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={() => onNavigate('nova-analise')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', border: '1px solid rgba(168,85,247,0.4)',
              borderRadius: 'var(--radius-md)', background: 'rgba(168,85,247,0.15)',
              color: '#c084fc', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Criar análise real <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(s => Math.min(TUTORIAL_STEPS.length - 1, s + 1))}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 18px', border: '1px solid rgba(168,85,247,0.3)',
              borderRadius: 'var(--radius-md)', background: 'rgba(168,85,247,0.12)',
              color: '#c084fc', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Próxima <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
