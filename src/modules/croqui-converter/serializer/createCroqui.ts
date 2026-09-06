import { CroquiPayload, FabricImageObject } from '../types';

/**
 * Versão deste adaptador de serialização.
 *
 * Incrementar quando houver mudanças na estrutura do payload gerado.
 * Formato: MAJOR.MINOR.PATCH
 * - MAJOR: mudança incompatível com importadores existentes
 * - MINOR: adição de propriedades mantendo compatibilidade retroativa
 * - PATCH: correção interna sem alterar o payload gerado
 */
export const CROQUI_ADAPTER_VERSION = '1.0.0';

/**
 * Cria o objeto de imagem compatível com o padrão JSON/Fabric observado
 * nos arquivos .croqui analisados durante o desenvolvimento da plataforma.
 *
 * As propriedades e seus valores foram derivados de inspeção direta
 * de arquivos .croqui reais. Consulte docs/CROQUI_FORMAT.md para
 * detalhes sobre quais propriedades são CONFIRMADAS vs HIPÓTESE.
 */
export function createCroquiImageObject(
  src: string,
  width: number,
  height: number
): FabricImageObject {
  return {
    type: 'image',
    originX: 'left',
    originY: 'top',
    left: 0,
    top: 0,
    width,
    height,
    fill: 'rgb(0,0,0)',
    stroke: null,
    strokeWidth: 0,
    strokeDashArray: null,
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    strokeMiterLimit: 10,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    flipX: false,
    flipY: false,
    opacity: 1,
    shadow: null,
    visible: true,
    clipTo: null,
    backgroundColor: '',
    fillRule: 'nonzero',
    globalCompositeOperation: 'source-over',
    transformMatrix: null,
    skewX: 0,
    skewY: 0,
    selectable: true,
    hasBorders: true,
    hasControls: true,
    lockMovementX: false,
    lockMovementY: false,
    filters: [],
    src,
    crossOrigin: '',
    alignX: 'none',
    alignY: 'none',
    meetOrSlice: 'meet',
  };
}

/**
 * Cria a estrutura raiz do payload .croqui contendo a chave obrigatória `objects`.
 */
export function createCroquiPayload(
  src: string,
  width: number,
  height: number
): CroquiPayload {
  return {
    objects: [createCroquiImageObject(src, width, height)],
  };
}

/**
 * Serializa o payload .croqui em formato JSON string pronto para exportação.
 */
export function serializeCroqui(
  src: string,
  width: number,
  height: number
): string {
  const payload = createCroquiPayload(src, width, height);
  return JSON.stringify(payload);
}
