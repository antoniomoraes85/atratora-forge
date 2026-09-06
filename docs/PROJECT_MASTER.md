# Atratora Forge — Master Project Documentation (PROJECT_MASTER)

> **DOCUMENTO CANÔNICO DO PROJETO**  
> Este documento centraliza todo o contexto técnico, de negócios, arquitetura e governança da plataforma. Qualquer agente de inteligência artificial ou desenvolvedor humano pode utilizar este arquivo para retomar o projeto com total precisão de onde ele parou.

---

## 1. Identificação Geral

- **Nome do Produto**: Atratora Forge
- **Empresa Mantenedora**: Atratora Labs
- **Desenvolvedor Responsável**: José Antônio Coutinho de Moraes Filho
- **Posicionamento**: *“Plataforma de ferramentas inteligentes para automação de fluxos técnicos.”*
- **Versão Atual**: `0.1.0` (V0.1 — Fundação Premium + Conversor de Imagem para .CROQUI)
- **Status do Projeto**: Em desenvolvimento ativo / v0.1 funcional entregue

---

## 2. Objetivo

Desenvolver uma plataforma web modular, expansível, moderna e de alto desempenho que reúna ferramentas especializadas para profissionais técnicos, peritos, engenheiros e analistas. O foco é a automação de etapas mecânicas de trabalho (como conversão de formatos legados, geoprocessamento, diagramação, cálculo técnico e validações documentais), priorizando a privacidade total do usuário por meio de uma arquitetura local-first.

---

## 3. Escopo da Versão Atual (V0.1)

### Entregue na V0.1:
1. **Fundação e UI Shell Premium**: Interface SaaS moderna com tema escuro (Dark Graphite, Deep Indigo, Electric Cyan), sem qualquer alusão visual a órgãos governamentais ou policiais.
2. **Dashboard Funcional e Responsiva**:
   - Sidebar com navegação completa e drawer mobile.
   - Header com status de operação local.
   - Hero com apresentação de proposta de valor.
   - Card em destaque para a ferramenta disponível (*Conversor .CROQUI*).
   - Catálogo de próximos módulos em desenvolvimento (*Croqui Studio*, *Map Studio*, *Dynamics*, *Validator*, *Documents*).
   - Rodapé canônico em todas as páginas identificando autoria de José Antônio Coutinho de Moraes Filho e aviso de independência institucional.
3. **Primeira Ferramenta Funcional — Conversor de Imagem para `.CROQUI`**:
   - Upload de imagens via Drag & Drop ou seletor de arquivos.
   - Suporte aos formatos JPG, JPEG, PNG, WEBP e BMP.
   - Pré-visualização gráfica de alta fidelidade e inspeção de metadados (nome, resolução nativa, tamanho em KB/MB, formato).
   - Configurações avançadas (largura alvo com padrão de 1300 px; qualidade de compressão JPEG em 80%, 90%, 95%, 100% com padrão de 90%).
   - Sanitização automática do nome do arquivo de saída (`[nome-original]_croqui.croqui`).
   - Geração local instantânea com feedback de dimensões e peso gerado.
   - Download imediato do arquivo gerado e opção de converter nova imagem.
4. **Isolamento de Dados e Conformidade**:
   - Preservação da versão validada anterior em `legacy/converter-v0.1.html`.
   - Adição ao `.gitignore` das 3 pastas de referência institucionais locais (`Atendimento de Acidentes/`, `Educação para o Trânsito/`, `Sistemas PRF/`).
   - Indexação estruturada em `docs/KNOWLEDGE_INDEX.md`.
5. **Automação e Publicação**:
   - Roteamento com `HashRouter` para suporte nativo ao GitHub Pages sem falha em refresh.
   - Workflow do GitHub Actions em `.github/workflows/deploy.yml`.

### Fora de Escopo na V0.1 (Previsto no Roadmap):
- Canvas vetorial editável interativo.
- Georreferenciamento e busca de coordenadas por satélite.
- Mecanismo de física e cinemática de acidentes.
- Backend, banco de dados ou autenticação.

---

## 4. Arquitetura do Sistema

A Atratora Forge opera sob o modelo **Domain / Adapter / Exporter**:
- **Interface e Módulos**: Cada ferramenta reside isolada sob `src/modules/<nome-modulo>/`.
- **Adaptador `.croqui`**: O formato de saída `.croqui` reside exclusivamente em `src/modules/croqui-converter/serializer/`, gerando a estrutura estrita de `Fabric.js 2.x/3.x` sem vincular a base de dados interna da plataforma a esse formato externo.
- **Local-First**: Zero chamadas para APIs externas. Zero rastreamento ou telemetria. Todo o processamento de imagens ocorre via HTML5 Canvas em memória no navegador.

---

## 5. Stack Tecnológica

