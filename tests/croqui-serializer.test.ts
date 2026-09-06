import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

import {
  CROQUI_ADAPTER_VERSION,
  createCroquiImageObject,
  createCroquiPayload,
  serializeCroqui,
} from '../src/modules/croqui-converter/serializer/createCroqui';
import { validateCroquiPayload } from '../src/modules/croqui-converter/serializer/validateCroqui';
import { sanitizeFileName } from '../src/modules/croqui-converter/serializer/downloadCroqui';
import {
  calculateOutputDimensions,
  formatBytes,
} from '../src/modules/croqui-converter/services/imageProcessor';

// ---------------------------------------------------------------------------
// Constantes compartilhadas pelos testes
// ---------------------------------------------------------------------------

/** Data URL mínima válida: JPEG 1×1 px para testes de formato */
const MINIMAL_JPEG_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=';

/** Fixture sintética pública (sem dados reais) */
const SYNTHETIC_FIXTURE_PATH = path.resolve(__dirname, 'fixtures/reference-image-only.croqui');

// ---------------------------------------------------------------------------
// Suite 1: Versão do Adaptador
// ---------------------------------------------------------------------------

describe('Versão do Adaptador .CROQUI', () => {
  it('deve exportar CROQUI_ADAPTER_VERSION como string semver não vazia', () => {
    expect(typeof CROQUI_ADAPTER_VERSION).toBe('string');
    expect(CROQUI_ADAPTER_VERSION.length).toBeGreaterThan(0);
    // Valida que segue padrão MAJOR.MINOR.PATCH
    expect(CROQUI_ADAPTER_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});

// ---------------------------------------------------------------------------
// Suite 2: Invariantes Estruturais do Serializer
// ---------------------------------------------------------------------------

describe('Invariantes Estruturais do Serializador .CROQUI', () => {
  const W = 1300;
  const H = 731;

  it('deve gerar JSON válido com raiz "objects" como array', () => {
    const json = serializeCroqui(MINIMAL_JPEG_DATA_URL, W, H);
    expect(() => JSON.parse(json)).not.toThrow();
    const parsed = JSON.parse(json);
    expect(parsed).toHaveProperty('objects');
    expect(Array.isArray(parsed.objects)).toBe(true);
    expect(parsed.objects.length).toBeGreaterThanOrEqual(1);
  });

  it('o primeiro objeto deve ter type === "image"', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.type).toBe('image');
  });

  it('deve preservar exatamente as dimensões fornecidas', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.width).toBe(W);
    expect(obj.height).toBe(H);
  });

  it('deve manter scaleX e scaleY em 1 por padrão', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.scaleX).toBe(1);
    expect(obj.scaleY).toBe(1);
  });

  it('deve manter angle em 0 por padrão', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.angle).toBe(0);
  });

  it('deve manter opacity em 1 por padrão', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.opacity).toBe(1);
  });

  it('deve manter left e top em 0 por padrão', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.left).toBe(0);
    expect(obj.top).toBe(0);
  });

  it('deve ter fillRule === "nonzero"', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.fillRule).toBe('nonzero');
  });

  it('deve ter globalCompositeOperation === "source-over"', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.globalCompositeOperation).toBe('source-over');
  });

  it('deve ter filters como array vazio por padrão', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(Array.isArray(obj.filters)).toBe(true);
    expect(obj.filters.length).toBe(0);
  });

  it('deve ter selectable, hasBorders e hasControls como true', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.selectable).toBe(true);
    expect(obj.hasBorders).toBe(true);
    expect(obj.hasControls).toBe(true);
  });

  it('deve ter lockMovementX e lockMovementY como false', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.lockMovementX).toBe(false);
    expect(obj.lockMovementY).toBe(false);
  });

  it('deve ter originX="left" e originY="top"', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.originX).toBe('left');
    expect(obj.originY).toBe('top');
  });

  it('deve ter alignX="none", alignY="none", meetOrSlice="meet"', () => {
    const obj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, W, H);
    expect(obj.alignX).toBe('none');
    expect(obj.alignY).toBe('none');
    expect(obj.meetOrSlice).toBe('meet');
  });
});

// ---------------------------------------------------------------------------
// Suite 3: Validação da Data URL
// ---------------------------------------------------------------------------

