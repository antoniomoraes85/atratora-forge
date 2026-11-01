import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { BlackHoleField } from '../src/components/ui/BlackHoleField';

describe('Matrix v5 — densidade, aceleração e UI profissional', () => {
  const html = renderToStaticMarkup(<BlackHoleField />);

  it('desenha 96 linhas determinísticas da lupa ao limbo do disco', () => {
    const paths = [...html.matchAll(/id="vf-infall-(\d+)" d="([^"]+)"/g)];
    expect(paths).toHaveLength(96);
    expect(new Set(paths.map(([, , d]) => d)).size).toBe(96);
    expect(paths.every(([, , d]) => d.startsWith('M') && d.includes('Q'))).toBe(true);
    expect(html).toContain('fingerprint-matrix.webp');
    expect(html).toContain('atrator-black-hole.avif');
  });

  it('usa 48 partículas com velocidade crescente ao longo da mesma curva', () => {
    const animations = [...html.matchAll(/<animateMotion\b[^>]*>/g)].map(x => x[0]);
    expect(animations).toHaveLength(48);
    for (const item of animations) {
      expect(item).toContain('calcMode="spline"');
      expect(item).toContain('keyTimes="0;1"');
      expect(item).toContain('keySplines=".70 0 .90 .35"');
      expect(item).toContain('rotate="auto"');
    }
    expect(new Set(animations.map(item => /dur="([\d.]+)s"/.exec(item)?.[1])).size).toBeGreaterThan(5);
  });

  it('mostra 20 sequências binárias com aceleração progressiva', () => {
    expect((html.match(/class="atrator-binary-digits"/g) ?? [])).toHaveLength(20);
    const offsets = [...html.matchAll(/<animate attributeName="startOffset"[^>]*>/g)];
    expect(offsets).toHaveLength(20);
    expect(offsets.every(([tag]) => tag.includes('keySplines=".70 0 .90 .35"'))).toBe(true);
    expect(html).toContain('010110101011001');
    expect(html).toContain('001011010111010');
  });

  it('reduz movimento e não bloqueia a interação das ferramentas', () => {
    const css = readFileSync('src/components/ui/black-hole-field.css','utf8');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('.atrator-infall-particles {display:none!important;}');
    expect(css).toContain('.atrator-binary-flow {display:none!important;}');
    expect(css).toContain('pointer-events:none');
  });

  it('inclui abas navegáveis e estados ativos com contraste elevado', () => {
    const jsx = readFileSync('src/modules/vetor-forense/components/VetorForense.tsx','utf8');
    const css = readFileSync('src/modules/vetor-forense/components/vetor-module-ui.css','utf8');
    const global = readFileSync('src/styles/professional-ui.css','utf8');
    expect(jsx).toContain('aria-pressed={selected}');
    expect(jsx).toContain('className={`vf-subnav-item');
    expect(jsx).toContain('VFNewAnalysis analysisId={editingAnalysisId}');
    expect(css).toContain('.vf-subnav-item.is-active');
    expect(css).toContain('background:#193f4c');
    expect(css).toContain(':focus-visible');
    expect(global).toContain('.vf-light-active-card');
    expect(global).toContain('.vf-tools-groups button.is-selected');
    expect(global).toContain('.vf-shell-nav-item.is-active');
  });
});
