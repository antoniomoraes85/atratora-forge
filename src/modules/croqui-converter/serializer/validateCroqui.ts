import { FabricImageObject } from '../types';

export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
}

/**
 * Valida se um objeto qualquer atende aos requisitos estruturais de um arquivo .croqui
 */
export function validateCroquiPayload(data: unknown): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      issues: [{ field: 'root', message: 'O arquivo não é um objeto JSON válido.' }],
    };
  }

  const record = data as Record<string, unknown>;

  if (!Array.isArray(record.objects)) {
    issues.push({
      field: 'objects',
      message: 'A raiz do arquivo deve conter a propriedade "objects" como um array.',
    });
    return { isValid: false, issues };
  }

  if (record.objects.length === 0) {
    issues.push({
      field: 'objects',
      message: 'O array "objects" não contém nenhum elemento.',
    });
    return { isValid: false, issues };
  }

  const firstObj = record.objects[0] as Partial<FabricImageObject>;

  if (firstObj.type !== 'image') {
    issues.push({
      field: 'objects[0].type',
      message: `Esperado tipo "image", mas encontrado "${firstObj.type}".`,
    });
  }

  if (typeof firstObj.width !== 'number' || firstObj.width <= 0) {
    issues.push({
      field: 'objects[0].width',
      message: 'A largura (width) deve ser um número positivo.',
    });
  }

  if (typeof firstObj.height !== 'number' || firstObj.height <= 0) {
    issues.push({
      field: 'objects[0].height',
      message: 'A altura (height) deve ser um número positivo.',
    });
  }

  if (typeof firstObj.src !== 'string' || !firstObj.src.startsWith('data:image/')) {
    issues.push({
      field: 'objects[0].src',
      message: 'O atributo "src" deve ser uma Data URL iniciando com "data:image/".',
    });
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
