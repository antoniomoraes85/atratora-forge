import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { readFileSync } from 'node:fs';
import { BlackHoleField } from '../src/components/ui/BlackHoleField';
import { Home } from '../src/pages/Home/Home';

describe('Experiência gravitacional ATRATOR v2', () => {
  const art = renderToStaticMarkup(<BlackHoleField />);
  const page = renderToStaticMarkup(<MemoryRouter><Home /></MemoryRouter>);

  it('mostra três camadas SVG e rastros de luz em direção ao horizonte', () => {
    expect(art).toContain('atrator-depth-back');
    expect(art).toContain('atrator-depth-streams');
    expect(art).toContain('atrator-depth-core');
    expect(art).toContain('atrator-flow-field');
    expect(art).toContain('atrator-infall-particles');
    expect(art).toContain('data-parallax="enabled"');
    expect(art).toContain('aria-hidden="true"');
    expect((art.match(/atrator-infall-particles/g) ?? []).length).toBe(34);
  });

  it('carrega a imagem AVIF local sem requisições externas', () => {
    expect(art).toContain('hero/atrator-black-hole.avif');
    expect(art).toContain('class="atrator-photo"');
    expect(art).not.toContain('http:');
    expect(art).not.toContain('https:');
    expect(art).not.toContain('<canvas');
    expect(art).not.toContain('fetch(');
  });

  it('usa CSS de parallax e preserva preferência por movimento reduzido', () => {
    const css = readFileSync('src/components/ui/black-hole-field.css', 'utf8');
    const source = readFileSync('src/components/ui/BlackHoleField.tsx', 'utf8');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('atrator-infall');
    expect(css).toContain('--pointer-x');
    expect(source).toContain("window.addEventListener('pointermove'");
    expect(source).toContain("window.addEventListener('scroll'");
    expect(source).toContain('window.cancelAnimationFrame');
  });

  it('valoriza ferramentas existentes e mantém roadmap não operacional', () => {
    expect(page).toContain('Ferramentas disponíveis');
    expect(page).toContain('href="/tools/vetor-forense"');
    expect(page).toContain('href="/tools/croqui-converter"');
    expect(page).toContain('Vetor Evidence');
    expect(page).toContain('Vetor Reports');
    expect(page).toContain('Vetor Mobile');
    expect(page).not.toContain('href="/tools/vetor-mobile"');
    expect(page).toContain('não realizam exames ou certificações nesta versão');
  });
});
