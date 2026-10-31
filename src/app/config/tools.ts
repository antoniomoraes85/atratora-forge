/**
 * Vetor Forense — Catálogo único de módulos.
 *
 * Status 'available' requer rota implementada. Nenhuma ferramenta futura deve
 * aparecer como capaz de emitir laudo, atestar integridade ou examinar celulares.
 */
export type ToolStatus = 'available' | 'development' | 'planned';

export type ToolCategory =
  | 'Evidências Digitais'
  | 'Dispositivos Móveis'
  | 'Mídia Digital'
  | 'Conversores'
  | 'Geoprocessamento'
  | 'Croquis'
  | 'Análise'
  | 'Validação'
  | 'Documentos'
  | 'Operações de Campo'
  | 'Automação';

export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  /** Apenas módulos implementados recebem rota de acesso. */
  path?: string;
  iconName: 'FileImage' | 'Layers' | 'Map' | 'Activity' | 'FileCheck2'
    | 'FileText' | 'Briefcase' | 'Settings2' | 'Zap' | 'ShieldCheck'
    | 'Smartphone' | 'ScanSearch' | 'Fingerprint' | 'FileSearch';
  deliveryVersion?: string;
  tags?: string[];
}

export const TOOLS_CATALOG: ToolDefinition[] = [
  // Novas frentes estratégicas — planejamento, sem execução forense implementada.
  {
    id: 'vetor-evidence',
    title: 'Vetor Evidence',
    description: 'Planejado: organização de casos, registro de origem, hashes, manifestos e histórico de operações sobre evidências digitais.',
    category: 'Evidências Digitais',
    status: 'planned',
    iconName: 'ShieldCheck',
    deliveryVersion: 'Fase 1',
    tags: ['evidencia', 'prova', 'hash', 'sha256', 'custodia', 'integridade', 'rastreabilidade', 'caso', 'manifesto'],
  },
  {
    id: 'vetor-reports',
    title: 'Vetor Reports',
    description: 'Planejado: relatórios técnicos estruturados, procedimentos, achados, limitações e exportação em PDF para revisão profissional.',
    category: 'Documentos',
    status: 'planned',
    iconName: 'FileText',
    deliveryVersion: 'Fase 2',
    tags: ['relatorio', 'parecer', 'laudo', 'documento', 'pdf', 'metodologia', 'quesitos', 'pericia'],
  },
  {
    id: 'vetor-mobile',
    title: 'Vetor Mobile',
    description: 'Planejado: triagem documentada de dispositivos autorizados e importação de artefatos obtidos por ferramentas externas.',
    category: 'Dispositivos Móveis',
    status: 'planned',
    iconName: 'Smartphone',
    deliveryVersion: 'Fase 3',
    tags: ['android', 'ios', 'celular', 'spyware', 'comprometimento', 'artefatos', 'seguranca', 'mobile'],
  },
  {
    id: 'vetor-media',
    title: 'Vetor Media',
    description: 'Planejado: análise de metadados, integridade e consistência de imagens, vídeos e arquivos multimídia.',
    category: 'Mídia Digital',
    status: 'planned',
    iconName: 'ScanSearch',
    deliveryVersion: 'Fase 4',
    tags: ['video', 'imagem', 'metadados', 'fotografia', 'autenticidade', 'midia', 'exif', 'hash'],
  },
  {
    id: 'vetor-documents',
    title: 'Vetor Documents',
    description: 'Planejado: exame técnico de metadados, estrutura e assinaturas de documentos eletrônicos.',
    category: 'Documentos',
    status: 'planned',
    iconName: 'FileSearch',
    deliveryVersion: 'Fase 4',
    tags: ['documento digital', 'assinatura', 'pdf', 'fraude', 'metadados', 'validacao'],
  },
  {
    id: 'vetor-fraud',
    title: 'Vetor Fraud',
    description: 'Em estudo: correlação de registros e indicadores técnicos em incidentes de fraude digital, com escopo e autorização definidos.',
    category: 'Evidências Digitais',
    status: 'planned',
    iconName: 'Fingerprint',
    deliveryVersion: 'Fase futura',
    tags: ['fraude', 'incidente', 'registros', 'correlacao', 'logs', 'investigacao'],
  },
  // Ferramentas existentes, com rotas e funcionamento preservados.
  {
    id: 'vetor-forense',
    title: 'Análise de Dinâmica Veicular',
    description: 'Análise técnica exploratória de velocidade e dinâmica em sinistros, com modelos físicos e vestígios informados.',
    category: 'Análise',
    status: 'available',
    path: '/tools/vetor-forense',
    iconName: 'Zap',
    deliveryVersion: 'v0.3',
    tags: ['velocidade', 'sinistro', 'acidente', 'transito', 'dinamica', 'atrito', 'frenagem', 'vestigio'],
  },
  {
    id: 'croqui-converter',
    title: 'Conversor .CROQUI',
    description: 'Conversão local de imagens rasterizadas para arquivos .croqui em JSON.',
    category: 'Conversores',
    status: 'available',
    path: '/tools/croqui-converter',
    iconName: 'FileImage',
    deliveryVersion: 'v0.1',
    tags: ['imagem', 'converter', 'croqui', 'json', 'canvas', 'png', 'jpg'],
  },
  // Roadmap anterior mantido; nenhum desses módulos foi promovido a disponível.
  {
    id: 'map-studio',
    title: 'Map Studio',
    description: 'Em desenvolvimento: mapas-base, coordenadas e referências geográficas.',
    category: 'Geoprocessamento',
    status: 'development',
    iconName: 'Map',
    deliveryVersion: 'Roadmap legado',
    tags: ['mapa', 'coordenadas', 'gps', 'ortofoto', 'cartografia'],
  },
  {
    id: 'croqui-studio',
    title: 'Croqui Studio',
    description: 'Em desenvolvimento: croquis técnicos com camadas e elementos vetoriais.',
    category: 'Croquis',
    status: 'development',
    iconName: 'Layers',
    deliveryVersion: 'Roadmap legado',
    tags: ['vetor', 'canvas', 'camadas', 'desenho', 'diagrama'],
  },
  {
    id: 'dynamics',
    title: 'Dynamics',
    description: 'Em desenvolvimento: representação temporal de trajetórias e eventos.',
    category: 'Análise',
    status: 'development',
    iconName: 'Activity',
    deliveryVersion: 'Roadmap legado',
    tags: ['trajetoria', 'deslocamento', 'temporal', 'eventos'],
  },
  {
    id: 'validator',
    title: 'Validator',
    description: 'Em desenvolvimento: verificações de consistência estrutural de arquivos e projetos.',
    category: 'Validação',
    status: 'development',
    iconName: 'FileCheck2',
    deliveryVersion: 'Roadmap legado',
    tags: ['validacao', 'consistencia', 'auditoria', 'regras', 'checklist'],
  },
  {
    id: 'field-toolkit',
    title: 'Field Toolkit',
    description: 'Em desenvolvimento: organização de medições, fotos e observações de campo.',
    category: 'Operações de Campo',
    status: 'development',
    iconName: 'Briefcase',
    deliveryVersion: 'Roadmap legado',
    tags: ['campo', 'fotos', 'medicoes', 'checklist', 'observacoes'],
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    description: 'Em desenvolvimento: automação de fluxos técnicos, conversão e organização de dados.',
    category: 'Automação',
    status: 'development',
    iconName: 'Settings2',
    deliveryVersion: 'Roadmap legado',
    tags: ['automacao', 'integracao', 'dados', 'workflow'],
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  'Evidências Digitais',
  'Dispositivos Móveis',
  'Mídia Digital',
  'Documentos',
  'Análise',
  'Conversores',
  'Geoprocessamento',
  'Croquis',
  'Validação',
  'Operações de Campo',
  'Automação',
];

export const getAvailableTools = (): ToolDefinition[] =>
  TOOLS_CATALOG.filter(t => t.status === 'available');

export const getToolsByCategory = (category: ToolCategory): ToolDefinition[] =>
  TOOLS_CATALOG.filter(t => t.category === category);

export const searchTools = (query: string): ToolDefinition[] => {
  const q = query.toLocaleLowerCase('pt-BR').trim();
  if (!q) return TOOLS_CATALOG;
  return TOOLS_CATALOG.filter(t =>
    t.title.toLocaleLowerCase('pt-BR').includes(q) ||
    t.description.toLocaleLowerCase('pt-BR').includes(q) ||
    t.category.toLocaleLowerCase('pt-BR').includes(q) ||
    (t.tags ?? []).some(tag => tag.toLocaleLowerCase('pt-BR').includes(q))
  );
};
