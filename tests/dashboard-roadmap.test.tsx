import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../src/pages/Home/Home';

describe('Dashboard de evidências — renderização sem acesso ao navegador', () => {
  const html = renderToStaticMarkup(
    <MemoryRouter><Home /></MemoryRouter>
  );

  it('apresenta a nova estratégia sem oferecer operação mobile inexistente', () => {
    expect(html).toContain('Vetor Evidence');
    expect(html).toContain('Vetor Reports');
    expect(html).toContain('Vetor Mobile');
    expect(html).toContain('Planejado');
    expect(html).toContain('não realizam exames ou certificações nesta versão');
    expect(html).toContain('Ferramenta técnica não é nomeação pericial');
  });

  it('mantém acesso às ferramentas já implementadas', () => {
    expect(html).toContain('Análise de Dinâmica Veicular');
    expect(html).toContain('Conversor .CROQUI');
    expect(html).toContain('href="/tools/vetor-forense"');
    expect(html).toContain('href="/tools/croqui-converter"');
    expect(html).not.toContain('href="/tools/vetor-mobile"');
  });
});
