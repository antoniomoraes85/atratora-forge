# Atratora Forge

**Versão:** 0.3.0  
**Empresa:** Atratora Labs  
**Desenvolvedor:** José Antônio Coutinho de Moraes Filho

> Plataforma modular e privada de ferramentas inteligentes para automação, conversão e análise de fluxos técnicos, operacionais e analíticos.  
> Desenvolvida pela **Atratora Labs** sob autoria de **José Antônio Coutinho de Moraes Filho**.

[![Versão](https://img.shields.io/badge/Versão-0.3.0-6366f1.svg)](CHANGELOG.md)
[![Licença](https://img.shields.io/badge/Licença-Proprietária%20Atratora%20Labs-10b981.svg)](#)
[![Privacidade](https://img.shields.io/badge/Processamento-100%25%20Local-38bdf8.svg)](#privacidade-e-segurança)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-blueviolet.svg)](#publicação-no-github-pages)

---

## 1. Visão Geral

O **Atratora Forge** é uma plataforma independente criada para centralizar, acelerar e modernizar fluxos técnicos, operacionais e analíticos.

Sua arquitetura modular permite a incorporação progressiva de ferramentas voltadas a conversão de arquivos, análises técnicas, geoprocessamento, croquis, dinâmica, validação documental, coleta de campo e automação.

A plataforma adota o paradigma **Local-First**: os dados são processados diretamente no navegador do usuário, sem necessidade de backend para as funcionalidades atualmente disponíveis, sem telemetria e sem armazenamento externo dos dados técnicos analisados.

### Acesso à aplicação

**Atratora Forge:**  
https://antoniomoraes85.github.io/atratora-forge/

### Ferramentas atualmente disponíveis

- **Vetor Forense** — análise técnica de velocidade e dinâmica em sinistros de trânsito.
- **Conversor .CROQUI** — conversão de imagens rasterizadas para arquivos `.croqui`.

---

# 2. Ferramentas Ativas

## 2.1 Vetor Forense

O **Vetor Forense** é um módulo de análise técnica destinado à estimativa de velocidade e avaliação de dinâmica a partir dos vestígios e informações disponíveis em um sinistro de trânsito.

O sistema foi projetado para trabalhar com múltiplas variáveis, veículos, trechos e métodos, preservando a rastreabilidade das informações utilizadas.

### Principais recursos

- Wizard estruturado em etapas para criação da análise.
- Cadastro de múltiplos veículos.
- Caracterização da via e das condições ambientais.
- Registro de diferentes tipos de vestígios.
- Cadastro de múltiplos trechos de dissipação.
- Seleção automática de parâmetros técnicos quando disponíveis.
- Possibilidade de informar parâmetros externos de forma identificada e justificada.
- Identificação automática dos métodos tecnicamente aplicáveis.
- Diferenciação entre métodos quantitativos e indicadores auxiliares.
- Cálculo por dissipação de energia em um ou múltiplos trechos.
- Consideração da inclinação longitudinal quando informada.
- Análise de motocicleta tombada.
- Análise de veículo deslizando sobre o teto.
- Suporte a registros eletrônicos de velocidade.
- Avaliação auxiliar de danos.
- Avaliação de distância de reação e parada.
- Cálculo de intervalos mínimo, central e máximo de velocidade.
- Geração automática de texto técnico descritivo.
- Persistência local das análises.
- Duplicação de análises.
- Exportação estruturada em JSON.
- Explicabilidade dos cálculos e parâmetros utilizados.

### Indicadores de qualidade

O Vetor Forense utiliza indicadores internos para auxiliar na interpretação da robustez da análise:

**IFT — Índice de Fidedignidade Técnica**

Avalia aspectos relacionados à:

- qualidade das medições;
- qualidade dos parâmetros;
- preservação do sítio;
- completude das informações;
- rastreabilidade dos dados.

**ICA — Índice de Convergência Analítica**

Avalia a convergência entre dois ou mais métodos quantitativos independentes.

Quando existe apenas um método independente disponível, o ICA não é apresentado como aferível.

**IAE — Índice de Assertividade da Estimativa**

Indicador interno derivado da qualidade dos dados e da convergência dos métodos disponíveis.

> **Importante:** IFT, ICA e IAE são indicadores internos de apoio à análise e não representam probabilidades estatísticas ou garantias científicas de acerto.

### Filosofia de análise

O Vetor Forense não procura gerar apenas um número isolado.

O fluxo adotado é:

**vestígios → variáveis → parâmetros → métodos → cálculos independentes → convergência → intervalo estimado → limitações**

Sempre que possível, o resultado é apresentado como um **intervalo de velocidade**, acompanhado das respectivas premissas e limitações.

### Acesso direto

https://antoniomoraes85.github.io/atratora-forge/#/tools/vetor-forense

---

## 2.2 Conversor de Imagem para `.CROQUI`

O **Conversor .CROQUI** transforma imagens rasterizadas em arquivos `.croqui` para utilização em editores e ferramentas compatíveis com sua estrutura.

### Formatos de entrada

- JPG
- JPEG
- PNG
- WEBP
- BMP

### Formato de saída

`.croqui`

Estrutura JSON preparada para interoperabilidade com ferramentas baseadas em canvas/Fabric.js.

### Recursos

- Drag & Drop.
- Upload instantâneo.
- Pré-visualização proporcional.
- Exibição de dimensões da imagem.
- Identificação do formato.
- Exibição do tamanho do arquivo.
- Ajuste inteligente de resolução.
- Controle de qualidade JPEG.
- Sanitização do nome do arquivo.
- Download local.
- Processamento integral no navegador.

### Acesso direto

https://antoniomoraes85.github.io/atratora-forge/#/tools/croqui-converter

---

# 3. Sistema Interativo de Tutoriais

O Atratora Forge possui uma infraestrutura própria de aprendizado interativo.

Os guias podem orientar o usuário diretamente durante a utilização das ferramentas ou apresentar fluxos demonstrativos.

Entre os recursos disponíveis estão:

- tutorial passo a passo;
- destaque visual dos elementos da interface;
- navegação entre etapas;
- modo demonstrativo;
- integração do tutorial com ferramentas reais;
- seção central de Guias.

O objetivo é reduzir a curva de aprendizado sem transformar a interface operacional em documentação extensa.

---

# 4. Tecnologias Utilizadas

- **Interface:** React 18.
- **Linguagem:** TypeScript.
- **Build e Bundler:** Vite 5.
- **Roteamento:** React Router DOM com `HashRouter`.
- **Iconografia:** Lucide React.
- **Estilização:** CSS moderno baseado em Design Tokens.
- **Testes:** Vitest.
- **Validação TypeScript:** `tsc`.
- **Lint:** ESLint.
- **CI/CD:** GitHub Actions.
- **Hospedagem:** GitHub Pages.
- **Persistência atual:** armazenamento local no navegador.
- **Arquitetura:** modular e Local-First.

### Design system

A identidade visual utiliza principalmente:

- Dark Graphite `#0a0c10`
- Deep Indigo `#6366f1`
- Electric Cyan `#38bdf8`
- Emerald `#10b981`

---

# 5. Estrutura do Projeto

```text
atratora-forge/
├── public/
│   ├── guides/
│   └── assets/
│
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   ├── tools.ts
│   │   │   └── guides.ts
│   │   └── routes/
│   │       └── AppRoutes.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── modules/
│   │   ├── croqui-converter/
│   │   │   ├── components/
│   │   │   ├── serializer/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   ├── vetor-forense/
│   │   │   ├── components/
│   │   │   │   └── wizard/
│   │   │   ├── data/
│   │   │   ├── engine/
│   │   │   ├── storage/
│   │   │   └── types/
│   │   │
│   │   └── guides/
│   │       ├── components/
│   │       ├── guides/
│   │       └── types/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Tools/
│   │   ├── CroquiConverter/
│   │   ├── Guides/
│   │   ├── Projects/
│   │   └── About/
│   │
│   ├── styles/
│   └── main.tsx
│
├── docs/
│   ├── PROJECT_MASTER.md
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── DECISIONS.md
│   ├── KNOWLEDGE_INDEX.md
│   └── CROQUI_FORMAT.md
│
├── legacy/
│
├── tests/
│   └── fixtures/
│
├── .github/
│   └── workflows/
│
├── CHANGELOG.md
├── package.json
└── README.md
```

---

# 6. Como Executar Localmente

## Pré-requisitos

- Node.js 18 ou superior.
- Recomendado: Node.js 22.x ou versão LTS compatível.
- npm 9 ou superior.

## Clonar o projeto

```bash
git clone https://github.com/antoniomoraes85/atratora-forge.git
cd atratora-forge
```

## Instalar dependências

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

A aplicação normalmente ficará disponível em:

```text
http://localhost:5173
```

---

# 7. Testes e Validação

## Executar testes

```bash
npm test
```

## Verificar tipos

```bash
npm run typecheck
```

## Executar lint

```bash
npm run lint
```

## Gerar build de produção

```bash
npm run build
```

O processo de produção executa a validação TypeScript antes da geração do bundle pelo Vite.

---

# 8. Publicação no GitHub Pages

O projeto possui deploy automatizado através do **GitHub Actions**.

O workflow encontra-se em:

```text
.github/workflows/
```

A publicação segue o fluxo:

```text
alteração
   ↓
commit
   ↓
push para main
   ↓
GitHub Actions
   ↓
testes/build
   ↓
GitHub Pages
```

Com o workflow configurado, alterações enviadas à branch `main` são automaticamente processadas e publicadas.

### Aplicação pública

https://antoniomoraes85.github.io/atratora-forge/

---

# 9. Privacidade e Segurança

O Atratora Forge foi estruturado com prioridade para processamento local e minimização da exposição de informações técnicas.

### Processamento local

As funcionalidades atualmente ativas são executadas diretamente no navegador.

### Zero telemetria

A plataforma não utiliza mecanismos próprios de:

- rastreamento de comportamento;
- análise de navegação;
- telemetria operacional;
- perfilamento do usuário.

### Zero armazenamento externo dos casos

Os casos e análises locais não dependem de banco de dados remoto para seu funcionamento atual.

### Persistência local

Quando necessária, a persistência é realizada no ambiente local do navegador.

O usuário deve considerar que a limpeza dos dados do navegador poderá remover informações que não tenham sido previamente exportadas.

---

# 10. Princípios Técnicos

O Atratora Forge adota os seguintes princípios:

### Local-First

Priorizar execução no dispositivo do usuário.

### Modularidade

Cada ferramenta funciona como módulo independente integrado à plataforma.

### Auditabilidade

Cálculos técnicos devem permitir identificação das variáveis, parâmetros e fórmulas utilizadas.

### Rastreabilidade

Sempre que aplicável, parâmetros técnicos devem manter referência à respectiva fonte.

### Determinismo

Motores matemáticos devem produzir o mesmo resultado para as mesmas entradas.

### Separação entre cálculo e interpretação

O motor quantitativo deve permanecer separado das camadas de interface e apresentação.

### Não invenção de dados

Ausência de informação não deve ser automaticamente substituída por valores arbitrários.

---

# 11. Roadmap

## Entregas concluídas

### v0.1.x — Fundação

- Estrutura inicial React + TypeScript + Vite.
- Arquitetura modular.
- Conversor de Imagem para `.CROQUI`.
- Testes automatizados.
- Deploy GitHub Pages.

### v0.2.0 — Premium Foundation

- Nova identidade visual.
- Novo catálogo de ferramentas.
- Dashboard reformulado.
- Sistema de guias.
- Expansão das categorias de ferramentas.
- Melhorias de responsividade e design.

### v0.2.1 — Interactive Learning System

- Sistema interativo de tutoriais.
- `InteractiveGuide`.
- `TourOverlay`.
- `GuideStepper`.
- `GuideStage`.
- Tutorial integrado ao Conversor `.CROQUI`.

### v0.3.0 — Vetor Forense

- Novo módulo de análise técnica.
- Wizard de análise.
- Cadastro de veículos.
- Caracterização da via.
- Cadastro de vestígios.
- Base técnica parametrizada.
- Motor de cálculo físico determinístico.
- Múltiplos trechos de dissipação.
- Seleção de métodos aplicáveis.
- Intervalos de velocidade.
- IFT.
- ICA.
- IAE.
- Resultado técnico automatizado.
- Persistência local.
- Exportação da análise.
- Integração à Home e ao diretório de ferramentas.

## Próximos módulos

- **Map Studio**
- **Croqui Studio**
- **Dynamics**
- **Validator**
- **Documents**
- **Field Toolkit**
- **Business Automation**

O planejamento detalhado deve ser mantido em:

[`docs/ROADMAP.md`](docs/ROADMAP.md)

---

# 12. Status das Ferramentas

| Ferramenta | Categoria | Status |
|---|---|---|
| **Vetor Forense** | Análise | 🟢 Disponível |
| **Conversor .CROQUI** | Conversores | 🟢 Disponível |
| Map Studio | Geoprocessamento | 🟡 Em desenvolvimento |
| Croqui Studio | Croquis | 🟡 Em desenvolvimento |
| Dynamics | Análise | 🟡 Em desenvolvimento |
| Validator | Validação | 🟡 Em desenvolvimento |
| Documents | Documentos | 🟡 Em desenvolvimento |
| Field Toolkit | Operações de Campo | 🟡 Em desenvolvimento |
| Business Automation | Automação | 🟡 Em desenvolvimento |

---

# 13. Declaração de Independência e Disclaimer Institucional

A compatibilidade de determinados módulos do **Atratora Forge** com formatos de arquivo, documentos, metodologias ou fluxos técnicos utilizados por órgãos públicos ou sistemas de terceiros possui finalidade exclusivamente técnica, analítica ou de interoperabilidade.

O **Atratora Forge** é uma plataforma independente da iniciativa privada.

**Não existe vínculo, convênio, homologação, parceria ou chancela oficial por parte da Polícia Rodoviária Federal, do Ministério da Justiça e Segurança Pública ou de qualquer outro órgão governamental, salvo declaração formal expressa em sentido contrário.**

Os resultados produzidos por ferramentas de análise técnica dependem da qualidade, quantidade e confiabilidade dos dados fornecidos pelo usuário e não substituem o levantamento técnico, a perícia competente ou a avaliação individualizada do caso.

---

# 14. Créditos e Autoria

**Desenvolvido por:**  
**José Antônio Coutinho de Moraes Filho**

**Atratora Labs**

Plataforma idealizada e desenvolvida para criação de ferramentas técnicas, analíticas e operacionais com foco em modularidade, privacidade, rastreabilidade e processamento local.
