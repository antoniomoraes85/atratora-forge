import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { PRODUCT_GROUPS } from '../src/app/config/productGroups';
import { TOOLS_CATALOG } from '../src/app/config/tools';
import { Logo } from '../src/components/ui/Logo';
import { BlackHoleField } from '../src/components/ui/BlackHoleField';
import { Home } from '../src/pages/Home/Home';
import { Tools } from '../src/pages/Tools/Tools';

describe('ATRATOR / Vetor Forense — identidade e continuidade visual', () => {
  it('mantém todos os identificadores técnicos mapeados uma única vez', () => {
    const ids = PRODUCT_GROUPS.flatMap(group => group.toolIds);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(TOOLS_CATALOG.map(tool => tool.id).sort());
    expect(PRODUCT_GROUPS).toHaveLength(4);
  });

  it('mantém rótulos intuitivos sem alterar rotas de módulos operacionais', () => {
    const byId = (id: string) => TOOLS_CATALOG.find(tool => tool.id === id);
    expect(byId('vetor-evidence')?.title).toBe('Gestão de Evidências Digitais');
    expect(byId('vetor-mobile')?.title).toBe('Análise de Dispositivos Móveis');
    expect(byId('vetor-forense')?.title).toBe('Reconstrução de Dinâmica Veicular');
    expect(byId('croqui-converter')?.title).toBe('Conversor de Croquis');
    expect(byId('vetor-forense')?.path).toBe('/tools/vetor-forense');
    expect(byId('croqui-converter')?.path).toBe('/tools/croqui-converter');
  });

  it('renderiza logotipo Vetor Forense e símbolo vetorial próprio', () => {
    const html = renderToStaticMarkup(<Logo />);
    expect(html).toContain('Monograma Vetor Forense');
    expect(html).toContain('VETOR');
    expect(html).toContain('FORENSE');
    expect(html).toContain('ATRATOR');
    expect(html).toContain('viewBox="0 0 64 64"');
  });

  it('renderiza campo gravitacional sem depender de window no primeiro render', () => {
    const html = renderToStaticMarkup(<BlackHoleField />);
    expect(html).toContain('atrator-event-horizon');
    expect(html).toContain('atrator-flow-field');
    expect(html).toContain('aria-hidden="true"');
  });

  it('apresenta nova home com prioridades e as duas rotas reais', () => {
    const html = renderToStaticMarkup(<MemoryRouter><Home /></MemoryRouter>);
    expect(html).toContain('Método e precisão');
    expect(html).toContain('Vetor Evidence');
    expect(html).toContain('Vetor Reports');
    expect(html).toContain('Vetor Mobile');
    expect(html).toContain('href="/tools/vetor-forense"');
    expect(html).toContain('href="/tools/croqui-converter"');
    expect(html).not.toContain('href="/tools/vetor-mobile"');
  });

  it('preserva navegação do catálogo no tema claro', () => {
    const html = renderToStaticMarkup(<MemoryRouter><Tools /></MemoryRouter>);
    expect(html).toContain('Todas as ferramentas');
    expect(html).toContain('Evidências e análises');
    expect(html).toContain('Reconstrução de Dinâmica Veicular');
    expect(html).toContain('Planejado');
  });
});
