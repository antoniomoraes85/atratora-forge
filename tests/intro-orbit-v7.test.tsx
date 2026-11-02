import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { BlackHoleField } from '../src/components/ui/BlackHoleField';

describe('Vetor Forense v7 — assinatura escrita e disco luminoso ativo', () => {
  const intro = readFileSync('src/components/ui/IntroSplash.tsx', 'utf8');
  const introCss = readFileSync('src/components/ui/intro-splash.css', 'utf8');
  const horizonCss = readFileSync('src/components/ui/black-hole-field.css', 'utf8');
  const field = renderToStaticMarkup(<BlackHoleField />);

  it('desenha VT com os mesmos traçados do logo aprovado, sem exibir o emblema inteiro', () => {
    const original = readFileSync('public/brand/vetor-forense-symbol.svg', 'utf8');
    const paths = ['M12 21 29 49 43 21', 'M33 20H54M43 20 35 47'];
    for (const path of paths) {
      expect(intro).toContain(path);
      expect(original).toContain(path);
    }
    expect(intro).toContain('vf-intro-draw-v');
    expect(intro).toContain('vf-intro-draw-t');
    expect(intro).not.toContain('brand/vt-emblem.webp');
    expect(intro).toContain('Vetor Forense');
    expect(intro).not.toContain('CIÊNCIA · INVESTIGAÇÃO · TECNOLOGIA ATRATOR');
  });

  it('ordena os estágios: letra, escrita e lupa binária sobreposta', () => {
    expect(introCss).toContain('vf-intro-trace 1.14s .15s');
    expect(introCss).toContain('vf-intro-trace .98s .58s');
    expect(introCss).toContain('vf-intro-type 1.18s 1.35s steps(13,end)');
    expect(introCss).toContain('vf-intro-loupe-reveal .78s 2.57s');
    expect(introCss).toContain('vf-intro-exit 4.1s');
    expect(intro).toContain('DURATION_MS = 4100');
    expect(intro).toContain('vf-intro-seen-v2');
    expect(intro).toContain('Pular apresentação');
    expect(intro).toContain("event.key === 'Escape'");
    expect(intro).toContain("event.key === 'Tab'");
    expect(intro).toContain('window.sessionStorage.setItem');
    expect(existsSync('public/hero/fingerprint-matrix.webp')).toBe(true);
  });

  it('mantém efeito orbital independente do mouse com arcos e trilhos de luz', () => {
    expect(field).toContain('atrator-horizon-assembly');
    expect(field).toContain('atrator-horizon-orbit');
    expect(field).toContain('atrator-horizon-sheen');
    expect(field).toContain('atrator-horizon-tracers');
    expect(field).toContain('atrator-horizon-disk-current');
    expect(field).toContain('atrator-horizon-fast-arc');
    expect(field).toContain('atrator-horizon-blue-arc');
    expect(horizonCss).toContain('animation:vf-horizon-orbit 8.5s linear infinite');
    expect(horizonCss).toContain('animation:vf-horizon-flow-turn 7.2s linear infinite');
    expect(horizonCss).toContain('animation:vf-horizon-disk-stream 2.5s linear infinite');
    expect(horizonCss).toContain('@keyframes vf-horizon-dash');
    expect(horizonCss).toContain('z-index:5');
  });

  it('não altera fluxo Matrix nem requisitos de acessibilidade', () => {
    expect((field.match(/id="vf-infall-/g) ?? []).length).toBe(96);
    expect((field.match(/<animateMotion/g) ?? []).length).toBe(48);
    expect((field.match(/class="atrator-binary-digits"/g) ?? []).length).toBe(20);
    expect(intro).toContain('(prefers-reduced-motion: reduce)');
    expect(introCss).toContain('prefers-reduced-motion:reduce');
    expect(horizonCss).toContain('prefers-reduced-motion:reduce');
    expect(horizonCss).toContain('.atrator-horizon-flow,.atrator-horizon-fast-arc');
    expect(horizonCss).toContain('animation:none!important;');
    expect(intro).toContain('aria-modal="true"');
    expect(field).toContain('aria-hidden="true"');
  });
});
