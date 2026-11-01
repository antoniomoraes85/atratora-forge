# Vetor Forense — Parallax forense e buraco negro ATRATOR

**Atualização:** 31/10/2026. **Entrega:** interface e branding — sem alteração em ferramentas operacionais, algoritmos, dados ou projetos acadêmicos.

## Conceito aprovado

O titular solicitou que a imagem fornecida de **lupa com impressão digital e códigos binários verdes** fosse posicionada à esquerda do hero, com o **buraco negro ATRATOR** à direita. As **ondas binárias devem convergir para o horizonte de eventos**, sugerindo atração e integração visual entre investigação digital e o ecossistema ATRATOR.

### Implementação

- Arte original enviada pelo titular: `public/hero/fingerprint-matrix.webp` (1672 × 941; formato WebP comprimido, sem serviços remotos).
- Buraco negro já existente: `public/hero/atrator-black-hole.avif`, preservado.
- Componente `BlackHoleField.tsx`: duas camadas fotográficas de profundidades distintas, máscaras de fusão entre as imagens, **24 trajetórias convergentes**, pulsos luminosos e **sete sequências de 0/1** deslocadas ao longo das trajetórias.
- Gradiente de fluxo: **verde Matrix → verde-azulado → dourado ATRATOR**; focaliza a passagem do vestígio observado para o buraco negro, sem comprometer a leitura.
- O hero agora separa uma **cena panorâmica superior** de uma faixa **clara de apresentação e ações** abaixo, para que as imagens não concorram com o texto. Preserva a largura útil integral do dashboard.
- Acesso a /tools/vetor-forense e /tools/croqui-converter preservado; os módulos digitais ainda planejados permanecem explicitamente identificados.
- Movimento em três profundidades com `requestAnimationFrame` e CSS custom properties, sem re-render por ponteiro.
- `prefers-reduced-motion: reduce` remove transições, pulsos e fluxos animados decorativos.

### Identidade Vetor Forense

A imagem aprovada com **VT** sobre lupa e impressão digital foi incorporada de modo efetivo:

- Emblema otimizado: `public/brand/vt-emblem.webp`.
- Assinatura completa da arte: `public/brand/vetor-forense-logo.webp`.
- Componente `Logo.tsx`: emblema no menu, na página Sobre e na faixa de apresentação da Home.
- Favicon SVG, símbolo SVG, assinatura vetorial e ícones PNG/ICO/PWA atualizados para a monografia VT; arquivos binários de PWA regenerados.

A imagem e os ornamentos são **ilustrações conceituais**, não um procedimento de extração forense, simulação gravitacional ou evidência pericial. Nenhuma representação de afiliação a órgão policial.

## Critérios de aceite

- [x] Arquivos de arte/branding registrados diretamente na branch GitHub.
- [x] Cenas esquerda e direita alinhadas e graduadas por máscaras CSS.
- [x] Linhas e códigos binários com movimento da lupa ao horizonte.
- [x] Identidade VT aplicada às páginas, menu e ícones.
- [x] Acessibilidade, responsividade e independência de CDN.
- [ ] CI TypeScript, testes automatizados e build de produção.
- [ ] Publicação no GitHub Pages somente após CI.
- [ ] Avaliação visual pelo titular em desktop e smartphone.

## Sem alteração de escopo

O produto permanece ferramenta técnica experimental, sem serviços de perícia digital operacional ou laudos oficiais. Os projetos acadêmicos MPC/RL e doutorado da UFRGS não foram modificados.