| Camada | Tecnologia Adotada | Justificativa |
| :--- | :--- | :--- |
| **Core / Runtime** | Node.js v22.x / React 18 / TypeScript | Tipagem estrita, alta manutenibilidade e ecossistema robusto |
| **Build & Bundler** | Vite 5 | Inicialização instantânea, build ultra-otimizado e leve |
| **Roteamento** | React Router DOM (HashRouter) | Compatibilidade total com GitHub Pages e ambientes estáticos |
| **Ícones** | Lucide React | Conjunto moderno, coeso e leve de ícones vetoriais |
| **Estilização** | CSS com Design Tokens Globais | Flexibilidade, zero overhead de frameworks pesados, controle total |
| **Testes** | Vitest | Rápido, compatível nativamente com TypeScript e ESM |
| **CI / CD** | GitHub Actions | Deploy automatizado no GitHub Pages |

---

## 6. Documentos de Referência Locais

Três pastas locais com 19 arquivos técnicos servem de insumo terminológico e de regras conceituais, sem serem empacotados no software:
- `Atendimento de Acidentes/` (Manuais M-015, M-040, M-074)
- `Educação para o Trânsito/` (Manual M-054)
- `Sistemas PRF/` (Manuais de sistemas BOP, PDI, Novo BAT / LPST, SICOP, Silver, Alerta Brasil)

O detalhamento completo de cada arquivo está registrado em `docs/KNOWLEDGE_INDEX.md`.

---

## 7. Decisões Arquiteturais Registradas

Todas as decisões fundamentais encontram-se detalhadas em `docs/DECISIONS.md`:
- **D-001**: Plataforma técnica genérica.
- **D-002**: Propriedade de Atratora Labs (José Antônio Coutinho de Moraes Filho).
- **D-003**: Conversor `.croqui` como primeira utilidade prática.
- **D-004 e D-005**: Manuais institucionais como referência local excluídos do repositório público.
- **D-006 a D-008**: Local-first, sem backend e sem credenciais na v0.1.
- **D-009 e D-010**: Formato `.croqui` isolado em adaptador; independência do modelo interno.
- **D-011**: Identidade visual própria moderna sem estética governamental.
- **D-012 e D-013**: GitHub e `PROJECT_MASTER.md` como fontes canônicas de código e contexto.

---

## 8. Testes Automatizados e Fixtures

- **Testes Unitários**: Localizados em `tests/` e executados via `npm test`.
- **Fixtures de Comparação**:
  - `tests/fixtures/4_LPST.croqui`: Arquivo de imagem convertido validado em ambiente real.
  - `tests/fixtures/26035629B01.croqui`: Arquivo vetorial complexo com múltiplos objetos do Fabric.js.
- **Cobertura Crítica**:
  - Geração de JSON estruturado com raiz `objects`.
  - Objeto único do tipo `image` com propriedades geométricas obrigatórias.
  - Data URL iniciando com `data:image/jpeg;base64,`.
  - Sanitização de caracteres inválidos no nome do arquivo.
  - Preservação de aspect ratio e limite de resolução.

---

## 9. Riscos e Mitigações

| Risco | Severidade | Mitigação Implementada |
| :--- | :--- | :--- |
| **Imagem excessivamente grande travando o navegador** | Média | O conversor limita a largura padrão em 1300 px e processa via canvas offscreen antes de converter para Base64. |
| **Quebra de compatibilidade em importadores legados** | Alta | O serializador reproduz exatamente a árvore de propriedades da fixture `4_LPST.croqui`, validada por teste de regressão automatizado. |
| **Vazamento acidental de manuais no GitHub** | Alta | O `.gitignore` na raiz bloqueia expressamente as três pastas de manuais locais. |
| **Falha 404 em navegação no GitHub Pages** | Média | Adoção do `HashRouter` que não depende de roteamento no servidor HTTP. |

---

## 10. Próxima Fase Recomendada (V0.2 / V0.3)

1. **V0.2 — Armazenamento Local e Projetos**: Introduzir salvamento de projetos no IndexedDB do navegador.
2. **V0.3 — Map Studio**: Adicionar busca por coordenadas e captura de imagens de satélite/mapa diretamente para a tela do conversor `.croqui`.

---

## 11. Histórico de Versões

- **v0.1.0** (05/09/2026):
  - Concepção e lançamento da plataforma Atratora Forge.
  - Implementação da identidade visual e dashboard premium da Atratora Labs.
  - Preservação do baseline legacy em `legacy/converter-v0.1.html`.
  - Módulo funcional do Conversor de Imagem para `.CROQUI`.
  - Suite completa de documentação (`PROJECT_MASTER`, `ARCHITECTURE`, `ROADMAP`, `DECISIONS`, `KNOWLEDGE_INDEX`, `CROQUI_FORMAT`).
  - Pipeline de CI/CD para GitHub Pages.
