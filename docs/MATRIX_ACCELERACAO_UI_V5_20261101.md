# Vetor Forense — Matrix v5, aceleração e refinamento UI

**Data:** 01/11/2026. **Escopo:** interface, navegação e arte animada. Não foram alterados cálculos, dados, rotas ou pesquisa acadêmica.

## Motivação

O titular solicitou **muito mais linhas** saindo da lupa forense à esquerda, como se o buraco negro ATRATOR as estivesse sugando: **lentas no início e progressivamente mais rápidas ao se aproximar do horizonte**. Em paralelo, pediu abas e botões funcionais organizados com melhor hierarquia, contraste e acabamento profissional.

## O que foi implementado

| Componente | Antes | Agora |
|---|---|---|
| Linhas de fluxo no hero | 34 | **96 caminhos Bézier distintos** |
| Partículas | 34 com dash animado em velocidade linear | **48 partículas ao longo de curvas com aceleração spline** |
| Binários Matrix | 10 | **20 trilhas com aceleração** |
| Movimento | `stroke-dashoffset` linear | `animateMotion` e `textPath` com `calcMode="spline"`, `keySplines=".70 0 .90 .35"` |
| UI das funções | Abas pastel, baixo contraste e estilos inline | **6 abas de alto contraste, estados ativos explícitos, foco visível e layout responsivo** |
| Área superior do módulo veicular | Cabeçalho com pastilhas escuras inconsistentes | **Cabeçalho branco institucional, azul-petróleo, status disponível e breadcrumb claro** |
| Cards/filtros/botões | Bordas e textos pouco contrastantes | **Padrão visual centralizado em `professional-ui.css`** |

A curva de velocidade é uma interpolação visual acelerada: o movimento é relativamente lento nos primeiros trechos do caminho e ganha velocidade no fim da mesma trajetória. Isso é **design**, não modelagem física de geodésicas ou cálculo do horizonte de eventos. As linhas terminam na proximidade visual do limbo do disco fotografado, sem atravessar o núcleo escuro.

## Integridade e desempenho

- 96 trajetórias são estáticas e determinísticas; para reduzir custo de animação, apenas 48 partículas e 20 sequências de texto são animadas simultaneamente.
- O componente mantém a arte local da lupa e do buraco negro, parallax via variáveis CSS e `requestAnimationFrame`.
- `prefers-reduced-motion` mantém as linhas estáticas e desliga partículas e binários móveis.
- O fluxo é decorativo, `aria-hidden` e `pointer-events:none`.
- Não há acesso a dados de terceiros, envio de evidências ou novas permissões.
- As rotas `/tools/vetor-forense` e `/tools/croqui-converter` são preservadas.
- A interação nas abas do módulo veicular mantém os mesmos estados `VFTab`, callbacks de edição e subcomponentes originais.
- Status de módulos digitais não foi alterado: Evidence, Reports, Mobile e afins ainda são planejados.
- Nenhum arquivo da dissertação MPC/RL ou do pré-projeto de doutorado foi modificado.

## Arquivos principais

- `src/components/ui/BlackHoleField.tsx`
- `src/components/ui/black-hole-field.css`
- `src/modules/vetor-forense/components/VetorForense.tsx`
- `src/modules/vetor-forense/components/vetor-module-ui.css`
- `src/styles/professional-ui.css` (incluído em `src/main.tsx`)
- `tests/matrix-acceleration-premium-v5.test.tsx`
- Testes anteriores do fluxo atualizados (96 linhas, 48 partículas, 20 textos).

## Validação requerida

- [ ] TypeScript
- [ ] Testes automáticos e regressão de rotas
- [ ] Build Vite
- [ ] Revisão e integração na main
- [ ] GitHub Pages publicado
- [ ] Inspeção visual desktop/mobile pelo titular

**Aviso:** o software é independente do serviço público, não certifica cadeia de custódia e não emite laudos oficiais.
