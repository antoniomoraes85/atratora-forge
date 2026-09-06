import {
  ConversionOptions,
  ConversionResult,
  ImageSourceMeta,
} from '../types';
import { serializeCroqui } from '../serializer/createCroqui';
import { sanitizeFileName } from '../serializer/downloadCroqui';

/**
 * Calcula dimensões preservando proporção e limitando largura máxima
 */
export function calculateOutputDimensions(
  naturalWidth: number,
  naturalHeight: number,
  targetWidth = 1300
): { width: number; height: number; scale: number } {
  const boundedTarget = Math.max(300, Math.min(4000, targetWidth));
  // Não amplia imagens menores que a largura alvo para não degradar nitidez
  const scale = Math.min(1, boundedTarget / naturalWidth);
  const width = Math.max(1, Math.round(naturalWidth * scale));
  const height = Math.max(1, Math.round(naturalHeight * scale));

  return { width, height, scale };
}

/**
 * Formata tamanho em bytes para leitura humana
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/**
 * Carrega e valida um arquivo de imagem no navegador
 */
export function loadImageFromFile(file: File): Promise<{ image: HTMLImageElement; meta: ImageSourceMeta }> {
  return new Promise((resolve, reject) => {
    // Validar formato
    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp'];
    if (!acceptedTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpg|jpeg|png|webp|bmp)$/i)) {
      reject(new Error(`Formato de arquivo não suportado (${file.type || 'desconhecido'}). Aceito: JPG, PNG, WEBP, BMP.`));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const meta: ImageSourceMeta = {
        file,
        name: file.name,
        format: file.type || file.name.split('.').pop()?.toUpperCase() || 'IMAGEM',
        sizeBytes: file.size,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        previewUrl: objectUrl,
      };
      resolve({ image: img, meta });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Não foi possível ler o arquivo de imagem selecionado. Ele pode estar corrompido.'));
    };

    img.src = objectUrl;
  });
}

/**
 * Processa a imagem na escala definida e gera o arquivo .croqui em memória
 */
export async function processImageToCroqui(
  sourceImage: HTMLImageElement,
  options: ConversionOptions
): Promise<ConversionResult> {
  const { width, height } = calculateOutputDimensions(
    sourceImage.naturalWidth,
    sourceImage.naturalHeight,
    options.targetWidth
  );

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Falha ao inicializar o contexto gráfico 2D do Canvas.');
  }

  // Preenche fundo branco caso imagens transparentes (PNG) contenham áreas vazias
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Renderiza a imagem redimensionada
  ctx.drawImage(sourceImage, 0, 0, width, height);

  // Comprime em JPEG com fator de qualidade especificado
  const quality = Math.max(0.1, Math.min(1.0, options.quality || 0.90));
  const dataUrl = canvas.toDataURL('image/jpeg', quality);

  // Serializa payload estrito do Fabric.js
  const jsonString = serializeCroqui(dataUrl, width, height);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });

  const safeBase = sanitizeFileName(options.outputName || 'croqui_convertido');
  const fileName = `${safeBase}.croqui`;

  return {
    blob,
    jsonString,
    outputWidth: width,
    outputHeight: height,
    sizeBytes: blob.size,
    fileName,
  };
}
