# Arquitetura do Sistema — Atratora Forge

Este documento descreve as decisões e padrões arquiteturais que regem o código-fonte da plataforma **Atratora Forge**, desenvolvida pela **Atratora Labs**.

---

## 1. Visão Geral da Arquitetura

A plataforma Atratora Forge foi projetada sob três princípios vitais:
1. **Local-First & Privacidade Estrita**: Todo o processamento computacional ocorre na sandbox do navegador do usuário, dispensando dependências de infraestrutura de backend para operações essenciais.
2. **Desacoplamento do Formato `.croqui`**: O formato de saída `.croqui` é tratado como um destino de exportação secundário gerenciado por um adaptador isolado, nunca como modelo de domínio central da plataforma.
3. **Modularidade e Domínios Independentes**: Cada ferramenta e futuro domínio de negócio reside em seu próprio módulo coeso, facilitando a adição contínua de funcionalidades sem efeitos colaterais.

```
┌─────────────────────────────────────────────────────────────┐
│                    Atratora Forge (UI Shell)                │
│       Layout • Sidebar • Header • Dashboard • Navegação     │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
    ┌───────────▼────────────┐    ┌───────────▼────────────┐
    │  Módulo: Conversor     │    │   Futuros Módulos      │
    │        .CROQUI         │    │ (MapStudio, Croqui, etc)│
    └───────────┬────────────┘    └───────────┬────────────┘
                │                             │
    ┌───────────▼────────────┐    ┌───────────▼────────────┐
    │       Adaptador        │    │     Modelo Interno     │
    │  (Serializer / Fabric) │    │  (Geometria / Domínio) │
    └───────────┬────────────┘    └───────────┬────────────┘
                │                             │
    ┌───────────▼────────────┐    ┌───────────▼────────────┐
    │    Arquivo .croqui     │    │ Exporters: SVG/PDF/Geo │
    └────────────────────────┘    └────────────────────────┘
```

---

## 2. Padrão Domain / Adapter / Exporter

O pipeline de dados da plataforma segue o fluxo:

$$\text{Entrada do Usuário (Arquivo/Interface)} \longrightarrow \text{Processamento Local / Validação} \longrightarrow \text{Adaptador / Serializador} \longrightarrow \text{Blob de Saída}$$

### Na V0.1 (Conversor de Imagem para `.croqui`):
1. **Entrada**: Arquivo de imagem (`image/jpeg`, `image/png`, `image/webp`, `image/bmp`).
2. **Processamento Local (`imageProcessor.ts`)**:
   - Carregamento assíncrono via `Image()` e `createObjectURL()`.
   - Cálculo de proporção e limitação dimensional (padrão 1300 px de largura).
   - Renderização em elemento `<canvas>` offscreen.
   - Compressão em JPEG com fator de qualidade ajustável (padrão 90%).
3. **Serializador (`createCroqui.ts`)**:
   - Criação da estrutura estrita compatível com a biblioteca Fabric.js 2.x utilizada pelo LPST.
   - Injeção das propriedades geométricas (`scaleX: 1`, `scaleY: 1`, `angle: 0`, `originX: 'left'`).
   - Empacotamento no objeto raiz `{"objects": [...]}`.
4. **Exportador (`downloadCroqui.ts`)**:
   - Geração de `Blob` com MIME `application/json;charset=utf-8`.
   - Sanitização de nome de arquivo (remoção de caracteres inválidos no Windows/Linux).
   - Disparo do download nativo via elemento `<a>` temporário.

---

## 3. Organização de Pastas do Código-Fonte

```
src/
├── app/                  # Configuração de rotas e metadados globais
│   ├── config/           # Constantes e rotas de navegação
│   └── routes/           # Mapeamento do HashRouter
├── components/           # Componentes atômicos e estruturais reutilizáveis
│   ├── layout/           # Shell da aplicação (Layout, Sidebar, Header, Footer)
│   ├── navigation/       # Links de navegação e breadcrumbs
│   └── ui/               # Botões, cards, badges, inputs e tooltips
├── modules/              # Módulos funcionais isolados da plataforma
│   └── croqui-converter/ # Primeiro módulo funcional
│       ├── components/   # Uploader, preview, configurações
│       ├── serializer/   # createCroqui, validateCroqui, downloadCroqui
│       ├── services/     # imageProcessor (canvas, escala, dataURL)
│       └── types/        # Interfaces do payload Fabric e parâmetros
├── pages/                # Telas completas da aplicação
│   ├── Home/             # Dashboard SaaS com hero e módulos
│   ├── Tools/            # Diretório de ferramentas
│   ├── CroquiConverter/  # Tela da ferramenta funcional v0.1
│   ├── Projects/         # Área de projetos futuros
│   └── About/            # Sobre a plataforma e termos de independência
├── styles/               # Sistema de estilos (CSS nativo com Design Tokens)
│   ├── variables.css     # Paleta dark, tipografia, espaçamentos
│   └── global.css        # Reset, fontes e utilitários
├── domains/              # [PREVISTO V0.6+] Regras periciais e de trânsito
└── main.tsx              # Ponto de entrada da aplicação React
```

---

## 4. Estratégia de Identidade Visual e UI Tokens

A identidade da Atratora Forge rejeita explicitamente designs governamentais, adotando:
- **Superfícies**: Dark Graphite (`#0a0c10` a `#141824`) para máxima profundidade e conforto visual.
- **Destaque Primário**: Índigo e Violeta (`#6366f1` / `#818cf8`), transmitindo sofisticação técnica e modernidade.
- **Acentos**: Ciano e Azul Elétrico (`#38bdf8`), evocando precisão analítica e geoprocessamento.
- **Feedback Operacional**: Verde Esmeralda (`#10b981`) para confirmação de geração e sucesso de processamento.
- **Efeitos**: Glassmorphism sutil (`backdrop-filter: blur(12px)` com bordas translúcidas de 1px), elevações suaves e microanimações de hover com transições de 200ms.

---

## 5. Compatibilidade e Publicação no GitHub Pages

- **Roteamento**: Adoção do `HashRouter` (ex.: `#/ferramentas/conversor-croqui`), eliminando os problemas clássicos de recarregamento de página (HTTP 404) em hospedagens de arquivos estáticos como o GitHub Pages.
- **Base Path**: Caminho relativo base (`./` ou base configurável) no `vite.config.ts`, permitindo que a aplicação seja servida tanto na raiz de um domínio customizado quanto sob um subcaminho como `/atratora-forge/`.
- **Pipeline de CI**: GitHub Actions automatizado no arquivo `.github/workflows/deploy.yml`, realizando `npm ci`, `npm test` e `npm run build` antes de publicar a pasta `dist/` na branch de Pages.
