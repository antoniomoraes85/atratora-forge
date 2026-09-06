import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GuideStepper } from '../src/modules/guides/components/GuideStepper';
import { TourOverlay } from '../src/modules/guides/components/TourOverlay';
import { croquiConverterGuide } from '../src/modules/guides/guides/croqui-converter/croquiConverterGuide';

// O ambiente Node não monta efeitos. Capturamos o efeito para verificar a busca
// de anchors ausentes e a limpeza, sem instalar um DOM ou testar geometria CSS.
const { effects } = vi.hoisted(() => ({ effects: [] as Array<() => void | (() => void)> }));
vi.mock('react', async importOriginal => {
  const actual = await importOriginal<typeof import('react')>();
  return { ...actual, useEffect: (effect: () => void | (() => void)) => effects.push(effect) };
});

afterEach(() => {
  effects.length = 0;
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Robustez da preparação interativa', () => {
  it.each([8, 9, 100])('limita o contador e mantém 100%% após conclusão no índice %i', index => {
    const markup = renderToStaticMarkup(
      <GuideStepper steps={croquiConverterGuide.steps} currentStepIndex={index} onStepSelect={() => {}} />,
    );
    expect(markup).toContain('Passo 8 de 8');
    expect(markup).toContain('aria-valuenow="100"');
  });

  it('aceita uma lista vazia sem exceder o total', () => {
    const markup = renderToStaticMarkup(
      <GuideStepper steps={[]} currentStepIndex={0} onStepSelect={() => {}} />,
    );
    expect(markup).toContain('Passo 0 de 0');
    expect(markup).toContain('aria-valuenow="0"');
  });

  it.each(['result', 'download'])('não desenha overlay nem lança erro sem o target %s', targetId => {
    vi.useFakeTimers();
    const querySelector = vi.fn(() => null);
    vi.stubGlobal('document', { querySelector });
    vi.stubGlobal('window', { addEventListener: vi.fn(), removeEventListener: vi.fn() });
    const consoleError = vi.spyOn(console, 'error');
    const onTargetMissing = vi.fn();

    expect(renderToStaticMarkup(
      <TourOverlay targetId={targetId} isActive onTargetMissing={onTargetMissing} />,
    )).toBe('');
    expect(effects).toHaveLength(1);
    const cleanup = effects[0]();
    expect(querySelector).toHaveBeenCalledWith(`[data-guide="${targetId}"]`);
    expect(onTargetMissing).toHaveBeenCalledWith(targetId);
    expect(() => vi.runAllTimers()).not.toThrow();
    if (cleanup) cleanup();
    expect(consoleError).not.toHaveBeenCalled();
  });
});
