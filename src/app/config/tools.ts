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
    title: 'Gestão de Evidências Digitais',
    description: 'Cadastro de casos, hashes, histórico de operações e documentação de integridade.',
    category: 'Evidências Digitais',
    status: 'planned',
    iconName: 'ShieldCheck',
    deliveryVersion: 'Fase 1',
    tags: ['evidencia', 'prova', 'hash', 'sha256', 'custodia', 'integridade', 'rastreabilidade', 'caso', 'manifesto'],
  },
  {
    id: 'vetor-reports',
    title: 'Relatórios Técnicos',
    description: 'Documentação técnica estruturada, achados, limitações e revisão profissional.',
    category: 'Documentos',
    status: 'planned',
    iconName: 'FileText',
    deliveryVersion: 'Fase 2',
    tags: ['relatorio', 'parecer', 'laudo', 'documento', 'pdf', 'metodologia', 'quesitos', 'pericia'],
  },
  {
    id: 'vetor-mobile',
    title: 'Análise de Dispositivos Móveis',
    description: 'Triagem de celulares autorizados e análise documentada de artefatos digitais.',
    category: 'Dispositivos Móveis',
    status: 'planned',
    iconName: 'Smartphone',
    deliveryVersion: 'Fase 3',
    tags: ['android', 'ios', 'celular', 'spyware', 'comprometimento', 'artefatos', 'seguranca', 'mobile'],
  },
  {
    id: 'vetor-media',
    title: 'Análise de Mídia Digital',
    description: 'Exame técnico de metadados e consistência de imagens, áudio e vídeos.',
    category: 'Mídia Digital',
    status: 'planned',
    iconName: 'ScanSearch',
    deliveryVersion: 'Fase 4',
    tags: ['video', 'imagem', 'metadados', 'fotografia', 'autenticidade', 'midia', 'exif', 'hash'],
  },
  {
    id: 'vetor-documents',
    title: 'Verificação de Documentos Digitais',
    description: 'Verificação técnica de metadados, estrutura e assinaturas eletrônicas.',
    category: 'Documentos',
    status: 'planned',
    iconName: 'FileSearch',
    deliveryVersion: 'Fase 4',
    tags: ['documento digital', 'assinatura', 'pdf', 'fraude', 'metadados', 'validacao'],
  },
  {
    id: 'vetor-fraud',
    title: 'Análise de Incidentes e Fraudes Digitais',
    description: 'Correlação de registros digitais e indicadores de incidentes autorizados.',
    category: 'Evidências Digitais',
    status: 'planned',
    iconName: 'Fingerprint',
    deliveryVersion: 'Fase futura',
    tags: ['fraude', 'incidente', 'registros', 'correlacao', 'logs', 'investigacao'],
  },
  // Ferramentas existentes, com rotas e funcionamento preservados.
  {
    id: 'vetor-forense',
    title: 'Reconstrução de Dinâmica Veicular',
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
    title: 'Conversor de Croquis',
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
    id: 'documents',
    title: 'Modelos de Documentos (legado)',
    description: 'Guia histórico de estruturação de relatórios. Evolução futura incorporada à proposta do Vetor Reports.',
    category: 'Documentos',
    status: 'development',
    iconName: 'FileText',
    deliveryVersion: 'Roadmap legado',
    tags: ['documents', 'guia', 'legado', 'relatório técnico', 'template'],
  },

  {
    id: 'map-studio',
    title: 'Mapas e Georreferenciamento',
    description: 'Em desenvolvimento: mapas-base, coordenadas e referências geográficas.',
    category: 'Geoprocessamento',
    status: 'development',
    iconName: 'Map',
    deliveryVersion: 'Roadmap legado',
    tags: ['mapa', 'coordenadas', 'gps', 'ortofoto', 'cartografia'],
  },
  {
    id: 'croqui-studio',
    title: 'Editor de Croquis Técnicos',
    description: 'Em desenvolvimento: croquis técnicos com camadas e elementos vetoriais.',
    category: 'Croquis',
    status: 'development',
    iconName: 'Layers',
    deliveryVersion: 'Roadmap legado',
    tags: ['vetor', 'canvas', 'camadas', 'desenho', 'diagrama'],
  },
  {
    id: 'dynamics',
    title: 'Linha do Tempo de Eventos',
    description: 'Em desenvolvimento: representação temporal de trajetórias e eventos.',
    category: 'Análise',
    status: 'development',
    iconName: 'Activity',
    deliveryVersion: 'Roadmap legado',
    tags: ['trajetoria', 'deslocamento', 'temporal', 'eventos'],
  },
  {
    id: 'validator',
    title: 'Validação Técnica',
    description: 'Em desenvolvimento: verificações de consistência estrutural de arquivos e projetos.',
    category: 'Validação',
    status: 'development',
    iconName: 'FileCheck2',
    deliveryVersion: 'Roadmap legado',
    tags: ['validacao', 'consistencia', 'auditoria', 'regras', 'checklist'],
  },
  {
    id: 'field-toolkit',
    title: 'Coleta Técnica em Campo',
    description: 'Em desenvolvimento: organização de medições, fotos e observações de campo.',
    category: 'Operações de Campo',
    status: 'development',
    iconName: 'Briefcase',
    deliveryVersion: 'Roadmap legado',
    tags: ['campo', 'fotos', 'medicoes', 'checklist', 'observacoes'],
  },
  {
    id: 'business-automation',
    title: 'Automação de Fluxos Técnicos',
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