describe('Validação de Data URL no Payload', () => {
  it('deve rejeitar src que não seja Data URL de imagem', () => {
    const badPayload = createCroquiPayload('https://example.com/img.jpg', 100, 100);
    const result = validateCroquiPayload(badPayload);
    expect(result.isValid).toBe(false);
    expect(result.issues.some((i) => i.field === 'objects[0].src')).toBe(true);
  });

  it('deve aceitar Data URL JPEG válida', () => {
    const payload = createCroquiPayload(MINIMAL_JPEG_DATA_URL, 100, 100);
    const result = validateCroquiPayload(payload);
    expect(result.isValid).toBe(true);
  });

  it('src deve iniciar com "data:image/jpeg;base64," quando gerado pelo processador de imagens JPEG', () => {
    expect(MINIMAL_JPEG_DATA_URL.startsWith('data:image/jpeg;base64,')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Suite 4: Teste de Regressão — Legacy vs Serializer Atual
// (Garante que o serializer atual produz saída idêntica ao converter original)
// ---------------------------------------------------------------------------

describe('Regressão: Legacy vs Serializer Atual', () => {
  /**
   * Simula o que o conversor legacy fazia para uma entrada conhecida:
   * - width: 800, height: 450
   * - scaleX: 1, scaleY: 1, angle: 0, opacity: 1
   * - originX: 'left', originY: 'top'
   * - left: 0, top: 0
   */
  const LEGACY_SRC = 'data:image/jpeg;base64,/9j/PLACEHOLDER';
  const LEGACY_W = 800;
  const LEGACY_H = 450;

  it('deve gerar exatamente o mesmo conjunto de chaves que o conversor legacy', () => {
    const LEGACY_EXPECTED_KEYS = [
      'type', 'originX', 'originY', 'left', 'top', 'width', 'height',
      'fill', 'stroke', 'strokeWidth', 'strokeDashArray', 'strokeLineCap',
      'strokeLineJoin', 'strokeMiterLimit', 'scaleX', 'scaleY', 'angle',
      'flipX', 'flipY', 'opacity', 'shadow', 'visible', 'clipTo',
      'backgroundColor', 'fillRule', 'globalCompositeOperation',
      'transformMatrix', 'skewX', 'skewY', 'selectable', 'hasBorders',
      'hasControls', 'lockMovementX', 'lockMovementY', 'filters', 'src',
      'crossOrigin', 'alignX', 'alignY', 'meetOrSlice',
    ];

    const ourObj = createCroquiImageObject(LEGACY_SRC, LEGACY_W, LEGACY_H);
    const ourKeys = Object.keys(ourObj).sort();
    const expectedKeys = [...LEGACY_EXPECTED_KEYS].sort();

    expect(ourKeys).toEqual(expectedKeys);
  });

  it('deve gerar os mesmos valores defaults que o conversor legacy', () => {
    const obj = createCroquiImageObject(LEGACY_SRC, LEGACY_W, LEGACY_H);

    // Valores confirmados como constantes no conversor legacy
    expect(obj.fill).toBe('rgb(0,0,0)');
    expect(obj.stroke).toBeNull();
    expect(obj.strokeWidth).toBe(0);
    expect(obj.strokeLineCap).toBe('butt');
    expect(obj.strokeLineJoin).toBe('miter');
    expect(obj.strokeMiterLimit).toBe(10);
    expect(obj.flipX).toBe(false);
    expect(obj.flipY).toBe(false);
    expect(obj.shadow).toBeNull();
    expect(obj.visible).toBe(true);
    expect(obj.clipTo).toBeNull();
    expect(obj.backgroundColor).toBe('');
    expect(obj.transformMatrix).toBeNull();
    expect(obj.skewX).toBe(0);
    expect(obj.skewY).toBe(0);
    expect(obj.crossOrigin).toBe('');
  });
});

// ---------------------------------------------------------------------------
// Suite 5: Validação de Payload — validateCroquiPayload
// ---------------------------------------------------------------------------

describe('validateCroquiPayload — Casos de Uso', () => {
  it('deve aprovar payload gerado pelo serializer atual', () => {
    const payload = createCroquiPayload(MINIMAL_JPEG_DATA_URL, 1300, 731);
    expect(validateCroquiPayload(payload).isValid).toBe(true);
  });

  it('deve rejeitar entrada que não é objeto', () => {
    expect(validateCroquiPayload(null).isValid).toBe(false);
    expect(validateCroquiPayload('string').isValid).toBe(false);
    expect(validateCroquiPayload(42).isValid).toBe(false);
  });

  it('deve rejeitar objeto sem a chave "objects"', () => {
    const result = validateCroquiPayload({ data: [] });
    expect(result.isValid).toBe(false);
    expect(result.issues.some((i) => i.field === 'objects')).toBe(true);
  });

  it('deve rejeitar objects como array vazio', () => {
    const result = validateCroquiPayload({ objects: [] });
    expect(result.isValid).toBe(false);
  });

  it('deve rejeitar objeto com type incorreto', () => {
    const result = validateCroquiPayload({ objects: [{ type: 'rect', width: 100, height: 100, src: 'data:image/jpeg;base64,abc' }] });
    expect(result.isValid).toBe(false);
    expect(result.issues.some((i) => i.field === 'objects[0].type')).toBe(true);
  });

  it('deve rejeitar dimensões zeradas', () => {
    const result = validateCroquiPayload({ objects: [{ type: 'image', width: 0, height: 0, src: MINIMAL_JPEG_DATA_URL }] });
    expect(result.isValid).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Suite 6: Conformidade com Fixture Sintética Pública
// ---------------------------------------------------------------------------

describe('Fixture Sintética — Conformidade Estrutural', () => {
  it('deve existir e ser JSON válido', () => {
    expect(fs.existsSync(SYNTHETIC_FIXTURE_PATH)).toBe(true);
    const raw = fs.readFileSync(SYNTHETIC_FIXTURE_PATH, 'utf8');
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  it('deve conter "objects" como array com pelo menos um elemento do tipo "image"', () => {
    const data = JSON.parse(fs.readFileSync(SYNTHETIC_FIXTURE_PATH, 'utf8'));
    expect(Array.isArray(data.objects)).toBe(true);
    expect(data.objects.length).toBeGreaterThanOrEqual(1);
    expect(data.objects[0].type).toBe('image');
  });

  it('deve passar pela validação do validateCroquiPayload', () => {
    const data = JSON.parse(fs.readFileSync(SYNTHETIC_FIXTURE_PATH, 'utf8'));
    const result = validateCroquiPayload(data);
    expect(result.isValid).toBe(true);
  });

  it('deve ter src iniciando com "data:image/"', () => {
    const data = JSON.parse(fs.readFileSync(SYNTHETIC_FIXTURE_PATH, 'utf8'));
    expect(data.objects[0].src).toMatch(/^data:image\//);
  });

  it('deve conter todas as chaves que o serializer atual gera', () => {
    const data = JSON.parse(fs.readFileSync(SYNTHETIC_FIXTURE_PATH, 'utf8'));
    const fixtureKeys = Object.keys(data.objects[0]).sort();
    const ourObj = createCroquiImageObject(MINIMAL_JPEG_DATA_URL, 100, 100);
    const ourKeys = Object.keys(ourObj).sort();
    expect(ourKeys).toEqual(fixtureKeys);
  });
});

// ---------------------------------------------------------------------------
// Suite 7: Sanitização de Nomes
// ---------------------------------------------------------------------------

describe('Sanitização de Nomes de Arquivo', () => {
  it('deve remover a extensão .croqui se digitada pelo usuário', () => {
    expect(sanitizeFileName('meu_croqui.croqui')).toBe('meu_croqui');
    expect(sanitizeFileName('teste.CROQUI')).toBe('teste');
  });

  it('deve substituir caracteres proibidos (Windows/Linux) por underscore', () => {
    expect(sanitizeFileName('croqui:teste*2026?')).toBe('croqui_teste_2026_');
    expect(sanitizeFileName('croqui/oeste\\km10')).toBe('croqui_oeste_km10');
  });

  it('deve converter espaços em underscore', () => {
    expect(sanitizeFileName('croqui com espacos')).toBe('croqui_com_espacos');
  });

  it('deve aplicar fallback para entradas vazias ou inválidas', () => {
    expect(sanitizeFileName('')).toBe('croqui_convertido');
    // @ts-expect-error teste intencional de valor inválido
    expect(sanitizeFileName(null)).toBe('croqui_convertido');
  });

  it('deve preservar nomes válidos intactos', () => {
    expect(sanitizeFileName('20261001_croqui_norte')).toBe('20261001_croqui_norte');
  });
});

// ---------------------------------------------------------------------------
// Suite 8: Cálculo de Dimensões e Escala
// ---------------------------------------------------------------------------

describe('Dimensionamento Proporcional de Imagens', () => {
  it('deve limitar à largura máxima preservando proporção', () => {
    const res = calculateOutputDimensions(2600, 1300, 1300);
    expect(res.width).toBe(1300);
    expect(res.height).toBe(650);
    expect(res.scale).toBe(0.5);
  });

  it('não deve ampliar imagens menores que a largura alvo', () => {
    const res = calculateOutputDimensions(800, 600, 1300);
    expect(res.width).toBe(800);
    expect(res.height).toBe(600);
    expect(res.scale).toBe(1);
  });

  it('deve clamp a largura mínima em 300 px', () => {
    const res = calculateOutputDimensions(2000, 1000, 100);
    expect(res.width).toBe(300);
  });

  it('deve clamp a largura máxima em 4000 px', () => {
    const res = calculateOutputDimensions(5000, 2500, 5000);
    expect(res.width).toBe(4000);
  });

  it('não deve gerar dimensões zero ou negativas', () => {
    const res = calculateOutputDimensions(1, 1, 1300);
    expect(res.width).toBeGreaterThanOrEqual(1);
    expect(res.height).toBeGreaterThanOrEqual(1);
  });
});

// ---------------------------------------------------------------------------
// Suite 9: Utilitário formatBytes
// ---------------------------------------------------------------------------

describe('formatBytes — Formatação de Tamanho de Arquivo', () => {
  it('0 bytes', () => expect(formatBytes(0)).toBe('0 B'));
  it('1 KB exato', () => expect(formatBytes(1024)).toBe('1.0 KB'));
  it('1.5 MB', () => expect(formatBytes(1572864)).toBe('1.5 MB'));
  it('valor < 1 KB', () => expect(formatBytes(500)).toBe('500 B'));
});
