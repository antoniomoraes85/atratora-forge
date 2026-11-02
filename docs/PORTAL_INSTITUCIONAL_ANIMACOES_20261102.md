# Vetor Forense — Portal Institucional e Animações V6 (02/11/2026)

## Objetivo

Reposicionar a interface do Vetor Forense como **produto técnico institucional** do ecossistema ATRATOR, com navegação compreensível, apresentação ilustrada de funções, conteúdo institucional e acabamento de animação no hero. **Não** amplia as capacidades forenses operacionais do produto.

## Estado de entrega

- **Operacionais:** Reconstrução de Dinâmica Veicular (`#/tools/vetor-forense`); Conversor de Croquis (`#/tools/croqui-converter`).
- **Planejados:** Vetor Evidence, Reports, Mobile, Media, Documents e Fraud.
- **Em desenvolvimento ou roadmap legado:** recursos de mapas, croquis, validação, projetos locais e automação, com disponibilidade indicada pelo catálogo.
- Nenhuma função planejada passa a executar exames, gerar laudos oficiais, certificar autenticidade ou cadeia de custódia.

## Navegação e páginas

`src/app/config/navigation.ts` agrupa a navegação em quatro áreas com estados ativos e ícones:

| Área | Entradas |
| --- | --- |
| Explorar | Home, Funcionalidades, Catálogo |
| Aprender | Guias, Perguntas frequentes |
| Institucional | Missão, visão e valores, Sobre, Contato |
| Evolução | Roadmap, Projetos locais |

Rotas novas integradas em `src/app/routes/AppRoutes.tsx`, preservando o **HashRouter** do GitHub Pages:

- `#/features`: seis cards com imagem local, síntese, saída esperada, status verídico e acesso somente quando operacional.
- `#/institutional`: missão, visão e valores e cláusulas de independência institucional.
- `#/faq`: dúvidas objetivas de operação, privacidade, responsabilidade e maturidade, com `details/summary` acessíveis.
- `#/roadmap`: fases estratégicas sem falsas promessas de datas; distinção disponível/planejado.
- `#/contact`: link de GitHub Issues e advertência contra envio de evidências confidenciais.

A barra lateral mantém rolagem própria, fecha com Escape e backdrop no mobile, usa indicadores de seção e CTA de acesso ao catálogo. O cabeçalho possui atalhos visíveis em telas amplas e o rodapé oferece links institucionais. Estilos centralizados em `src/styles/portal-navigation.css` e `src/styles/portal-sections.css`.

## Home e imagens

- Hero existente mantido: lupa, impressão digital, linhas Matrix e buraco negro, com **VETOR FORENSE** em destaque.
- CTAs diretos para funcionalidades, catálogo e institucional.
- Vitrine com quatro cards iniciais; a página completa apresenta seis.
- Prévia de missão, visão, valores, recursos de suporte e sequência conceitual de análise.
- Ilustrações **locais** de `public/guides/` e `public/hero/`. Arte conceitual não equivale a captura da interface ou exame real.

## Abertura cinematográfica

`src/components/ui/IntroSplash.tsx` + `intro-splash.css`:

- Tela preta, emblema VT dourado, nome prateado e radiação tênue, em cerca de **1,85 s**.
- Execução uma vez por **sessão de aba** via `sessionStorage`, com botão **Pular apresentação**.
- Preferência `prefers-reduced-motion` desliga a vinheta; também há Escape e foco em botão de saída.
- Ausência de armazenamento não impede acesso ao produto; a animação não é necessária para navegar.

## Anel luminoso em movimento

`src/components/ui/BlackHoleField.tsx` + `black-hole-field.css`:

- O buraco negro mantém a imagem original e o **núcleo escuro**.
- Duas camadas de luz com gradientes cônicos simulam giro aparente e variação de brilho no **anel luminoso**, não movimento físico do horizonte de eventos.
- O efeito visual funciona independentemente do parallax de três profundidades.
- Preservados: **96 linhas** de fluxo, **48 partículas** aceleradas ao longo dos caminhos e **20 sequências de dígitos Matrix**.
- `prefers-reduced-motion` impede orbitais, partículas e binários móveis, mantendo arte estática.

**Limite de validação:** o código e os testes verificam estrutura, renderização e regras de estilo. A coincidência perfeita do brilho com a fotografia e a experiência em dispositivos reais dependem de inspeção visual no navegador; não presumir que testes automatizados substituem inspeção.

## Integridade

- Nenhum algoritmo, estimador ou fórmula do módulo veicular foi modificado.
- Serialização e processamento do conversor `.croqui` permanecem iguais.
- Modelos, rotas e armazenamento local dos dois módulos operacionais continuam intactos.
- Nenhuma API, backend, rastreamento ou credencial foi acrescentada.
- As pesquisas do mestrado MPC/RL e do doutorado não foram alteradas.

## Qualidade

- Workflow GitHub Actions `Validate dashboard and modules`: `npm ci`, `npm run typecheck`, `npm test`, `npm run build`.
- Após integração das novas páginas: **12 arquivos de teste e 99 testes aprovados** (execução `41428550253`, em 02/11/2026).
- O pipeline usa build estático no GitHub Pages; executar novo deploy após merge.
- Revisão visual desktop/mobile permanece uma verificação separada de responsividade e estética final.
- Dependências npm existentes relatam **26 avisos de vulnerabilidade (20 moderados, 4 altos e 2 críticos)** na instalação CI. São avisos preexistentes, não sanados nesta entrega, e exigem auditoria específica antes de ampliar o processamento de dados sensíveis.

## Fontes de verdade e continuidade

- `README.md` — instalação, links e visão do produto.
- `docs/PROJECT_MASTER.md` — estado canônico, decisões e pendências.
- `docs/ARCHITECTURE.md` — roteamento, componentes e limites das animações.
- `docs/ROADMAP.md` — ordem de desenvolvimento e marcos históricos.
- Código e testes na branch `feat/portal-institucional-splash-20261102`; PR #11.
