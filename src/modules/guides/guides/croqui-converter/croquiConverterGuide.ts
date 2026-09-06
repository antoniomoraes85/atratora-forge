import type { GuideDefinition } from '../../types';

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
      description: 'Você aprenderá a transformar uma imagem em arquivo .croqui utilizando o próprio Conversor.',
    },
    {
      id: 'upload',
      title: 'Selecionar imagem',
      description: 'Carregue uma imagem do seu computador ou arraste para a área tracejada.',
      target: 'upload',
    },
    {
      id: 'preview',
      title: 'Pré-visualização',
      description: 'Visualize a imagem carregada. Você pode conferir a resolução original, o tamanho e o formato antes da conversão.',
      target: 'preview',
    },
    {
      id: 'settings',
      title: 'Configurações de saída',
      description: 'Ajuste os parâmetros antes de gerar o arquivo.',
      explanation: '1300 px: Define a largura da imagem armazenada no arquivo.\n90%: Equilibra qualidade visual e tamanho do arquivo.',
      target: 'settings',
    },
    {
      id: 'generate',
      title: 'Gerar .CROQUI',
      description: 'Com a imagem selecionada, inicie a conversão.',
      explanation: 'Imagem → Canvas → conteúdo rasterizado → estrutura JSON → arquivo .croqui',
      target: 'generate',
    },
    {
      id: 'result',
      title: 'Resultado',
      description: 'Confira o arquivo gerado e seu tamanho. Se ainda não gerou, clique em Gerar .CROQUI.',
      target: 'result',
    },
    {
      id: 'download',
      title: 'Baixar arquivo',
      description: 'Faça o download do arquivo .croqui gerado para seu computador.',
      target: 'download',
    },
    {
      id: 'completion',
      title: 'Conclusão',
      description: 'Você concluiu o guia do Conversor .CROQUI.',
    }
  ]
};
