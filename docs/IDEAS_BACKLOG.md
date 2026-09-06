# IDEAS BACKLOG — Atratora Forge

> Repositório de ideias, sugestões e funcionalidades futuras.
> Este arquivo é versionado mas **não faz parte do Roadmap comprometido**.
> Itens aqui ficam em análise até serem promovidos ao `ROADMAP.md` ou descartados.

---

## 🧪 Ferramentas Futuras

- **OCR de Croquis**: Reconhecimento automático de texto manuscrito ou impresso em croquis digitalizados.
- **Medição Escalonada**: Ferramenta para calibrar e medir distâncias em imagens georreferenciadas.
- **Conversor de Shapefiles**: Importar arquivos `.shp` / `.geojson` como layers em projetos Atratora.
- **Timeline de Eventos**: Linha do tempo visual e interativa para sequências de eventos técnicos.
- **Comparador de Versões de Projeto**: Diff visual entre duas versões salvas de um mesmo projeto.
- **Integração com QGIS**: Export de projetos no formato aceito pelo QGIS.

---

## 🎨 UX / Interface

- **Dark/Light Toggle**: Suporte a tema claro como alternativa ao dark padrão.
- **Shortcuts de Teclado**: Mapeamento de atalhos globais para navegação e ações de ferramenta.
- **Command Palette (`Ctrl+K`)**: Acesso rápido a ferramentas, projetos e configurações por texto.
- **Toast Notifications**: Sistema unificado de notificações visuais (sucesso, erro, info).
- **Onboarding interativo**: Guia de primeiro acesso contextualizado por ferramenta.

---

## ⚙️ Infraestrutura / Dev

- **Plugin System**: API formal para adicionar ferramentas externas sem modificar o core.
- **Storybook**: Catálogo visual de componentes UI para desenvolvimento isolado.
- **E2E com Playwright**: Suite de testes end-to-end para fluxos críticos (upload → download).
- **Service Worker / Offline Mode**: Suporte pleno a PWA com cache de assets para uso offline.
- **i18n (pt-BR / en)**: Internacionalização para expansão do produto além do mercado BR.
- **CI: Lighthouse Score Gate**: Bloquear PR se Lighthouse descer abaixo de 90 em Performance/A11y.

---

## 📦 Formatos e Compatibilidade

- **Suporte a `.croqui` v2**: Quando houver mudança de spec, garantir import backward-compatible.
- **Export para PDF**: Renderização de projetos diretamente para PDF com metadados.
- **Export para SVG**: Exportação vetorial de croquis para edição em Inkscape / Illustrator.
- **Import de DXF**: Suporte a importação de arquivos CAD para conversão.

---

## 🔒 Privacidade & Segurança

- **Audit Log Local**: Registro client-side de operações realizadas (sem telemetria remota).
- **Sanitização de Metadados EXIF**: Limpeza automática de metadados sensíveis em imagens importadas.

---

*Última atualização: 2026-09-05 | Mantenedor: José Antônio Coutinho de Moraes Filho*
