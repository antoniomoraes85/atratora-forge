# Vetor Forense — Convergência Matrix e identificação central (v4)

**Data:** 01/11/2026  
**Escopo:** visual, animação e textos da dashboard; não altera recursos forenses, rotas ou projetos acadêmicos.

## Solicitações incorporadas

- Substituir o fluxo retilíneo por **34 trajetórias irregulares**, com amplitudes, curvaturas e velocidades distintas.
- Aproximar os caminhos do **limbo esquerdo do disco de acreção** do buraco negro, em vez de fazê-los atravessar o centro escuro.
- Usar **10 sequências binárias animadas** sobre curvas, em estilo Matrix; manter as duas artes existentes, lupa à esquerda e buraco negro à direita.
- Atuar com brilho restrito, seguindo a transição verde → verde-azulado → bronze no destino, sem ofuscar as imagens.
- Remover a indicação de rodapé à direita **“Representação artística”**.
- Alterar a mensagem central inferior para **“CIÊNCIA + INVESTIGAÇÃO • CONVERGÊNCIA FORENSE”**.
- **Dar destaque ao nome “VETOR FORENSE” no centro da própria arte**, em prata metálica e fundo radial discreto, sem obscurecer completamente lupa e buraco negro.

## Arquivos alterados

- `src/components/ui/BlackHoleField.tsx`: geração determinística dos 34 caminhos, segmentação C/C/C/Q para variações de curvatura, 10 `textPath` animados e renderização SVG responsiva.
- `src/components/ui/black-hole-field.css`: luz Matrix mais orgânica, gradiente atenuado na captura e névoa focada na região central.
- `src/pages/Home/Home.tsx`: wordmark central, legenda científica e remoção do rótulo à direita.
- `src/pages/Home/home-forensics.css`: wordmark prateado/metalizado e rodapé responsivo no desktop/mobile.
- `tests/matrix-horizon-v4.test.tsx`: testes dos caminhos, binários, identidade central, acessibilidade e preservação de rotas.
- Testes de regressão anteriores atualizados para a nova quantidade de trajetórias.

## Notas de precisão e responsabilidade

- O fluxo visual é uma **metáfora artística** sobre atração e convergência, não cálculo de trajetórias relativísticas ou simulação física do horizonte.
- A geometria visual termina na **proximidade da borda aparente** e é ajustada para a arte fotográfica; sua localização não é estimativa física de horizonte.
- O rótulo “Representação artística” foi retirado por solicitação de design, mas esta documentação registra explicitamente a natureza ilustrativa.
- Os dados apresentados são decorativos; a animação **não coleta evidências reais** ou informações do usuário.
- O modo `prefers-reduced-motion` mantém desativados os pulsos e os binários em movimento.
- As funcionalidades e métodos de dinâmica veicular e conversão de croquis não são alterados.
- As pesquisas de mestrado MPC/RL e doutorado permanecem intocadas.

## Verificações

- [ ] Checagem TypeScript
- [ ] Testes Vitest (incluindo testes v4)
- [ ] Build de produção
- [ ] Integração e publicação GitHub Pages após aprovação
- [ ] Verificação visual final em dispositivos reais
