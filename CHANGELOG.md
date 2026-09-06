# Changelog — Atratora Forge

Todas as alterações notáveis deste projeto serão documentadas neste arquivo, seguindo o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e versionamento semântico [SemVer](https://semver.org/lang/pt-BR/).

---

## [0.1.0] — 2026-09-05

### Adicionado
- **Fundação da Plataforma Atratora Forge**:
  - Identidade visual proprietária da **Atratora Labs** (desenvolvida por **José Antônio Coutinho de Moraes Filho**), com paleta moderna dark graphite, deep indigo e electric cyan.
  - Dashboard SaaS completa e responsiva (resoluções 1920×1080 até mobile 390px).
  - Navegação unificada com Sidebar expansível, Drawer mobile e Header contextual.
  - Rodapé obrigatório em todas as páginas com autoria e declaração expressa de independência institucional.
- **Primeira Ferramenta Funcional — Conversor .CROQUI**:
  - Conversão local de imagens rasterizadas (JPG, JPEG, PNG, WEBP, BMP) em arquivos `.croqui` compatíveis com editores baseados em Fabric.js / LPST.
  - Processamento 100% local no navegador via Canvas e Blobs (zero envio a servidores externos, zero telemetria).
  - Interface com área de drag & drop, pré-visualização proporcional e metadados detalhados da imagem de origem.
  - Painel de configurações avançadas (largura alvo ajustável com padrão 1300 px; compressão JPEG selecionável entre 80%, 90%, 95% e 100% com padrão 90%).
  - Sanitização de nome de arquivo e download imediato com feedback visual.
- **Arquitetura Modular**:
  - Padrão Domain / Adapter / Exporter isolando a geração de `.croqui` do modelo interno da plataforma.
  - Estrutura preparada para expansão futura para módulos de mapas, vetores, dinâmica e perícia.
- **Documentação Técnica e de Governança**:
  - `docs/PROJECT_MASTER.md`: Documento canônico com contexto abrangente para continuidade técnica.
  - `docs/ARCHITECTURE.md`: Diretrizes arquiteturais e pipeline de processamento.
  - `docs/ROADMAP.md`: Planejamento detalhado das versões v0.1 até v1.0.
  - `docs/DECISIONS.md`: Registro formal de decisões arquiteturais (D-001 até D-013).
  - `docs/KNOWLEDGE_INDEX.md`: Inventário e categorização técnica dos 19 manuais de referência locais.
  - `docs/CROQUI_FORMAT.md`: Especificação técnica detalhada do formato `.croqui` e do objeto `image`.
- **Preservação e Testes**:
  - Preservação da versão validada original em `legacy/converter-v0.1.html`.
  - Fixtures de teste autênticas em `tests/fixtures/` (`4_LPST.croqui` e `26035629B01.croqui`).
  - Suite de testes automatizados com Vitest cobrindo propriedades estruturais do serializador.
- **Infraestrutura e GitHub Pages**:
  - `.gitignore` protegendo rigorosamente as pastas de documentos locais.
  - Workflow automatizado de CI/CD para deploy no GitHub Pages em `.github/workflows/deploy.yml`.
