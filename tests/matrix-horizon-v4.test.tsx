import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { BlackHoleField } from '../src/components/ui/BlackHoleField';
import { Home } from '../src/pages/Home/Home';

describe('ATRATOR — convergência Matrix irregular e assinatura central', () => {
  const field = renderToStaticMarkup(<BlackHoleField />);
  const home = renderToStaticMarkup(<MemoryRouter><Home /></MemoryRouter>);

  it('usa 34 caminhos distintos e pulsos animados com velocidades variadas', () => {
    const paths = [...field.matchAll(/id="vf-infall-(\d+)" d="([^"]+)"/g)];
    expect(paths).toHaveLength(34);
    expect(new Set(paths.map(([, , d]) => d)).size).toBe(34);
    expect(paths.every(([, , d]) => (d.match(/C/g) ?? []).length >= 3 && d.includes('Q'))).toBe(true);
    const pulseDurations = [...field.matchAll(/animation-duration:([\d.]+)s/g)].map(match => match[1]);
    expect(new Set(pulseDurations).size).toBeGreaterThanOrEqual(5);
  });

  it('leva dez sequências Matrix ao longo de caminhos curvos', () => {
    expect((field.match(/class="atrator-binary-digits"/g) ?? []).length).toBe(10);
    expect((field.match(/attributeName="startOffset"/g) ?? []).length).toBe(10);
    expect(field).toContain('010110101011001');
    expect(field).toContain('101100101101110');
    expect(field).toContain('001011010111010');
  });

  it('destaca VETOR FORENSE no centro da arte e remove o rodapé antigo', () => {
    expect(home).toContain('vf-light-art-brand-name');
    expect(home).toContain('>VETOR <span>FORENSE</span>');
    expect(home).toContain('CIÊNCIA + INVESTIGAÇÃO');
    expect(home).toContain('CONVERGÊNCIA FORENSE');
    expect(home).not.toContain('Representação artística');
    expect(home).not.toContain('DADOS → HORIZONTE ATRATOR');

    const css = readFileSync('src/pages/Home/home-forensics.css', 'utf8');
    expect(css).toContain('left:50%;top:48%');
    expect(css).toContain('background-clip:text');
    expect(css).toContain('.vf-light-art-brand-name');
  });

  it('mantém acessibilidade e a funcionalidade das duas ferramentas reais', () => {
    expect(home).toContain('href="/tools/vetor-forense"');
    expect(home).toContain('href="/tools/croqui-converter"');
    expect(home).not.toContain('href="/tools/vetor-mobile"');
    const css = readFileSync('src/components/ui/black-hole-field.css','utf8');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('pointer-events:none');
    expect(field).toContain('aria-hidden="true"');
  });
});
