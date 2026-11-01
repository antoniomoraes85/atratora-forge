import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../src/pages/Home/Home';
import { Logo } from '../src/components/ui/Logo';
import { BlackHoleField } from '../src/components/ui/BlackHoleField';

describe('Vetor Forense — hero panorâmico e identidade ATRATOR v3', () => {
  it('inclui a imagem gerada local em AVIF, sem dependência de CDN', () => {
    const bytes = readFileSync('public/hero/atrator-black-hole.avif');
    expect(bytes.subarray(4, 12).toString('ascii')).toBe('ftypavif');
    expect(bytes.length).toBeGreaterThan(15_000);
    expect(bytes.length).toBeLessThan(100_000);
    const html = renderToStaticMarkup(<BlackHoleField />);
    expect(html).toContain('hero/atrator-black-hole.avif');
    expect(html).not.toContain('https://');
    expect(html).toContain('data-parallax="enabled"');
  });

  it('preserva o conceito gráfico original do novo logo', () => {
    const bytes = readFileSync('public/brand/vetor-forense-concept.avif');
    expect(bytes.subarray(4, 12).toString('ascii')).toBe('ftypavif');
    const svg = readFileSync('public/favicon.svg', 'utf8');
    expect(svg).toContain('vf-gold');
    expect(svg).toContain('aria-label="Vetor Forense VT"');
    const logo = renderToStaticMarkup(<Logo size={46} />);
    expect(logo).toContain('ECOSSISTEMA');
    expect(logo).toContain('ATRATOR');
    expect(logo).toContain('Monograma VT dourado com lupa');
  });

  it('regenera todos os ícones PNG e ICO', () => {
    for (const file of ['favicon-32x32.png','favicon-64x64.png','icon-192.png','icon-512.png']) {
      const buffer = readFileSync(`public/${file}`);
      expect(buffer.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    }
    const ico = readFileSync('public/favicon.ico');
    expect(ico.subarray(0, 4).toString('hex')).toBe('00000100');
  });

  it('destaca o hero em largura inteira e oferece ferramentas reais', () => {
    const css = readFileSync('src/pages/Home/home-forensics.css', 'utf8');
    expect(css).toContain('Dashboard com duas artes');
    expect(css).toContain('margin:-32px -36px 0');
    const html = renderToStaticMarkup(<MemoryRouter><Home /></MemoryRouter>);
    expect(html).toContain('hero/atrator-black-hole.avif');
    expect(html).toContain('href="/tools/vetor-forense"');
    expect(html).toContain('href="/tools/croqui-converter"');
    expect(html).not.toContain('href="/tools/vetor-mobile"');
  });

  it('mantém acessibilidade e movimento reduzido', () => {
    const css = readFileSync('src/components/ui/black-hole-field.css', 'utf8');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('pointer-events:none');
    expect(css).toContain('atrator-infall-particles');
  });
});
