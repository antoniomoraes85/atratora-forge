import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

describe('Intro V8 — ouro, aço e captura gravitacional sem lupa', () => {
  const source = readFileSync('src/components/ui/IntroSplash.tsx','utf8');
  const css = readFileSync('src/components/ui/intro-splash.css','utf8');

  it('usa apenas VT + Vetor Forense diante do buraco negro', () => {
    expect(source).toContain('vf-intro-gravity');
    expect(source).toContain('vf-intro-horizon');
    expect(source).toContain('vf-intro-horizon-orbit');
    expect(source).toContain('vf-intro-accretion-plane');
    expect(source).toContain('vf-intro-vt-glyph');
    expect(source).toContain('vf-intro-typewriter');
    expect(source).toContain('Vetor Forense');
    expect(source).not.toContain('vf-intro-loupe');
    expect(source).not.toContain('vf-intro-bits');
    expect(source).not.toContain('fingerprint-matrix.webp');
  });

  it('pinta ambas as letras no mesmo gradiente dourado da assinatura', () => {
    expect(source).toContain('id="vf-intro-letter-gold"');
    expect(source).toContain('d="M12 21 29 49 43 21"');
    expect(source).toContain('d="M33 20H54M43 20 35 47"');
    expect((source.match(/stroke="url\(#vf-intro-letter-gold\)"/g) ?? []).length).toBe(2);
    expect(source).toContain('#fff5d6');
    expect(source).toContain('#d19b47');
    expect(css).toContain('vf-intro-trace');
  });

  it('aplica gradiente aço na frase e aceleração na direção do centro', () => {
    expect(css).toContain('.vf-intro-typewriter');
    expect(css).toContain('#778c9c');
    expect(css).toContain('#657a88');
    expect(css).toContain('background-clip:text;');
    expect(css).toContain('vf-intro-type 1.10s 1.30s steps(13,end)');
    expect(css).toContain('animation:vf-intro-infall 3.7s');
    expect(css).toContain('@keyframes vf-intro-infall');
    expect(css).toContain('66%');
    expect(css).toContain('87%');
    expect(css).toContain('scale(.008) rotate(23deg)');
    expect(css).toContain('cubic-bezier(.73,.02,1,.65)');
    expect(css).toContain('@keyframes vf-intro-gravity-reveal');
    expect(css).toContain('z-index:2');
  });

  it('preserva acesso imediato, movimento reduzido e abertura uma vez por sessão', () => {
    expect(source).toContain("SESSION_KEY = 'vf-intro-seen-v3'");
    expect(source).toContain('DURATION_MS = 3700');
    expect(source).toContain('window.sessionStorage.getItem');
    expect(source).toContain('window.sessionStorage.setItem');
    expect(source).toContain('Pular apresentação');
    expect(source).toContain("event.key === 'Escape'");
    expect(source).toContain("event.key === 'Tab'");
    expect(source).toContain('prefers-reduced-motion: reduce');
    expect(source).toContain('aria-modal="true"');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('animation:none!important;');
  });
});
