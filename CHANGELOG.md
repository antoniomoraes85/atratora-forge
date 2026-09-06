# CHANGELOG

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.2.0] - Atratora Forge Premium Foundation
### Adicionado
- **Nova Identidade Visual Premium**: Adotado um novo design system técnico e sofisticado (dark theme, paleta com grafite profundo, azul petróleo, ciano elétrico e violeta).
- **Background Técnico Parallax**: Novo fundo da Home com circuitos, trilhas PCB e glow dinâmico sensível ao mouse (com respeito a `prefers-reduced-motion`).
- **Sistema de Guias Visuais**: Nova seção "Guias" no menu (`/guides`) com tutoriais visuais e interfaces conceituais dos módulos planejados.
- **Componentes de Guias**: `GuideCard`, `GuideViewer` (modal com zoom, download e navegação por teclado), e sistema de configuração central `guides.ts`.
- **Placeholder de Imagens**: Estrutura `public/guides/` configurada para receber os PNGs dos guias (atualmente com imagens vazias geradas localmente para permitir build/test limpo).
- **Novas Ferramentas no Catálogo**: "Field Toolkit" e "Business Automation" adicionadas ao roadmap visível na plataforma (`tools.ts`).
- **Versão 0.2.0**: Atualização oficial da versão na plataforma (package.json, Header, textos).

### Alterado
- **Home**: Reescrita para comunicar um foco mais amplo (soluções técnicas, operacionais e analíticas), não limitando o escopo ao setor rodoviário.
- **Header e Footer**: Remoção de textos institucionais / engine version obsoletos. Adição de badges corporativos elegantes (Processamento Local, Privacidade).
- **Sidebar**: Texto "Ambiente Offline" substituído por "Processamento local", mantendo o conceito corporativo.
- **Tools.tsx**: Refatoração completa da página de ferramentas para suportar a nova paleta de cores (accent colors por categoria), novo visual de cards e suporte à busca robusta pelas novas categorias.
- **Tipografia e Cores Globais**: `variables.css` e `global.css` expandidos para suportar `btn-ghost`, `btn-outline`, utilitários responsivos avançados e animações CSS.
- **Dynamics Description**: Removido o termo "relações de causalidade", alterado para "relações espaciais ou temporais" para evitar falsas inferências causais.

## [0.1.1] - Correções de Infraestrutura
### Adicionado
- Script `lint` configurado no `package.json`.
- `.eslintrc.json` configurado (compatível com a versão 8.x).
### Alterado
- `tests/private-fixtures` adicionado ao `.gitignore` para dados confidenciais.

## [0.1.0] - Lançamento Inicial (Fundação)
### Adicionado
- Inicialização do projeto Vite/React/TypeScript.
- Configuração de roteamento (React Router Hash).
- Ferramenta *Conversor .CROQUI* com integração Fabric.js (adaptador de interface local).
- Sistema de testes unitários (Vitest) validando estrutura do serializador JSON.
- Documentação central da arquitetura.
