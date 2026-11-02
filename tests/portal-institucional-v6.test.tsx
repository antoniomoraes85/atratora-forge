import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { NAV_SECTIONS, NAV_ITEMS } from '../src/app/config/navigation';
import { Sidebar } from '../src/components/layout/Sidebar';
import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { Home } from '../src/pages/Home/Home';
import { Features } from '../src/pages/Features/Features';
import { Institutional } from '../src/pages/Institutional/Institutional';
import { FAQ } from '../src/pages/FAQ/FAQ';
import { Roadmap } from '../src/pages/Roadmap/Roadmap';
import { Contact } from '../src/pages/Contact/Contact';
import { BlackHoleField } from '../src/components/ui/BlackHoleField';

const render = (component: React.ReactNode) =>
  renderToStaticMarkup(<MemoryRouter>{component}</MemoryRouter>);

describe('Vetor Forense v6 — portal institucional + animação', () => {
  it('organiza menu por quatro áreas e não duplica rotas', () => {
    expect(NAV_SECTIONS.map(section => section.title)).toEqual([
      'EXPLORAR', 'APRENDER', 'INSTITUCIONAL', 'EVOLUÇÃO',
    ]);
    const paths = NAV_ITEMS.map(item => item.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of ['/','/features','/tools','/guides','/faq','/institutional','/about','/contact','/roadmap','/projects']) {
      expect(paths).toContain(path);
    }
    const html = render(<Sidebar isOpen={false} onClose={() => {}} />);
    expect(html).toContain('Funcionalidades');
    expect(html).toContain('Missão, visão e valores');
    expect(html).toContain('Projetos locais');
    expect(html).toContain('Futuro');
  });

  it('introduz atalhos no cabeçalho e páginas navegáveis no HashRouter', () => {
    const html = render(<Header />);
    for (const label of ['Home','Funcionalidades','Catálogo','Guias','Institucional']) {
      expect(html).toContain(label);
    }
    const routes = readFileSync('src/app/routes/AppRoutes.tsx','utf8');
    for (const path of ['/features','/faq','/institutional','/roadmap','/contact']) {
      expect(routes).toContain(`path="${path}"`);
    }
  });

  it('mostra imagem e descrição de funcionalidades com acesso somente às existentes', () => {
    const html = render(<Features />);
    expect(html).toContain('Funcionalidades');
    expect(html).toContain('guides/dynamics-guide.png');
    expect(html).toContain('guides/croqui-converter-guide.png');
    expect(html).toContain('href="/tools/vetor-forense"');
    expect(html).toContain('href="/tools/croqui-converter"');
    expect(html).toContain('Planejado');
    expect(html).not.toContain('href="/tools/vetor-mobile"');
    expect(html).not.toContain('href="/tools/vetor-evidence"');
    expect(html).toContain('não representam telas ou operações já implementadas');
  });

  it('traz identidade institucional e suporte sem prometer perícia oficial', () => {
    const institutional = render(<Institutional />);
    const faq = render(<FAQ />);
    const roadmap = render(<Roadmap />);
    const contact = render(<Contact />);
    for (const label of ['MISSÃO','VISÃO','Valores','Rigor técnico','Independência']) {
      expect(institutional).toContain(label);
    }
    expect(faq).toContain('perícia oficial');
    expect(faq).toContain('Não.');
    expect(roadmap).toContain('Disponível');
    expect(roadmap).toContain('Planejado');
    expect(contact).toContain('github.com/antoniomoraes85/atratora-forge/issues/new');
    expect(contact).toContain('Não encaminhe denúncias');
  });

  it('mantém o hero e a marca central e acrescenta vitrine e institucional na home', () => {
    const home = render(<Home />);
    expect(home).toContain('VETOR <span>FORENSE</span>');
    expect(home).toContain('Funcionalidades em destaque');
    expect(home).toContain('Ciência e investigação unidas pelo método');
    expect(home).toContain('href="/features"');
    expect(home).toContain('href="/institutional"');
    expect(home).toContain('href="/roadmap"');
    expect(home).toContain('href="/tools/vetor-forense"');
    expect(home).toContain('href="/tools/croqui-converter"');
  });

  it('anima luz do anel aparente, não o núcleo central, e respeita movimento reduzido', () => {
    const field = renderToStaticMarkup(<BlackHoleField />);
    const css = readFileSync('src/components/ui/black-hole-field.css', 'utf8');
    expect(field).toContain('atrator-depth-horizon');
    expect(field).toContain('atrator-horizon-orbit');
    expect(field).toContain('atrator-horizon-sheen');
    expect(css).toContain('@keyframes vf-horizon-orbit');
    expect(css).toContain('@keyframes vf-horizon-counter');
    expect(css).toContain('prefers-reduced-motion:reduce');
    expect(css).toContain('animation:none!important;opacity:.2;');
    expect(field).toContain('atrator-binary-flow');
  });

  it('limita a vinheta ao primeiro acesso por aba com botão para pular', () => {
    const splash = readFileSync('src/components/ui/IntroSplash.tsx','utf8');
    const css = readFileSync('src/components/ui/intro-splash.css','utf8');
    expect(splash).toContain('window.sessionStorage.getItem');
    expect(splash).toContain('prefers-reduced-motion: reduce');
    expect(splash).toContain('Pular apresentação');
    expect(splash).toContain('DURATION_MS = 1850');
    expect(css).toContain('background:#010406');
    expect(css).toContain('vf-intro-exit');
    expect(readFileSync('src/components/layout/Layout.tsx','utf8')).toContain('<IntroSplash />');
  });

  it('destaca a página selecionada no cabeçalho sem esconder atalhos', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/features']}><Header /></MemoryRouter>
    );
    expect(html).toContain('class="vf-shell-top-link is-active"');
    expect(html).toContain('href="/features"');
    expect(html).toContain('href="/institutional"');
  });

  it('oferece rodapé institucional com acesso a FAQ, contato e limites técnicos', () => {
    const html = render(<Footer />);
    expect(html).toContain('Missão e valores');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('href="/faq"');
    expect(html).toContain('não produz laudo oficial');
    expect(html).toContain('não certifica cadeia de custódia');
  });

});
