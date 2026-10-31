import type { ToolDefinition } from './tools';

export type ProductGroupId = 'evidencias' | 'documentacao' | 'campo' | 'automacao';

export interface ProductGroup {
  id: ProductGroupId;
  label: string;
  description: string;
  toolIds: string[];
}

/** Presentation groups keep technical IDs, persisted analyses and guide links stable. */
export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    id: 'evidencias',
    label: 'Evidências e análises',
    description: 'Arquivos, dispositivos, incidentes e exames técnicos.',
    toolIds: ['vetor-evidence','vetor-mobile','vetor-media','vetor-documents','vetor-fraud','vetor-forense'],
  },
  {
    id: 'documentacao',
    label: 'Documentação técnica',
    description: 'Relatórios, validação e reconstrução cronológica.',
    toolIds: ['vetor-reports','validator','dynamics','documents'],
  },
  {
    id: 'campo',
    label: 'Campo e representação',
    description: 'Croquis, mapas e registro de informações técnicas.',
    toolIds: ['croqui-converter','map-studio','croqui-studio','field-toolkit'],
  },
  {
    id: 'automacao',
    label: 'Automação',
    description: 'Fluxos de organização e transformação de dados.',
    toolIds: ['business-automation'],
  },
];

export const findProductGroup = (tool: ToolDefinition): ProductGroupId =>
  PRODUCT_GROUPS.find(group => group.toolIds.includes(tool.id))?.id ?? 'evidencias';
