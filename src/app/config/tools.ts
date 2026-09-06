/**
 * Catálogo Central de Ferramentas — Atratora Forge v0.2.0
 *
 * Única fonte de verdade para o catálogo de ferramentas.
 * Home, Diretório, Guias e buscas consomem este objeto.
 */

export type ToolStatus = 'available' | 'development' | 'planned';

export type ToolCategory =
  | 'Conversores'
  | 'Geoprocessamento'
  | 'Croquis'
  | 'Análise'
  | 'Validação'
  | 'Documentos'
  | 'Operações de Campo'
  | 'Automação';

export interface ToolDefinition {
  /** Slug estável para rotas e referências cruzadas */
  id: string;
  /** Nome de exibição na interface */
  title: string;
  /** Descrição concisa */
  description: string;
  /** Categoria para filtros e agrupamento */
  category: ToolCategory;
  /** Status de disponibilidade */
  status: ToolStatus;
  /** Rota hash (apenas para ferramentas disponíveis) */
  path?: string;
  /** Nome do ícone Lucide */
  iconName: 'FileImage' | 'Layers' | 'Map' | 'Activity' | 'FileCheck2' | 'FileText' | 'Briefcase' | 'Settings2';
  /** Versão prevista de entrega */
  deliveryVersion?: string;
  /** Tags para busca de texto livre */
  tags?: string[];
}

export const TOOLS_CATALOG: ToolDefinition[] = [
  {
    id: 'croqui-converter',
    title: 'Conversor .CROQUI',
    description:
      'Converta imagens rasterizadas para arquivos .croqui diretamente no navegador.',
    category: 'Conversores',
    status: 'available',
    path: '/tools/croqui-converter',
    iconName: 'FileImage',
    deliveryVersion: 'v0.1',
    tags: ['imagem', 'converter', 'croqui', 'json', 'canvas', 'rasterizado', 'png', 'jpg'],
  },
  {
    id: 'map-studio',
    title: 'Map Studio',
    description:
      'Crie mapas-base a partir de coordenadas, ortofotos e referências geográficas.',
    category: 'Geoprocessamento',
    status: 'development',
    iconName: 'Map',
    deliveryVersion: 'v0.3',
    tags: ['mapa', 'coordenadas', 'gps', 'ortofoto', 'satélite', 'escala', 'cartografia', 'geográfico'],
  },
  {
    id: 'croqui-studio',
    title: 'Croqui Studio',
    description:
      'Monte croquis técnicos com camadas, elementos gráficos e composição assistida.',
    category: 'Croquis',
    status: 'development',
    iconName: 'Layers',
    deliveryVersion: 'v0.4',
    tags: ['vetor', 'canvas', 'camadas', 'sinalização', 'desenho', 'composição', 'diagramação'],
  },
  {
    id: 'dynamics',
    title: 'Dynamics',
    description:
      'Represente trajetórias, deslocamentos, eventos e relações espaciais ou temporais.',
    category: 'Análise',
    status: 'development',
    iconName: 'Activity',
    deliveryVersion: 'v0.7',
    tags: ['trajetória', 'deslocamento', 'spatial', 'temporal', 'relações', 'eventos'],
  },
  {
    id: 'validator',
    title: 'Validator',
    description:
      'Analise consistência estrutural, técnica e visual de arquivos, croquis e projetos.',
    category: 'Validação',
    status: 'development',
    iconName: 'FileCheck2',
    deliveryVersion: 'v0.8',
    tags: ['validação', 'consistência', 'auditoria', 'regras', 'checklist', 'verificação'],
  },
  {
    id: 'documents',
    title: 'Documents',
    description:
      'Estruture relatórios, laudos e documentos técnicos a partir de dados organizados.',
    category: 'Documentos',
    status: 'development',
    iconName: 'FileText',
    deliveryVersion: 'v0.9',
    tags: ['laudo', 'relatório', 'documento', 'automação', 'template', 'exportação'],
  },
  {
    id: 'field-toolkit',
    title: 'Field Toolkit',
    description:
      'Organize coordenadas, fotos, medições, observações e checklists coletados em campo.',
    category: 'Operações de Campo',
    status: 'development',
    iconName: 'Briefcase',
    deliveryVersion: 'v1.0',
    tags: ['campo', 'coordenadas', 'fotos', 'medições', 'checklist', 'observações', 'coleta'],
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    description:
      'Automatize rotinas de conversão, análise, integração e organização de dados aplicáveis ao setor privado.',
    category: 'Automação',
    status: 'development',
    iconName: 'Settings2',
    deliveryVersion: 'v1.1',
    tags: ['automação', 'integração', 'dados', 'rotinas', 'negócios', 'setor privado', 'workflow'],
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  'Conversores',
  'Geoprocessamento',
  'Croquis',
  'Análise',
  'Validação',
  'Documentos',
  'Operações de Campo',
  'Automação',
];

export const getAvailableTools = (): ToolDefinition[] =>
  TOOLS_CATALOG.filter((t) => t.status === 'available');

export const getToolsByCategory = (category: ToolCategory): ToolDefinition[] =>
  TOOLS_CATALOG.filter((t) => t.category === category);

export const searchTools = (query: string): ToolDefinition[] => {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS_CATALOG;
  return TOOLS_CATALOG.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      (t.tags ?? []).some((tag) => tag.includes(q))
  );
};
