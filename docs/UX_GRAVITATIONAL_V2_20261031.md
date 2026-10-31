# Vetor Forense / ATRATOR — Revisão de UX e parallax v2 (31/10/2026)

**Motivo:** retorno do titular indicando que a primeira versão do tema claro e do parallax ainda não atingiu a qualidade visual desejada.

## Diagnóstico técnico do v1

1. **Baixo contraste do elemento gravitacional:** o campo SVG tinha opacidades cumulativas muito baixas; arte sobre fundo claro e máscara lateral desvaneciam o núcleo e as linhas.
2. **Movimento parcialmente não responsivo:** o manipulador `pointermove` estava no próprio elemento decorativo, atrás do texto e de links; a área interativa efetiva era insuficiente.
3. **Hierarquia invertida:** três grandes cards de funcionalidades ainda indisponíveis surgiam antes das ferramentas reais; a home parecia mais um roadmap do que uma plataforma.
4. **Excesso de seções e status:** repetições de badges, cartões, descrições e blocos distraiam do valor funcional.

Esses achados derivam do código do v1, não de um estudo de usabilidade com clientes.

## Direção adotada na v2

- **Superfície:** fundo claro e papel branco, com um único painel de arte escura no hero. A paleta permanece grafite/bronze/cinza-azulado, sem arco-íris.
- **Hero editorial:** título curto, descrição centrada na função e uma ação principal para o catálogo.
- **Arte gravitacional:** `BlackHoleField.tsx` contém 24 fluxos vetoriais de luz convergentes, quatro feixes curvos auxiliares, disco inclinado e núcleo negro com anéis fotônicos, em três camadas.
- **Movimento:** pequenos sinais percorrem os fluxos via `stroke-dashoffset`. Fundo, fluxos e núcleo têm fatores diferentes de parallax; `pointermove` e `scroll` são observados na janela e atualizam propriedades CSS em `requestAnimationFrame`. Clamps limitam o movimento a ~24 px. Isso funciona mesmo quando o cursor está sobre outros elementos do hero.
- **Acessibilidade:** `prefers-reduced-motion` desliga fluxos e parallax. SVG decorativo `aria-hidden`; camada com `pointer-events:none` não bloqueia links e controles.
- **Performance:** arte é procedural em SVG; sem downloads externos, canvas/WebGL, armazenamento ou telemetria. Uma atualização por frame, sem estado React por movimento.
- **Arquitetura da informação:** duas ferramentas **operacionais em destaque** imediatamente após o hero. Os três futuros módulos prioritários passam a ser linhas compactas, seguidas de suas especialidades futuras em texto, sem cartões duplicados.
- **Integridade:** IDs, rotas, motores de cálculo, armazenamento local, indicadores de maturidade e descrição jurídica continuam preservados.

## Critérios de aceite

- [x] Efeito visual mais legível, isolado da área textual.
- [x] Três camadas e fluxo direcional de luz para o horizonte.
- [x] Respeito a movimento reduzido e ausência de obstrução de cliques.
- [x] Ferramentas ativas precedem módulos planejados.
- [x] Sem funções fictícias de perícia digital.
- [ ] Pipeline: TypeScript + Vitest + build.
- [ ] Publicação em GitHub Pages após validação.
- [ ] Inspeção visual complementar em navegadores e dispositivos reais pelo proprietário.

## Relação com os objetivos comerciais

Esta entrega é **apenas design/UI**. A plataforma não passou a realizar diagnósticos de celulares, perícias digitais, emissão de laudos oficiais ou custódia certificada. O MVP funcional prioritário permanece Gestão de Evidências Digitais (Issue #3). O controle de dependências de segurança permanece Issue #4.

**Nenhuma alteração foi realizada nas pesquisas de mestrado MPC/RL ou na proposta de doutorado.**
