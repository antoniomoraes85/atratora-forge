# Registro de Decisões de Arquitetura (Architecture Decision Records - ADR)

Este documento registra as decisões fundamentais de concepção, governança, tecnologia e arquitetura da plataforma **Atratora Forge**.

---

### D-001: Atratora Forge é uma plataforma genérica e expansível
- **Data**: Setembro de 2026
- **Contexto**: A plataforma está nascendo a partir de ferramentas ligadas a croquis e manuais viários.
- **Decisão**: A Atratora Forge é concebida como uma suíte independente de automação de fluxos técnicos (geoprocessamento, diagramas, validações, perícia, educação, engenharia).
- **Consequência**: Nenhuma premissa institucional, governamental ou exclusiva de trânsito deve poluir o núcleo da plataforma.

---

### D-002: Atratora Labs é a proprietária da plataforma
- **Data**: Setembro de 2026
- **Decisão**: A propriedade intelectual e o desenvolvimento da plataforma pertencem à Atratora Labs, sob autoria de José Antônio Coutinho de Moraes Filho.
- **Consequência**: A marca, tipografia e identidade visual são próprias da Atratora Labs.

---

### D-003: Conversor `.croqui` é a primeira ferramenta, não o produto inteiro
- **Data**: Setembro de 2026
- **Decisão**: O conversor de imagem para `.croqui` é a primeira utilidade prática da v0.1 para entrega de valor imediato, sem que a plataforma se resuma a ele.
- **Consequência**: A navegação e o dashboard são desenhados para múltiplos módulos e ferramentas integradas.

---

### D-004: Documentos institucionais são apenas fontes locais de referência
- **Data**: Setembro de 2026
- **Decisão**: Manuais de trânsito, atendimento a acidentes e boletins são tratados exclusivamente como material de pesquisa conceitual para regras de negócio e terminologia.
- **Consequência**: Não definem a interface, não impõem limites à plataforma e não são embarcados no produto.

---

### D-005: Documentos de referência não entram no GitHub público
- **Data**: Setembro de 2026
- **Decisão**: Proteger os arquivos contidos em `Atendimento de Acidentes/`, `Educação para o Trânsito/` e `Sistemas PRF/` através do `.gitignore`.
- **Consequência**: O repositório público conterá estritamente código-fonte autoral, testes e documentação derivada livre de violações de sigilo ou direitos autorais de manuais.

---

### D-006: Arquitetura Local-First (Processamento no Navegador)
- **Data**: Setembro de 2026
- **Decisão**: Toda a manipulação de imagens, rasterização, cálculo geométrico e serialização de arquivos ocorre diretamente na máquina do usuário via Web APIs (Canvas, Blobs, Object URLs).
- **Consequência**: Máxima privacidade para os dados do usuário, custo de infraestrutura zero para a primeira versão e funcionamento offline completo.

---

### D-007: Sem Backend na V0.1
- **Data**: Setembro de 2026
- **Decisão**: Não criar microsserviços, banco de dados ou backend server-side nesta fase inicial.
- **Consequência**: Simplificação máxima de deploy, confiabilidade estática e publicação imediata via GitHub Pages.

---

### D-008: Sem Autenticação ou Gestão de Sessão Remota
- **Data**: Setembro de 2026
- **Decisão**: Não exigir login, senha, tokens ou chaves institucionais na v0.1.
- **Consequência**: Zero atrito de uso, sem armazenamento ou risco de vazamento de credenciais.

---

### D-009: Formato `.croqui` isolado em Adaptador/Serializador
- **Data**: Setembro de 2026
- **Decisão**: Encapsular a lógica de geração do formato `.croqui` em `src/modules/croqui-converter/serializer/`.
- **Consequência**: Se as especificações do Fabric.js ou do LPST mudarem, apenas o adaptador é modificado sem quebrar a plataforma.

---

### D-010: Modelo Interno Futuro Independente de Formatos Exportados
- **Data**: Setembro de 2026
- **Decisão**: No roadmap v0.4+, o modelo canônico de croquis e mapas usará uma representação interna neutra (geometria vetorial com atributos técnicos), convertida por exporters específicos (`.croqui`, `.svg`, `.pdf`, `.geojson`).
- **Consequência**: A plataforma suportará qualquer ferramenta de terceiros ou formato aberto sem reescrita estrutural.

---

### D-011: Identidade Visual Independente de Órgãos Públicos
- **Data**: Setembro de 2026
- **Decisão**: Banir cores amarelas e azuis policiais, brasões oficiais, ícones de viaturas oficiais e qualquer elemento que crie falsa impressão de aplicação de governo.
- **Consequência**: Adotada paleta tecnológica e moderna da Atratora Labs (Dark Graphite, Deep Indigo, Eletric Cyan, Slate Gray).

---

### D-012: GitHub como Fonte Canônica do Código
- **Data**: Setembro de 2026
- **Decisão**: O repositório Git sob `atratora-forge` e a branch principal representam a verdade de código da plataforma.
- **Consequência**: Integração contínua e automação de publicação via GitHub Actions.

---

### D-013: `PROJECT_MASTER.md` como Fonte Canônica de Contexto Técnico
- **Data**: Setembro de 2026
- **Decisão**: Manter o documento canônico `docs/PROJECT_MASTER.md` sempre atualizado com o histórico, decisões, pendências e riscos.
- **Consequência**: Qualquer desenvolvedor ou agente autônomo de inteligência artificial poderá retomar o desenvolvimento da Atratora Forge sem perda de contexto ou desvios de escopo.
