/**
 * Catálogo Central de Guias — Atratora Forge v0.2.0
 *
 * Única fonte de verdade para o sistema de guias visuais.
 * GuidesList, GuideCard e GuideViewer consomem este objeto.
 */

export type GuideStatus = 'available' | 'concept' | 'planned';

export interface GuideDefinition {
  /** Slug estável */
  id: string;
  /** ID da ferramenta referenciada (deve corresponder a ToolDefinition.id) */
  toolId: string;
  /** Título do guia */
  title: string;
  /** Descrição do conteúdo do guia */
  description: string;
  /** Status do guia */
  status: GuideStatus;
  /**
   * Caminho relativo para a imagem do guia (dentro de /public/guides/).
   * A imagem deve ser colocada em public/guides/<image>.
   */
  image: string;
  /** Tópicos cobertos */
  topics?: string[];
}

export const GUIDES_CATALOG: GuideDefinition[] = [
  {
    id: 'platform-guide',
    toolId: 'platform',
    title: 'Guia Geral da Plataforma',
    description:
      'Visão completa da Atratora Forge: navegação, módulos, projetos e fluxos de trabalho.',
    status: 'concept',
    image: 'platform-guide.png',
    topics: ['Navegação', 'Módulos', 'Projetos', 'Fluxos de trabalho'],
  },
  {
    id: 'croqui-converter-guide',
    toolId: 'croqui-converter',
    title: 'Conversor .CROQUI',
    description:
      'Passo a passo completo: selecionar imagem, configurar parâmetros, gerar e baixar o arquivo .croqui.',
    status: 'available',
    image: 'croqui-converter-guide.png',
    topics: ['Upload de imagem', 'Parâmetros de conversão', 'Download do .croqui', 'Validação do resultado'],
  },
  {
    id: 'map-studio-guide',
    toolId: 'map-studio',
    title: 'Map Studio',
    description:
      'Fluxo conceitual para criação de mapas-base georreferenciados com ortofotos e coordenadas.',
    status: 'concept',
    image: 'map-studio-guide.png',
    topics: ['Coordenadas GPS', 'Camadas cartográficas', 'Escala e calibração'],
  },
  {
    id: 'croqui-studio-guide',
    toolId: 'croqui-studio',
    title: 'Croqui Studio',
    description:
      'Interface conceitual para composição de croquis técnicos vetoriais com biblioteca de elementos.',
    status: 'concept',
    image: 'croqui-studio-guide.png',
    topics: ['Camadas vetoriais', 'Biblioteca de elementos', 'Composição assistida'],
  },
  {
    id: 'dynamics-guide',
    toolId: 'dynamics',
    title: 'Dynamics',
    description:
      'Fluxo planejado para representação de trajetórias, deslocamentos e relações espaciotemporais.',
    status: 'planned',
    image: 'dynamics-guide.png',
    topics: ['Trajetórias', 'Deslocamentos', 'Relações espaciais', 'Relações temporais'],
  },
  {
    id: 'validator-guide',
    toolId: 'validator',
    title: 'Validator',
    description:
      'Interface planejada para auditoria de consistência estrutural e técnica de projetos.',
    status: 'planned',
    image: 'validator-guide.png',
    topics: ['Regras de validação', 'Relatório de inconsistências', 'Checklist técnico'],
  },
  {
    id: 'documents-guide',
    toolId: 'documents',
    title: 'Documents',
    description:
      'Fluxo planejado para estruturação e exportação de relatórios e documentos técnicos.',
    status: 'planned',
    image: 'documents-guide.png',
    topics: ['Templates', 'Exportação PDF', 'Campos dinâmicos'],
  },
  {
    id: 'field-toolkit-guide',
    toolId: 'field-toolkit',
    title: 'Field Toolkit',
    description:
      'Conceito de organização de coleta de campo: coordenadas, fotos, checklists e observações.',
    status: 'planned',
    image: 'field-toolkit-guide.png',
    topics: ['Coleta de dados', 'Fotos georreferenciadas', 'Checklists', 'Exportação'],
  },
  {
    id: 'business-automation-guide',
    toolId: 'business-automation',
    title: 'Business Automation',
    description:
      'Fluxo planejado para automação de rotinas de dados, integração e organização no setor privado.',
    status: 'planned',
    image: 'business-automation-guide.png',
    topics: ['Rotinas automatizadas', 'Integração de dados', 'Workflow customizável'],
  },
];

/** Badge label por status de guia */
export const GUIDE_STATUS_LABEL: Record<GuideStatus, string> = {
  available: 'Disponível',
  concept:   'Interface conceitual',
  planned:   'Fluxo planejado',
};
