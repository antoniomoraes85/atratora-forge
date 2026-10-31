import { describe, it, expect } from 'vitest';
import { TOOLS_CATALOG, TOOL_CATEGORIES, getAvailableTools, searchTools } from '../src/app/config/tools';

const plannedDigitalIds = [
  'vetor-evidence',
  'vetor-reports',
  'vetor-mobile',
  'vetor-media',
  'vetor-documents',
  'vetor-fraud',
];

describe('Vetor Forense — coerência do novo catálogo', () => {
  it('preserva as duas ferramentas atuais e suas rotas', () => {
    const existing = getAvailableTools();
    expect(existing.map(t => t.id).sort()).toEqual(['croqui-converter', 'vetor-forense']);
    expect(existing.find(t => t.id === 'vetor-forense')?.path).toBe('/tools/vetor-forense');
    expect(existing.find(t => t.id === 'croqui-converter')?.path).toBe('/tools/croqui-converter');
  });

  it('não anuncia módulos digitais futuros como disponíveis', () => {
    for (const id of plannedDigitalIds) {
      const tool = TOOLS_CATALOG.find(t => t.id === id);
      expect(tool, `Módulo ${id} deve existir`).toBeDefined();
      expect(tool?.status).toBe('planned');
      expect(tool?.path).toBeUndefined();
    }
  });

  it('exige rota apenas em módulos disponíveis e evita IDs duplicados', () => {
    const ids = TOOLS_CATALOG.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const tool of TOOLS_CATALOG) {
      if (tool.status === 'available') {
        expect(tool.path).toMatch(/^\/tools\//);
      } else {
        expect(tool.path).toBeUndefined();
      }
      expect(TOOL_CATEGORIES).toContain(tool.category);
    }
  });

  it('busca os novos serviços por termos com acentos e sem acentos', () => {
    expect(searchTools('celular').some(t => t.id === 'vetor-mobile')).toBe(true);
    expect(searchTools('evidência').some(t => t.id === 'vetor-evidence')).toBe(true);
    expect(searchTools('relatorio').some(t => t.id === 'vetor-reports')).toBe(true);
  });
});
