# Atratora Forge

**Versão:** 0.3.0  
**Empresa:** Atratora Labs  
**Desenvolvedor:** José Antônio Coutinho de Moraes Filho

> Plataforma modular e privada de ferramentas inteligentes para automação, conversão e análise de fluxos técnicos e operacionais.**  
> Desenvolvida pela **Atratora Labs** sob autoria de **José Antônio Coutinho de Moraes Filho**.

[![Status](https://img.shields.io/badge/Versão-0.3.0-6366f1.svg)](CHANGELOG.md)
[![Licença](https://img.shields.io/badge/Licença-Proprietária%20Atratora%20Labs-10b981.svg)](#)
[![Privacidade](https://img.shields.io/badge/Processamento-100%25%20Local-38bdf8.svg)](#privacidade-e-segurança)
[![Build](https://img.shields.io/badge/Deploy-GitHub%20Pages-blueviolet.svg)](#publicação-no-github-pages)

---

## 1. Visão Geral

O **Atratora Forge** é uma plataforma independente criada para centralizar, acelerar e modernizar fluxos operacionais técnicos, incluindo geoprocessamento, croquis, mapas, diagramas, análises periciais e validações documentais.

Projetada com arquitetura modular e estética profissional de alto padrão (SaaS), a plataforma opera sob o paradigma **Local-First**: todo o processamento de imagens, cálculos e arquivos é executado diretamente na sandbox do navegador, sem envio de dados a servidores remotos, sem banco de dados intermediário e com zero telemetria.

---

## 2. Ferramentas Funcionais

### 2.1 Vetor Forense (NOVO)

Na versão **v0.3.0**, a plataforma introduz o **Vetor Forense**:
- **Objetivo**: Análise técnica de velocidade e dinâmica em sinistros de trânsito baseada em vestígios de dissipação de energia, cinematica e dinâmica.
- **Recursos**:
  - Wizard estruturado para criação e registro de análises (caso, elementos, veículos, via, vestígios).
  - Motor determinístico de cálculos físicos.
  - Seleção automática de métodos analíticos aplicáveis a partir da combinação de vestígios e topologia.
  - Base técnica de atrito e referências (parametrizada e rastreável).
  - Índices avançados de qualidade: IFT (Índice de Fidelidade de Traços), ICA, IAE.
  - Persistência local (armazenamento de sessões no browser) e exportação estruturada.

### 2.2 Conversor .CROQUI

Desde a versão **v0.1**, o **Conversor de Imagem para `.CROQUI`** facilita fluxos de geoprocessamento:
- **Objetivo**: Permitir que imagens comuns sejam encapsuladas no formato `.croqui` para importação em editores LPST e Fabric.js.
- **Recursos**: Drag & Drop inteligente, redimensionamento proporcional otimizado (1300 px) e sanitização de metadados.

---

## 3. Tecnologias Utilizadas

- **Interface & Componentização**: React 18 + TypeScript.
- **Ferramenta de Build & Bundler**: Vite 5.
- **Roteamento Estático**: React Router DOM (HashRouter, compatível com GitHub Pages sem erros 404).
- **Iconografia**: Lucide React.
- **Estilização**: CSS moderno estruturado com Design Tokens (Dark Graphite, Deep Indigo, Electric Cyan, Emerald).
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
│   │   ├── croqui-converter/  # Conversor de imagem para .croqui
│   │   └── vetor-forense/     # Motor técnico e wizard do Vetor Forense
│   ├── pages/              # Telas: Home, Ferramentas, Projetos, Sobre
│   ├── styles/             # Design tokens e folhas de estilo globais
│   └── main.tsx            # Ponto de entrada da aplicação
├── docs/                   # Documentação canônica técnica
│   ├── PROJECT_MASTER.md   # Registro mestre de continuidade
│   ├── ARCHITECTURE.md     # Padrões arquiteturais e decisões técnicas
│   ├── ROADMAP.md          # Planejamento evolutivo
│   ├── DECISIONS.md        # Registro formal de decisões arquiteturais (ADR)
│   ├── KNOWLEDGE_INDEX.md  # Inventário dos manuais de referência locais
│   └── CROQUI_FORMAT.md    # Especificação do formato .croqui
├── legacy/                 # Versões funcionais preservadas para integridade
├── tests/                  # Testes automatizados e fixtures reais (.croqui)
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
git clone https://github.com/atratora-labs/atratora-forge.git
cd atratora-forge
npm install
npm run dev
# http://localhost:5173
```

### Testes e Compilação
```bash
npm test
npm run typecheck
npm run build
```

---

## 6. Publicação no GitHub Pages

O projeto utiliza **GitHub Actions** (`.github/workflows/deploy.yml`) para implantação automática no GitHub Pages a cada push para a branch `main`.

---

## 7. Privacidade e Segurança

- **Processamento 100% no Cliente**: Imagens e dados processados diretamente na memória do navegador.
- **Zero Rastreamento**: Sem Google Analytics, telemetria ou cookies de terceiros.
- **Zero Armazenamento Externo**: Nenhuma análise, imagem ou dado é transmitido para servidores remotos.

---

## 8. Declaração de Independência e Disclaimer Institucional

A compatibilidade de determinados módulos do **Atratora Forge** com formatos de arquivo (como `.croqui`) ou fluxos técnicos utilizados por órgãos públicos tem finalidade estritamente técnica de interoperabilidade.

**O Atratora Forge é uma plataforma independente da iniciativa privada, sem qualquer vínculo, convênio, homologação, parceria ou chancela oficial por parte da Polícia Rodoviária Federal (PRF), do Ministério da Justiça e Segurança Pública ou de qualquer outro órgão governamental.**

---

## 9. Créditos e Autoria

**Desenvolvido por:**  
**José Antônio Coutinho de Moraes Filho**  
*Atratora Labs*
