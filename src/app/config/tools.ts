/**
 * Catálogo Central de Ferramentas — Atratora Forge
 *
 * Esta é a ÚNICA fonte de verdade para o catálogo de ferramentas da plataforma.
 * Home, catálogo, mecanismos de busca e futuros painéis administrativos
 * devem consumir este objeto.
 */

export type ToolStatus = 'available' | 'development' | 'planned';

export type ToolCategory =
  | 'Conversores'
  | 'Geoprocessamento'
  | 'Croquis'
  | 'Análise'
  | 'Validação'
  | 'Documentos';

export interface ToolDefinition {
  /** Identificador único da ferramenta (slug estável) */
  id: string;
  /** Nome de exibição na interface */
  title: string;
  /** Descrição concisa para cards e catálogo */
  description: string;
  /** Categoria principal para filtragem e agrupamento */
  category: ToolCategory;
  /** Status de disponibilidade atual */
  status: ToolStatus;
  /** Rota interna (hash) para ferramentas disponíveis */
  path?: string;
  /** Nome do ícone Lucide a renderizar */
  iconName: 'FileImage' | 'Layers' | 'Map' | 'Activity' | 'FileCheck2' | 'FileText';
  /** Versão da plataforma onde será entregue */
  deliveryVersion?: string;
  /** Tags para busca de texto livre */
  tags?: string[];
}

export const TOOLS_CATALOG: ToolDefinition[] = [
  {
    id: 'croqui-converter',
    title: 'Conversor .CROQUI',
    description:
      'Converta imagens rasterizadas (fotos aéreas, ortofotos, mapas) para o formato de arquivo .croqui, compatível com editores de canvas baseados em JSON/Fabric.',
    category: 'Conversores',
    status: 'available',
    path: '/tools/croqui-converter',
    iconName: 'FileImage',
    deliveryVersion: 'v0.1',
    tags: ['imagem', 'converter', 'croqui', 'json', 'fabric', 'canvas', 'rasterizado'],
  },
  {
    id: 'croqui-studio',
    title: 'Croqui Studio',
    description:
      'Composição visual e assistida de croquis vetoriais com bibliotecas de vias, sinalização, veículos e vestígios.',
    category: 'Croquis',
    status: 'development',
    iconName: 'Layers',
    deliveryVersion: 'v0.4',
    tags: ['vetor', 'canvas', 'pista', 'sinalização', 'desenho', 'diagramação'],
  },
  {
    id: 'map-studio',
    title: 'Map Studio',
    description:
      'Criação de bases cartográficas escaladas a partir de coordenadas geográficas, ortofotos de satélite e pontos de referência.',
    category: 'Geoprocessamento',
    status: 'development',
    iconName: 'Map',
    deliveryVersion: 'v0.3',
    tags: ['mapa', 'coordenadas', 'gps', 'ortofoto', 'satélite', 'escala', 'cartografia'],
  },
  {
    id: 'dynamics',
    title: 'Dynamics',
    description:
      'Modelagem cinemática de trajetórias, análise temporal de eventos e visualização de relações de causalidade.',
    category: 'Análise',
    status: 'development',
    iconName: 'Activity',
    deliveryVersion: 'v0.7',
    tags: ['cinemática', 'trajetória', 'colisão', 'velocidade', 'temporal', 'física'],
  },
  {
    id: 'validator',
    title: 'Validator',
    description:
      'Motor de verificação e auditoria de consistência lógica e técnica de diagramas, croquis e relatórios.',
    category: 'Validação',
    status: 'development',
    iconName: 'FileCheck2',
    deliveryVersion: 'v0.8',
    tags: ['validação', 'consistência', 'auditoria', 'regras', 'checklist'],
  },
  {
    id: 'documents',
    title: 'Documents',
    description:
      'Automação de laudos técnicos e documentos estruturados gerados a partir de projetos e dados coletados na plataforma.',
    category: 'Documentos',
    status: 'development',
    iconName: 'FileText',
    deliveryVersion: 'v0.9',
    tags: ['laudo', 'relatório', 'documento', 'automação', 'template', 'pdf'],
  },
];

/** Categorias disponíveis para filtros, com contagem por status */
export const TOOL_CATEGORIES: ToolCategory[] = [
  'Conversores',
  'Geoprocessamento',
  'Croquis',
  'Análise',
  'Validação',
  'Documentos',
];

/** Helpers de filtragem */
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
