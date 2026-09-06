# Roadmap Evolutivo — Atratora Forge

Plano de lançamento e evolução contínua da plataforma **Atratora Forge**, desenvolvida pela **Atratora Labs**.

---

## V0.1 — Fundação Premium + Conversor `.croqui` (Versão Atual)
- [x] Fundação profissional da plataforma web (React 18, TypeScript, Vite).
- [x] Dashboard premium e responsiva (Dark Graphite, Indigo/Cyan, Microinterações).
- [x] Arquitetura modular extensível.
- [x] Primeira ferramenta funcional: **Conversor de Imagem para `.CROQUI`** (local-first).
- [x] Preservação do baseline legacy validado em `legacy/converter-v0.1.html`.
- [x] Isolamento de dados e proteção de documentos institucionais no `.gitignore`.
- [x] Testes unitários e de regressão do serializador Fabric.js / `.croqui`.
- [x] Preparação para publicação no GitHub Pages via GitHub Actions.

---

## V0.2 — Sistema de Projetos Locais e Armazenamento
- [ ] Gerenciador de projetos no navegador utilizando IndexedDB / LocalStorage.
- [ ] Exportação e importação de pacotes de projeto `.atratora`.
- [ ] Histórico de conversões e reutilização de ativos sem envio ao servidor.
- [ ] Metadados de caso: número de registro, data/hora, operador e anotações.

---

## V0.3 — Map Studio (Módulo Geográfico)
- [ ] Busca e inserção de coordenadas geográficas (Lat/Long, UTM, marcos quilométricos).
- [ ] Integração com camadas de mapas livres (OpenStreetMap, ortofotos de satélite públicas).
- [ ] Ferramenta de enquadramento, escala métrica e rotação orientada ao norte.
- [ ] Captura de mapa base em alta resolução e envio direto para conversão `.croqui`.

---

## V0.4 — Croqui Studio (Editor Vetorial Independente)
- [ ] Canvas interativo vetorial completo (Fabric.js / Konva / SVG nativo).
- [ ] Biblioteca de elementos paramétricos:
  - Vias, pistas duplas, acostamentos, canteiros centrais e rotatórias.
  - Faixas de pedestres, marcas de canalização e sinalização viária.
  - Biblioteca de veículos dimensionados (automóveis, caminhões, motocicletas, ônibus).
  - Trajetórias, pontos de impacto e vestígios periciais (frenagens, derrapagens).
  - Legendas automáticas e cotas métricas de amarração.

---

## V0.5 — Exportação Multiobjeto e Adaptadores Neutros
- [ ] Modelo canônico de objetos internos da Atratora Forge.
- [ ] Adaptador multiobjeto para exportação `.croqui` (gerando grupos, caminhos e textos nativos do LPST).
- [ ] Exportadores alternativos: SVG vetorial, PDF pericial com alta resolução e imagem PNG.
- [ ] Importador reverso de arquivos `.croqui` para edição dentro do Croqui Studio.

---

## V0.6 — Domínio de Acidentes de Trânsito (`traffic-accidents`)
- [ ] Módulo com regras e boas práticas derivadas dos manuais periciais (ex.: M-015, M-041).
- [ ] Checklist pericial de campo e levantamento de dados no local.
- [ ] Cálculo de amarração pericial por triangulação e coordenadas polares.
- [ ] Estimativa preliminar de velocidades por marcas de derrapagem (fórmulas de física forense).

---

## V0.7 — Dynamics (Modelagem Cinemática e Temporal)
- [ ] Simulação temporal da cinemática pré e pós-impacto.
- [ ] Linha do tempo visual de eventos e trajetórias.
- [ ] Verificação de zonas de visibilidade e obstruções ópticas para condutores.

---

## V0.8 — Validation Engine (Motor de Validação Técnica)
- [ ] Validador automatizado de consistência de relatórios e croquis.
- [ ] Detecção de conflitos de geometria (veículos fora da pista sem justificativa, dimensões incompatíveis).
- [ ] Conformidade com normas técnicas de sinalização e engenharia de tráfego.

---

## V0.9 — Documents (Automação de Laudos e Documentos Estruturados)
- [ ] Geração dinâmica de laudos periciais e relatórios técnicos a partir dos dados do projeto.
- [ ] Templates customizáveis para engenharia civil, segurança viária e perícia privada.
- [ ] Inclusão automática de croquis, coordenadas, ortofotos e anexos fotográficos.

---

## V1.0 — Plataforma Estável e Extensível
- [ ] Arquitetura de plugins para terceiros e empresas parceiras.
- [ ] Sincronização opcional segura em nuvem privada (Self-Hosted / Cloud da Atratora Labs).
- [ ] Suporte multi-idioma (Português, Espanhol, Inglês).
- [ ] Suíte completa de auditoria, conformidade e certificação técnica.
