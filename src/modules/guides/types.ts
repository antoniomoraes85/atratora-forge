export type GuideStatus = 'available' | 'conceptual' | 'planned';

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  tip?: string;
  whyItMatters?: string;
  explanation?: string;
  target?: string; // Valor do atributo data-guide na interface real, não um seletor CSS.
  stage?: string; // Estágio visual dos guias conceituais existentes.
  stageType?: string; // Opcional, mantido para evitar quebra no Tour
}

export interface GuideDefinition {
  id: string;
  toolId?: string;
  title: string;
  description: string;
  status: GuideStatus;
  image: string;
  topics?: string[];
  duration: string;
  steps: GuideStep[];
}

