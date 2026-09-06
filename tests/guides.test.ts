import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { GUIDES_CATALOG } from '../src/app/config/guides';
import { TOOLS_CATALOG } from '../src/app/config/tools';
import { croquiConverterGuide } from '../src/modules/guides/guides/croqui-converter/croquiConverterGuide';

const expectedAnchors = ['upload', 'preview', 'settings', 'generate', 'result', 'download'];

// Inspeciona atributos JSX, inclusive os condicionais, sem depender de CSS ou textos.
function readAnchors(relativePath: string) {
  const path = fileURLToPath(new URL(relativePath, import.meta.url));
  const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const anchors: { id: string; tag: string }[] = [];
  function visit(node: ts.Node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      for (const attribute of node.attributes.properties) {
        if (ts.isJsxAttribute(attribute) && attribute.name.getText(source) === 'data-guide'
          && attribute.initializer && ts.isStringLiteral(attribute.initializer)) {
          anchors.push({ id: attribute.initializer.text, tag: node.tagName.getText(source) });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return anchors;
}

describe('Preparação dos guias', () => {
  it('mantém os oito passos do Conversor em uma única definição com IDs únicos', () => {
    const ids = croquiConverterGuide.steps.map(step => step.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(['introduction', ...expectedAnchors, 'completion']);
    expect(GUIDES_CATALOG.find(guide => guide.id === 'croqui-converter')).toBe(croquiConverterGuide);
  });

  it('associa cada target a um anchor único da interface real', () => {
    const anchors = [
      ...readAnchors('../src/pages/CroquiConverter/CroquiConverter.tsx'),
      ...readAnchors('../src/modules/croqui-converter/components/ImageUploader.tsx'),
      ...readAnchors('../src/modules/croqui-converter/components/ConverterConfig.tsx'),
      ...readAnchors('../src/modules/croqui-converter/components/ConverterResult.tsx'),
    ];
    const targets = croquiConverterGuide.steps.flatMap(step => step.target ? [step.target] : []);
    expect(targets).toEqual(expectedAnchors);
    expect(anchors.map(anchor => anchor.id).sort()).toEqual([...expectedAnchors].sort());
    for (const target of targets) {
      expect(anchors.filter(anchor => anchor.id === target)).toHaveLength(1);
    }
    for (const id of ['generate', 'download']) {
      expect(anchors.find(anchor => anchor.id === id)?.tag).toBe('button');
    }
  });

  it('possui exatamente os nove guias esperados, sem IDs duplicados', () => {
    const ids = GUIDES_CATALOG.map(guide => guide.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual([
      'platform', 'croqui-converter', 'map-studio', 'croqui-studio', 'dynamics',
      'validator', 'documents', 'field-toolkit', 'business-automation',
    ]);
  });

  it('utiliza somente status válidos e não anuncia ferramentas futuras como disponíveis', () => {
    for (const guide of GUIDES_CATALOG) {
      expect(['available', 'conceptual', 'planned']).toContain(guide.status);
      if (guide.toolId && guide.status === 'available') {
        expect(TOOLS_CATALOG.find(tool => tool.id === guide.toolId)?.status).toBe('available');
      }
    }
  });

  it('referencia ferramentas válidas sem duplicação e dispensa toolId para a plataforma', () => {
    const toolIds = GUIDES_CATALOG.flatMap(guide => guide.toolId ? [guide.toolId] : []);
    expect(new Set(toolIds).size).toBe(toolIds.length);
    for (const toolId of toolIds) {
      expect(TOOLS_CATALOG.some(tool => tool.id === toolId)).toBe(true);
    }
    expect(GUIDES_CATALOG.find(guide => guide.id === 'platform')?.toolId).toBeUndefined();
  });

  it('preserva imagens de resumo visual existentes para todos os guias', () => {
    for (const guide of GUIDES_CATALOG) {
      expect(existsSync(new URL(`../public/guides/${guide.image}`, import.meta.url))).toBe(true);
    }
  });
});
