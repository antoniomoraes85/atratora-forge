# Vetor Forense — Identidade e integração ATRATOR

**Decisão de marca — 22/10/2026.** A antiga marca de produto **Atratora Forge** passa a chamar-se **Vetor Forense**. **ATRATOR** é a identidade-guarda-chuva do ecossistema de produtos (Redáxis, ControlScope AI e outras plataformas). Esta alteração é de apresentação e nomenclatura; não transfere titularidade nem altera o status jurídico do software.

## Arquitetura

- Marca-mãe: **ATRATOR** — tecnologia, conhecimento, inovação e impacto.
- Plataforma: **VETOR FORENSE** — análise científica, reconstrução, evidência e tecnologia.
- Módulo funcional de domínio, anteriormente também chamado Vetor Forense: **Análise de Dinâmica Veicular**. O nome público foi atualizado no catálogo, nos títulos internos, nas mensagens de primeira utilização, no tutorial e na documentação de métodos. O caminho técnico `/tools/vetor-forense` e os identificadores internos permanecem estáveis, para evitar quebra de links, persistência local e integrações.
- Ferramenta funcional preservada: **Conversor .CROQUI**.
- Catálogo e módulos futuros preservados: Map Studio, Croqui Studio, Dynamics, Validator, Documents, Field Toolkit e demais itens explicitamente rotulados como planejados.

## Sistema visual

| Token | Cor |
| --- | --- |
| Obsidiana | `#050506` |
| Grafite | `#16181B` |
| Prata / aço | `#B9BDC2` |
| Prata clara | `#E7E7E7` |
| Ouro ATRATOR | `#D8A23A` |
| Brilho quente | `#F1B75C` |

O ícone de Vetor Forense é um **V vetorial de aço** atravessado por uma **trajetória de ouro**, sobre uma **mira de medição**. A assinatura *uma tecnologia ATRATOR* estabelece pertencimento ao ecossistema sem copiar ou confundir a marca-mãe.

## Animação e parallax

A home emprega gradientes e camadas SVG/CSS com órbita suave e transformação proporcional ao scroll e ponteiro, com limites de deslocamento. Nenhum dado ou mídia é transmitido por essa animação. `prefers-reduced-motion` desativa a rotação e o deslocamento dinâmico.

Aplicações:
- **Completa:** hero da home.
- **Compacta:** logotipo + assinatura ATRATOR na navegação.
- **Mínima:** favicon vetorial.
- **Sem animação:** exportações, relatórios e versões acessíveis.

## Segurança técnica e posicionamento

Vetor Forense oferece ferramentas de apoio à análise. Não declara certificação, vínculo ou homologação por órgãos públicos. Evidências, fórmulas, condições de aplicação, unidades, incertezas, fontes e limitações devem ser exibidas de forma rastreável antes de qualquer uso pericial real.

Permanecem inalterados nesta migração: rotas `/#/tools`, `/#/tools/vetor-forense` e `/#/tools/croqui-converter`, IDs internos, contratos de exportação e persistência local.

## Próximas funcionalidades — propostas, não implementadas

1. **Evidence Studio:** organização de fotografias, metadados, anotações e proveniência.
2. **Trajectory Lab:** estimativas cinemáticas com visualização das hipóteses e intervalos.
3. **Map & Croqui Studio:** croquis georreferenciados e medidas reproduzíveis.
4. **Validation Engine:** verificação de unidades, coerência e completude documental.
5. **Report Studio:** modelos de relatórios auditáveis e exportações.
6. **Case Vault:** projetos locais, versionamento e histórico sem upload implícito.
7. **Forensic Learning:** biblioteca de métodos, demonstrações e treinamentos.
8. **Interoperability:** formatos abertos e adaptadores opcionais para terceiros.

## Migração

O nome público muda agora; o slug do repositório `atratora-forge` e a URL do GitHub Pages permanecem por compatibilidade, até migração posterior com revisão de redirecionamentos e links. Em nenhuma hipótese apagar `legacy/`, fixtures ou dados locais para renomear a marca.

## Checklist de revisão antes de mesclar a branch

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Navegação desktop/mobile, incluindo hash links e scroll
- [ ] `prefers-reduced-motion`, contraste e foco
- [ ] Conversor `.CROQUI` e Análise de Dinâmica Veicular com fixtures e resultados anteriores
- [ ] Metadados, manifest e favicon em GitHub Pages
- [ ] Revisão de outras referências antigas no código não incluídas neste pacote
