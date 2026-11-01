import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { BlackHoleField } from '../src/components/ui/BlackHoleField';
import { Logo } from '../src/components/ui/Logo';
import { Home } from '../src/pages/Home/Home';

describe('Vetor Forense — dupla cena e fluxos binários ATRATOR', () => {
  const field = renderToStaticMarkup(<BlackHoleField />);
  const home = renderToStaticMarkup(<MemoryRouter><Home /></MemoryRouter>);

  it('importa ambas as artes locais, sem chamadas de CDN', () => {
    for (const path of ['public/hero/fingerprint-matrix.webp', 'public/brand/vt-emblem.webp', 'public/brand/vetor-forense-logo.webp']) {
      const bytes = readFileSync(path);
      expect(bytes.subarray(0, 4).toString('ascii')).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString('ascii')).toBe('WEBP');
      expect(bytes.length).toBeGreaterThan(10_000);
    }
    expect(field).toContain('fingerprint-matrix.webp');
    expect(field).toContain('atrator-black-hole.avif');
    expect(field).not.toContain('http:');
    expect(field).not.toContain('https:');
  });

  it('exibe a impressão à esquerda e o horizonte à direita com 96 linhas e 48 partículas', () => {
    expect(field.indexOf('atrator-depth-evidence')).toBeLessThan(field.indexOf('atrator-depth-back'));
    expect((field.match(/atrator-infall-particles/g) || []).length).toBe(48);
    expect(field).toContain('atrator-binary-flow');
    expect(field).toContain('010110101011');
    expect(field).toContain('101100101101');
    expect(field).toContain('attributeName="startOffset"');
    expect(field).toContain('data-parallax="enabled"');
  });

  it('mantém composição responsiva, cliques livres e respeito à redução de movimento', () => {
    const css = readFileSync('src/components/ui/black-hole-field.css', 'utf8');
    expect(css).toContain('.atrator-depth-evidence');
    expect(css).toContain('.atrator-depth-back');
    expect(css).toContain('mask-image:linear-gradient');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('pointer-events:none');
    expect(css).toContain('.atrator-binary-flow {display:none!important;}');
  });

  it('usa o novo emblema VT no menu e na faixa de apresentação', () => {
    const logo = renderToStaticMarkup(<Logo size={62} />);
    expect(logo).toContain('brand/vt-emblem.webp');
    expect(logo).toContain('Monograma VT dourado');
    expect(home).toContain('brand/vt-emblem.webp');
    expect(home).toContain('INVESTIGAÇÃO DIGITAL');
    expect(home).toContain('CIÊNCIA + INVESTIGAÇÃO');
    expect(home).toContain('CONVERGÊNCIA FORENSE');
    expect(home).toContain('VETOR');
    expect(home).toContain('FORENSE');
    expect(home).not.toContain('Representação artística');
    expect(home).not.toContain('DADOS → HORIZONTE ATRATOR');
  });

  it('preserva as rotas de ferramentas reais e os limites da plataforma', () => {
    expect(home).toContain('href="/tools/vetor-forense"');
    expect(home).toContain('href="/tools/croqui-converter"');
    expect(home).not.toContain('href="/tools/vetor-mobile"');
    expect(home).toContain('Planejado');
    expect(home).toContain('não realizam exames ou certificações nesta versão');
  });
});
