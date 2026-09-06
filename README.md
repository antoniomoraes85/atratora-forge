# Atratora Forge

**Versão:** 0.2.0  
**Empresa:** Atratora Labs  
**Desenvolvedor:** José Antônio Coutinho de Moraes Filho

> Plataforma modular e privada de ferramentas inteligentes para automação, conversão e análise de fluxos técnicos e operacionais.**  
> Desenvolvida pela **Atratora Labs** sob autoria de **José Antônio Coutinho de Moraes Filho**.

[![Status](https://img.shields.io/badge/Versão-0.1.0-6366f1.svg)](CHANGELOG.md)
[![Licença](https://img.shields.io/badge/Licença-Proprietária%20Atratora%20Labs-10b981.svg)](#)
[![Privacidade](https://img.shields.io/badge/Processamento-100%25%20Local-38bdf8.svg)](#privacidade-e-segurança)
[![Build](https://img.shields.io/badge/Deploy-GitHub%20Pages-blueviolet.svg)](#publicação-no-github-pages)

---

## 1. Visão Geral

O **Atratora Forge** é uma plataforma independente criada para centralizar, acelerar e modernizar fluxos operacionais técnicos, incluindo geoprocessamento, croquis, mapas, diagramas, análises periciais e validações documentais.

Projetada com arquitetura modular e estética profissional de alto padrão (SaaS), a plataforma opera sob o paradigma **Local-First**: todo o processamento de imagens e arquivos é executado diretamente na sandbox do navegador, sem envio de dados a servidores remotos, sem banco de dados intermediário e com zero telemetria.

---

## 2. Primeira Ferramenta Funcional: Conversor .CROQUI

Na versão **v0.1**, a plataforma disponibiliza sua primeira ferramenta prática: o **Conversor de Imagem para `.CROQUI`**.

- **Objetivo**: Permitir que imagens comuns (fotos aéreas, ortofotos de satélite, mapas do Google Maps ou OpenStreetMap, diagramas de vias) sejam encapsuladas no formato `.croqui` para importação direta no editor de croquis do LPST e ferramentas compatíveis com Fabric.js.
- **Formatos de Entrada**: `JPG`, `JPEG`, `PNG`, `WEBP`, `BMP`.
- **Formato de Saída**: `.croqui` (JSON compatível com o método `canvas.loadFromJSON()` do Fabric.js).
- **Recursos**:
  - Drag & Drop com upload instantâneo e pré-visualização proporcional.
  - Exibição de metadados: dimensões originais, formato detectado e tamanho em bytes.
  - Ajuste inteligente de resolução (padrão de **1300 px**, otimizado para o LPST).
  - Controle de qualidade JPEG (**80%**, **90% - recomendado**, **95%**, **100%**).
  - Sanitização de nome de arquivo para evitar caracteres especiais no sistema operacional.
  - Download imediato com feedback visual.

---

## 3. Tecnologias Utilizadas

- **Interface & Componentização**: React 18 + TypeScript.
- **Ferramenta de Build & Bundler**: Vite 5.
- **Roteamento Estático**: React Router DOM (HashRouter, compatível com GitHub Pages sem erros 404).
- **Iconografia**: Lucide React.
- **Estilização**: CSS moderno estruturado com Design Tokens (Dark Graphite `#0a0c10`, Deep Indigo `#6366f1`, Electric Cyan `#38bdf8`, Emerald `#10b981`).
- **Testes Automatizados**: Vitest.
- **CI / CD**: GitHub Actions para deploy estático automatizado.

---

## 4. Estrutura do Projeto

```
Atratora Forge/
├── public/                 # Favicon vetorial e manifesto
├── src/
│   ├── app/                # Rotas e configurações de navegação
│   ├── components/         # Componentes compartilhados de layout, header, footer e UI
│   ├── modules/
│   │   └── croqui-converter/  # Módulo do conversor de imagem para .croqui
│   │       ├── components/    # Uploader, preview, configurações
│   │       ├── serializer/    # Serializador e validador do formato .croqui
│   │       ├── services/      # Processamento de imagem em canvas offscreen
│   │       └── types/         # Tipos e interfaces TypeScript
│   ├── pages/              # Telas: Home, Ferramentas, Conversor, Projetos, Sobre
│   ├── styles/             # Design tokens e folhas de estilo globais
│   └── main.tsx            # Ponto de entrada da aplicação
├── docs/                   # Documentação canônica técnica
│   ├── PROJECT_MASTER.md   # Registro mestre de continuidade
│   ├── ARCHITECTURE.md     # Padrões arquiteturais e decisões técnicas
│   ├── ROADMAP.md          # Planejamento das versões v0.1 até v1.0
│   ├── DECISIONS.md        # Registro formal de decisões arquiteturais (ADR)
│   ├── KNOWLEDGE_INDEX.md  # Inventário dos manuais de referência locais
│   └── CROQUI_FORMAT.md    # Especificação do formato .croqui
├── legacy/                 # Versões funcionais preservadas para integridade
│   └── converter-v0.1.html # Conversor original preservado
├── tests/                  # Testes automatizados e fixtures reais (.croqui)
│   └── fixtures/           # Fixtures de validação estrutural
├── .github/workflows/      # Deploy automático no GitHub Pages
├── CHANGELOG.md            # Histórico de alterações
└── README.md
```

---

## 5. Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior, recomendado v22.x).
- npm (versão 9 ou superior).

### Instalação e Execução
```bash
# 1. Clonar o repositório
git clone https://github.com/atratora-labs/atratora-forge.git
cd atratora-forge

# 2. Instalar as dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev

# 4. Acessar a aplicação no navegador
# Normalmente em: http://localhost:5173
```

### Execução de Testes
```bash
# Rodar todos os testes unitários e de regressão
npm test
```

### Compilação de Produção
```bash
# Gerar o bundle de produção otimizado na pasta dist/
npm run build
```

---

## 6. Publicação no GitHub Pages

O projeto está configurado para deploy automático no **GitHub Pages** através do fluxo em `.github/workflows/deploy.yml`.

1. No repositório no GitHub, acesse **Settings > Pages**.
2. Na seção **Build and deployment > Source**, selecione **GitHub Actions**.
3. A cada push na branch `main`, a suite de testes será executada e a versão de produção será publicada no endereço:
   `https://<usuario-ou-org>.github.io/atratora-forge/`

---

## 7. Privacidade e Segurança

- **Processamento 100% no Cliente**: As imagens selecionadas pelo usuário são carregadas diretamente na memória do navegador.
- **Zero Rastreamento**: Não há Google Analytics, telemetria, cookies de rastreamento ou chamadas de telemetria de terceiros.
- **Zero Armazenamento Externo**: Nenhuma imagem é gravada ou transmitida para qualquer servidor em nuvem.

---

## 8. Roadmap Resumido

- **V0.1** (Atual): Fundação Premium + Conversor de Imagem para `.CROQUI`.
- **V0.2**: Armazenamento local de projetos com IndexedDB.
- **V0.3**: *Map Studio* — Coordenadas, satélite e mapas base.
- **V0.4**: *Croqui Studio* — Canvas vetorial interativo com vias, veículos e vestígios.
- **V0.5**: Exportador multiobjeto e conversão para SVG, PDF e GeoJSON.
- **V0.6**: Domínio pericial de acidentes de trânsito e cálculos de física forense.
- **V0.7 - V1.0**: Módulos *Dynamics*, *Validator*, *Documents* e plugins de extensibilidade.

Consulte o documento completo em [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## 9. Declaração de Independência e Disclaimer Institucional

A compatibilidade de determinados módulos do **Atratora Forge** com formatos de arquivo (como `.croqui`) ou fluxos técnicos utilizados por órgãos públicos ou sistemas de terceiros tem finalidade estritamente técnica de interoperabilidade.

**O Atratora Forge é uma plataforma independente da iniciativa privada, sem qualquer vínculo, convênio, homologação, parceria ou chancela oficial por parte da Polícia Rodoviária Federal (PRF), do Ministério da Justiça e Segurança Pública ou de qualquer outro órgão governamental.**

---

## 10. Créditos e Autoria

**Desenvolvido por:**  
**José Antônio Coutinho de Moraes Filho**  
*Atratora Labs*
