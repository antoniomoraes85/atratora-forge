/**
 * Tipos e interfaces estritas do Módulo Conversor .CROQUI
 * Baseado na especificação técnica validada em docs/CROQUI_FORMAT.md
 */

export interface FabricImageObject {
  type: 'image';
  originX: 'left' | 'center' | 'right';
  originY: 'top' | 'center' | 'bottom';
  left: number;
  top: number;
  width: number;
  height: number;
  fill: string;
  stroke: string | null;
  strokeWidth: number;
  strokeDashArray: number[] | null;
  strokeLineCap: 'butt' | 'round' | 'square';
  strokeLineJoin: 'miter' | 'round' | 'bevel';
  strokeMiterLimit: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  flipX: boolean;
  flipY: boolean;
  opacity: number;
  shadow: unknown | null;
  visible: boolean;
  clipTo: unknown | null;
  backgroundColor: string;
  fillRule: 'nonzero' | 'evenodd';
  globalCompositeOperation: 'source-over' | string;
  transformMatrix: number[] | null;
  skewX: number;
  skewY: number;
  selectable: boolean;
  hasBorders: boolean;
  hasControls: boolean;
  lockMovementX: boolean;
  lockMovementY: boolean;
  filters: unknown[];
  src: string; // Data URL Base64 ex: data:image/jpeg;base64,...
  crossOrigin: string;
  alignX: 'none' | 'mid' | 'min' | 'max';
  alignY: 'none' | 'mid' | 'min' | 'max';
  meetOrSlice: 'meet' | 'slice';
}

export interface CroquiPayload {
  objects: FabricImageObject[];
}

export interface ConversionOptions {
  targetWidth: number; // Padrão: 1300 px
  quality: number;     // 0.80, 0.90 (padrão), 0.95, 1.00
  outputName: string;  // Nome base do arquivo sem a extensão .croqui
}

export interface ImageSourceMeta {
  file: File;
  name: string;
  format: string;
  sizeBytes: number;
  naturalWidth: number;
  naturalHeight: number;
  previewUrl: string;
}

export interface ConversionResult {
  blob: Blob;
  jsonString: string;
  outputWidth: number;
  outputHeight: number;
  sizeBytes: number;
  fileName: string;
}
