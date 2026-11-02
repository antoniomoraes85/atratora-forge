# Vetor Forense — VT escrito e disco orbital V7 (02/11/2026)

## Pedido e critério de aceitação

1. O buraco negro da Home não pode parecer estático: o anel luminoso associado visualmente à fotografia precisa apresentar **rotação e movimento perceptíveis mesmo sem mover o ponteiro**, preservando o centro escuro.
2. Na animação de entrada, usar **somente os traçados das letras VT** da marca aprovada, revelados progressivamente; depois **escrever “Vetor Forense”** e por último fazer **surgir uma lupa binária sobreposta**. Sem slogan ou emblema completo aparecendo de imediato.
3. Preservar navegação, funcionalidades reais, performance e preferências de movimento reduzido.

## Implementação

### IntroSplash.tsx + intro-splash.css

- Traçados da marca retirados fielmente de `public/brand/vetor-forense-symbol.svg`: `M12 21 29 49 43 21` (V, prata) e `M33 20H54M43 20 35 47` (T, gradiente dourado).
- Revelação de traços por `stroke-dashoffset` de 0 a 1,56 s.
- Escrita do nome por `steps(13,end)`, começando em 1,35 s e durando 1,18 s.
- Lupa binária circular sobreposta aparece a partir de 2,57 s, com preenchimento ilustrativo reutilizando `public/hero/fingerprint-matrix.webp`, 0/1 e cabo luminoso.
- Vinheta completamente preta, sem subtítulo. Saída entre 3,57 e 4,1 s.
- Duração total 4,1 segundos, com **Pular apresentação**, Escape, gestão de Tab, restauração de foco e `prefers-reduced-motion`.
- Chave de sessão atualizada de `vf-intro-seen-v1` para `vf-intro-seen-v2`, permitindo ver a nova vinheta uma vez mesmo quem já viu a edição anterior. Falha de `sessionStorage` não impede acesso.

### BlackHoleField.tsx + black-hole-field.css

- A imagem original AVIF permanece fixa para não deslocar o buraco negro.
- Agora há um **conjunto orbital** de graduação e luminosidade alinhado ao disco:
  - dois anéis com gradientes cônicos de cores dourada e azulada, girando em sentidos e velocidades distintos (8,5 s / 13 s);
  - SVG com arcos claros, quatro fluxos de luz que rotacionam (7,2 s) e percorrem os arcos por `stroke-dashoffset`;
  - dois filamentos horizontais com movimento `stroke-dashoffset` (2,5 s), sugerindo o disco de acreção e o arraste de luz;
  - brilho oscilante sem preencher a sombra central;
  - alinhamento em dispositivos menores revisto, principalmente pela mudança da imagem de fundo em telas abaixo de 650 px.
- Fluxos Matrix existentes mantidos: **96 caminhos**, **48 partículas aceleradas**, **20 sequências binárias**.
- A camada é gráfica e conceitual. **Não** corresponde a simulação relativística, horizonte de eventos físico, nem trajetória de fótons calculada.
- Respeita `prefers-reduced-motion` com desativação das rotações e dos traços móveis; o DOM da animação é decorativo e sem captura de ponteiro.

## Código alterado

- `src/components/ui/IntroSplash.tsx`
- `src/components/ui/intro-splash.css`
- `src/components/ui/BlackHoleField.tsx`
- `src/components/ui/black-hole-field.css`
- `tests/portal-institucional-v6.test.tsx` (duração da intro).
- `tests/intro-orbit-v7.test.tsx` (regressões de logo, sequência, anel e Matrix).

## Preservação

Nenhum cálculo do módulo de dinâmica veicular nem lógica do conversor `.croqui` foi alterado. Não há dependências novas, APIs externas, acesso a arquivos pessoais ou rastreamento. A plataforma mantém a separação **operacional** vs. **planejado**.

## Testes e aceitação

O workflow existente executa `npm ci`, `npm run typecheck`, `npm test` e `npm run build`. Os testes checam estrutura, ordem temporal declarada, elementos visíveis no DOM e tratamento de acessibilidade. **Testes estruturais não comprovam alinhamento pixel a pixel, fluidez real de animação ou ausência de perda de frames**; verificar em navegador real no desktop e mobile antes de declarar aprovação visual.

Depois do merge, confirmar o deploy do GitHub Pages e registrar o commit final no histórico do GitHub. Permanecem pendentes a auditoria das dependências npm e inspeções visuais/performance reais.
