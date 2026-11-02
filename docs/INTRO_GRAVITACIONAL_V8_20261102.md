# Vetor Forense — Intro gravitacional V8 (02/11/2026)

## Pedido implementado

O usuário solicitou remover inteiramente a lupa da animação de abertura, apresentar **VT em ouro metálico igual ao estilo da marca principal**, escrever **Vetor Forense em aço/prata metálica** e, na sequência, fazer **ambos serem sugados rapidamente para um buraco negro ao fundo**.

Esta atualização modifica apenas a abertura. A arte e os controles da Home, o disco orbital do hero e todas as ferramentas operacionais não são alterados.

## Sequência de 3,7 segundos

1. **0–1,4 s**: tela quase preta com buraco negro ao fundo; traços originais `M12 21 29 49 43 21` e `M33 20H54M43 20 35 47` das letras VT são desenhados gradativamente. Os dois usam um gradiente metálico dourado com reflexos claros e sombras bronze.
2. **1,3–2,4 s**: o nome **Vetor Forense** é revelado em treze passos, com gradiente aço/escovado. O VT permanece no centro.
3. **2,44–3,22 s**: o agrupamento **VT + nome** sofre translação, rotação discreta, redução acelerada de escala e desfoque, terminando com opacidade zero no centro do buraco negro. A curva `cubic-bezier(.73,.02,1,.65)` acelera a captura.
4. **3,26–3,7 s**: o overlay desaparece por fade-out, liberando a interface.

O buraco negro é um **elemento visual CSS**, separado do hero, composto por sombra central negra, dois arcos de acreção com gradientes rotativos e uma linha luminosa atrás da silhueta. Nenhuma lupa, texto binário ou símbolo integral aparece nesta abertura.

## Acessibilidade e integridade

- O usuário pode **pular** a abertura ou usar **Escape**.
- O foco do teclado é direcionado ao botão e restaurado ao final.
- A apresentação ocorre uma vez por aba, sob a chave nova `vf-intro-seen-v3`; visitantes que já viram a anterior poderão ver a V8 uma vez.
- Em `prefers-reduced-motion`, a intro não é exibida. Não impede o acesso se `sessionStorage` falhar.
- Não há dependências novas, telemetria, requisições externas ou processamento de dados de casos.
- **Preservados:** módulos de Dinâmica Veicular e conversão `.croqui`, navegação institucional, 96 linhas/48 partículas/20 dígitos Matrix e o buraco negro animado do hero.
- A animação de sucção é **metáfora visual**, sem simulação relativística.

## Arquivos da implementação

- `src/components/ui/IntroSplash.tsx`
- `src/components/ui/intro-splash.css`
- `tests/intro-orbit-v7.test.tsx` (regressão ajustada)
- `tests/portal-institucional-v6.test.tsx` (temporizador atualizado)
- `tests/intro-gravity-v8.test.tsx` (testes novos)

## Validação

Rodar `npm ci`, `npm run typecheck`, `npm test` e `npm run build` na branch, integrar somente após CI verde e confirmar o GitHub Pages. **Testes de código não substituem inspeção visual real** da fluidez, cor e posicionamento no desktop e celular.

Manter pendente a auditoria npm das dependências e a validação estética/performance em navegadores reais.
