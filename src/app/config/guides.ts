/**
 * Catálogo Central de Guias — Atratora Forge v0.3.0
 */

import type { GuideDefinition, GuideStatus } from '../../modules/guides/types';
import { croquiConverterGuide } from '../../modules/guides/guides/croqui-converter/croquiConverterGuide';

export type { GuideDefinition, GuideStep, GuideStatus } from '../../modules/guides/types';

export const GUIDES_CATALOG: GuideDefinition[] = [
  {
    id: 'platform',
    title: 'Guia Geral da Plataforma',
    description: 'Visão completa da Atratora Forge: navegação, módulos e fluxos de trabalho.',
    status: 'conceptual',
    image: 'platform-guide.png',
    topics: ['Navegação', 'Módulos', 'Processamento local'],
    duration: '~2 min',
    steps: [
      { id: 'intro', title: 'Início', description: 'Visão geral da plataforma.', stage: 'platform-intro' },
      { id: 'sidebar', title: 'Sidebar', description: 'Navegação lateral de acesso rápido.', stage: 'platform-sidebar' },
      { id: 'tools', title: 'Diretório de Ferramentas', description: 'Onde todas as ferramentas ativas estão listadas.', stage: 'platform-tools' },
      { id: 'categories', title: 'Categorias', description: 'Organização das ferramentas por tema.', stage: 'platform-categories' },
      { id: 'status', title: 'Status', description: 'Disponível vs. Planejado.', stage: 'platform-status' },
      { id: 'guides', title: 'Guias', description: 'Seção de aprendizado interativo.', stage: 'platform-guides' },
      { id: 'available', title: 'Ferramentas Disponíveis', description: 'Módulos prontos para uso.', stage: 'platform-available' },
      { id: 'planned', title: 'Módulos Planejados', description: 'O que está no roadmap.', stage: 'platform-planned' },
      { id: 'offline', title: 'Processamento Local', description: 'Privacidade de dados garantida.', stage: 'platform-offline' }
    ]
  },
  croquiConverterGuide,
  {
    id: 'map-studio',
    toolId: 'map-studio',
    title: 'Map Studio',
    description: 'Fluxo conceitual para criação de mapas-base georreferenciados.',
    status: 'conceptual',
    image: 'map-studio-guide.png',
    duration: '~3 min',
    steps: [
      { id: 'coords', title: 'Coordenadas', description: 'Inserir latitude e longitude.', stage: 'map-coords' },
      { id: 'loc', title: 'Localização', description: 'Visualizar no mapa esquemático.', stage: 'map-loc' },
      { id: 'base', title: 'Base visual', description: 'Alternar satélite, mapa ou ortofoto.', stage: 'map-base' },
      { id: 'bounds', title: 'Enquadramento', description: 'Simular zoom e orientação.', stage: 'map-bounds' },
      { id: 'elements', title: 'Elementos técnicos', description: 'Norte, escala, coordenadas.', stage: 'map-elements' },
      { id: 'export', title: 'Exportação', description: 'Gerar saída para o Croqui Studio.', stage: 'map-export' },
    ]
  },
  {
    id: 'croqui-studio',
    toolId: 'croqui-studio',
    title: 'Croqui Studio',
    description: 'Composição de croquis técnicos vetoriais com biblioteca de elementos.',
    status: 'conceptual',
    image: 'croqui-studio-guide.png',
    duration: '~4 min',
    steps: [
      { id: 'base', title: 'Mapa-base', description: 'Fundo gerado a partir de outros módulos.', stage: 'croqui-base' },
      { id: 'elements', title: 'Elementos', description: 'Selecionar cones, veículos, setas.', stage: 'croqui-elements' },
      { id: 'layers', title: 'Camadas', description: 'Alternar e organizar os elementos.', stage: 'croqui-layers' },
      { id: 'labels', title: 'Rótulos', description: 'Adicionar textos técnicos.', stage: 'croqui-labels' },
      { id: 'review', title: 'Revisão', description: 'Auditoria visual final.', stage: 'croqui-review' },
      { id: 'export', title: 'Exportação', description: 'Gerar arquivo padronizado.', stage: 'croqui-export' },
    ]
  },
  {
    id: 'dynamics',
    toolId: 'dynamics',
    title: 'Dynamics',
    description: 'Representação de trajetórias, deslocamentos e relações espaciotemporais.',
    status: 'planned',
    image: 'dynamics-guide.png',
    duration: '~2 min',
    steps: [
      { id: 'traj-a', title: 'Trajetória A', description: 'Deslocamento do objeto primário.', stage: 'dyn-traja' },
      { id: 'traj-b', title: 'Trajetória B', description: 'Deslocamento de objeto secundário.', stage: 'dyn-trajb' },
      { id: 'events', title: 'Eventos', description: 'Marcações de acontecimentos-chave.', stage: 'dyn-events' },
      { id: 'timeline', title: 'Linha do tempo', description: 'Animação e relação espaciotemporal.', tip: 'Uma trajetória representa deslocamento ao longo do tempo.', stage: 'dyn-timeline' },
    ]
  },
  {
    id: 'validator',
    toolId: 'validator',
    title: 'Validator',
    description: 'Auditoria de consistência estrutural e técnica de projetos.',
    status: 'planned',
    image: 'validator-guide.png',
    duration: '~3 min',
    steps: [
      { id: 'load', title: 'Carregar', description: 'Importar arquivo.', stage: 'val-load' },
      { id: 'criteria', title: 'Selecionar critérios', description: 'Definir regras da análise.', stage: 'val-criteria' },
      { id: 'analyze', title: 'Analisar', description: 'Executar análise de consistência.', stage: 'val-analyze' },
      { id: 'alerts', title: 'Alertas', description: 'Revisar falhas e warnings.', stage: 'val-alerts' },
      { id: 'fix', title: 'Corrigir', description: 'Ajustar as inconsistências.', stage: 'val-fix' },
      { id: 'revalidate', title: 'Revalidar', description: 'Confirmar sucesso.', stage: 'val-revalidate' },
    ]
  },
  {
    id: 'documents',
    toolId: 'documents',
    title: 'Documents',
    description: 'Estruturação e exportação de relatórios e documentos técnicos.',
    status: 'planned',
    image: 'documents-guide.png',
    duration: '~2 min',
    steps: [
      { id: 'type', title: 'Tipo', description: 'Escolher template (ex: Relatório Técnico).', stage: 'doc-type' },
      { id: 'data', title: 'Dados', description: 'Preencher campos fixos.', stage: 'doc-data' },
      { id: 'media', title: 'Mídia', description: 'Anexar imagens ou tabelas.', stage: 'doc-media' },
      { id: 'gen', title: 'Gerar', description: 'Processar conteúdo estruturado.', stage: 'doc-gen' },
      { id: 'review', title: 'Revisar', description: 'Leitura final antes de exportar.', stage: 'doc-review' },
    ]
  },
  {
    id: 'field-toolkit',
    toolId: 'field-toolkit',
    title: 'Field Toolkit',
    description: 'Organização de coleta de campo.',
    status: 'planned',
    image: 'field-toolkit-guide.png',
    duration: '~3 min',
    steps: [
      { id: 'loc', title: 'Localização', description: 'Coordenadas do fato.', stage: 'field-loc' },
      { id: 'photo', title: 'Foto', description: 'Captura visual.', stage: 'field-photo' },
      { id: 'obs', title: 'Observação', description: 'Anotações contextuais.', stage: 'field-obs' },
      { id: 'measure', title: 'Medição', description: 'Dimensões métricas.', stage: 'field-measure' },
      { id: 'checklist', title: 'Checklist', description: 'Controle de verificação.', stage: 'field-checklist' },
      { id: 'export', title: 'Pacote Estruturado', description: 'Dado pronto para envio.', stage: 'field-export' },
    ]
  },
  {
    id: 'business-automation',
    toolId: 'business-automation',
    title: 'Business Automation',
    description: 'Automação de rotinas de dados.',
    status: 'planned',
    image: 'business-automation-guide.png',
    duration: '~2 min',
    steps: [
      { id: 'input', title: 'Entrada', description: 'Origem dos dados.', stage: 'biz-input' },
      { id: 'process', title: 'Processamento', description: 'Transformação intermediária.', stage: 'biz-process' },
      { id: 'rule', title: 'Regra', description: 'Condicionais e validações.', stage: 'biz-rule' },
      { id: 'result', title: 'Resultado', description: 'Ação ou saída final.', stage: 'biz-result' },
    ]
  },
];

export const GUIDE_STATUS_LABEL: Record<GuideStatus, string> = {
  available: 'Disponível',
  conceptual:   'Interface conceitual',
  planned:   'Fluxo planejado',
};
