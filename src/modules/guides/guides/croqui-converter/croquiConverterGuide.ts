import type { GuideDefinition } from '../../types';

/** Definição compartilhada pela rota de guia e pela ajuda contextual do Conversor. */
export const croquiConverterGuide: GuideDefinition = {
  id: 'croqui-converter',
  toolId: 'croqui-converter',
  title: 'Conversor .CROQUI',
  description: 'Aprenda a converter uma imagem para .croqui.',
  status: 'available',
  image: 'croqui-converter-guide.png',
  topics: ['Upload', 'Preview', 'Configurações', 'Download'],
  duration: '~2 min',
  steps: [
    {
      id: 'introduction',
      title: 'Introdução',
      description: 'Você aprenderá a transformar uma imagem em arquivo .croqui em poucos passos.',
    },
    {
      id: 'upload',
      title: 'Selecionar imagem',
      description: 'Escolha uma imagem JPG, PNG, WEBP ou BMP.',
      target: 'upload',
    },
    {
      id: 'preview',
      title: 'Pré-visualização',
      description: 'Verifique se a imagem carregada está correta e inspecione o tamanho.',
      whyItMatters: 'Evita a conversão de arquivos indesejados e garante controle de qualidade.',
      target: 'preview',
    },
    {
      id: 'settings',
      title: 'Configurações de saída',
      description: 'Na maioria dos casos, mantenha os valores recomendados (ex: 1300 px, 90%).',
      tip: 'Controla a resolução e o nível de compressão da imagem embutida.',
      whyItMatters: 'Valores muito baixos reduzem a qualidade. Valores muito altos aumentam o tamanho do arquivo.',
      target: 'settings',
    },
    {
      id: 'generate',
      title: 'Gerar .CROQUI',
      description: 'Transforma a imagem num JSON estruturado contendo metadados e o conteúdo da imagem.',
      tip: 'Imagem → Canvas → Base64 → JSON (.croqui)',
      target: 'generate',
    },
    {
      id: 'result',
      title: 'Resultado',
      description: 'Confira as propriedades finais, como tamanho estimado do JSON gerado.',
      target: 'result',
    },
    {
      id: 'download',
      title: 'Baixar .CROQUI',
      description: 'Faça o download do arquivo estruturado para seu computador.',
      target: 'download',
    },
    {
      id: 'completion',
      title: 'Final',
      description: 'Conversão concluída com sucesso 100% localmente.',
    }
  ]
};
