# Identidade visual — Vetor Forense / ATRATOR

**Data:** 31/10/2026 · **Status:** redesign implementado na branch de revisão, sujeito à validação CI.

## 1. Posicionamento

**ATRATOR** é a assinatura do ecossistema. **Vetor Forense** é o produto técnico e tem logotipo próprio. A marca deve comunicar precisão, estrutura de evidências, direção e responsabilidade científica, **sem símbolos policiais nem alegação de chancela institucional**.

O sistema busca uma estética próxima a ferramentas científicas/B2B, não a ficção cyberpunk ou painéis de monitoramento com múltiplos neons.

## 2. Design system

| Token | Hex | Papel |
|---|---|---|
| Fundo geral | `#F5F7F7` | Área de leitura |
| Superfície | `#FFFFFF` | Cards, filtros, sidebar |
| Texto principal | `#19282D` | Hierarquia textual |
| Grafite profundo | `#1E333A` | Botões, monograma e precisão |
| Cinza-azulado | `#365C67` | Ícones e informações auxiliares |
| Bronze | `#91652C` / `#C5A06A` | Assinatura ATRATOR e detalhes pontuais |
| Verde discreto | `#217452` | Somente estado disponível |
| Bordas | `rgba(31,50,56,.10)` | Separação sem excesso |

**Regras:** fundo claro, sem card com gradiente multicolorido, sombras leves, 1 ícone por ferramenta, indicadores sem cores de moda, espaçamento consistente de 16–32 px, texto técnico objetivo.

Componentes aplicados: `variables.css`, `global.css`, `layout-clean.css`, `home-forensics.css`, `tools-clean.css`, `about-clean.css`.

## 3. Marca Vetor Forense

Monograma vetorial original criado em `src/components/ui/Logo.tsx` e repetido no `public/favicon.svg`:
- **V** geometricamente reconhecível para representar “Vetor”.
- **Traço ascendente com terminal direcional:** análise e trajetória.
- **Alvo circular com ponto central:** observação de uma evidência.
- **Grafite + bronze** em vez de escudos, brasões, insígnias ou simbolismo policial.

O símbolo é escalável como SVG e acompanha o texto “VETOR FORENSE / ECOSSISTEMA ATRATOR”. O favicon SVG é a opção principal; ícones raster legados podem exigir futura regeneração em operação gráfica específica.

## 4. Buraco negro em parallax

`BlackHoleField.tsx` e `black-hole-field.css`:
- gráfico gerado em SVG, sem imagens externas, WebGL ou bibliotecas de animação;
- 18 linhas espiraladas discretas e órbitas direcionadas ao centro;
- núcleo escuro e halo bronze de baixa opacidade;
- parallax limitado a poucos pixels em pointer/scroll;
- `prefers-reduced-motion` desativa animações e deslocamento;
- arte declarada `aria-hidden` e isolada atrás do texto; não representa dado pericial nem cálculo gravitacional científico.

## 5. Nomeação antiga → nova (ID estável)

| ID técnico | Nome anterior | Nome exibido no catálogo |
|---|---|---|
| `vetor-evidence` | Vetor Evidence | Gestão de Evidências Digitais |
| `vetor-reports` | Vetor Reports | Relatórios Técnicos |
| `vetor-mobile` | Vetor Mobile | Análise de Dispositivos Móveis |
| `vetor-media` | Vetor Media | Análise de Mídia Digital |
| `vetor-documents` | Vetor Documents | Verificação de Documentos Digitais |
| `vetor-fraud` | Vetor Fraud | Análise de Incidentes e Fraudes Digitais |
| `vetor-forense` | Análise de Dinâmica Veicular | Reconstrução de Dinâmica Veicular |
| `croqui-converter` | Conversor .CROQUI | Conversor de Croquis |
| `map-studio` | Map Studio | Mapas e Georreferenciamento |
| `croqui-studio` | Croqui Studio | Editor de Croquis Técnicos |
| `dynamics` | Dynamics | Linha do Tempo de Eventos |
| `validator` | Validator | Validação Técnica |
| `documents` | Documents (legado) | Modelos de Documentos (legado) |
| `field-toolkit` | Field Toolkit | Coleta Técnica em Campo |
| `business-automation` | Business Automation | Automação de Fluxos Técnicos |

**IDs, rotas, referências aos guias, parâmetros de cálculos, armazenamento e motores de análise não foram renomeados nem migrados.** Os nomes “Vetor Evidence/Reports/Mobile” permanecem em **códigos de produto** nos cartões prioritários, mas a função está escrita em português em destaque.

## 6. Arquitetura da informação

**Quatro categorias de apresentação:** Evidências e análises; Documentação técnica; Campo e representação; Automação. Mapeamento central em `src/app/config/productGroups.ts`; filtros de busca, categoria e maturidade em `src/pages/Tools/Tools.tsx`.

**Prioridade visual:** 3 futuros núcleos principais → 3 verticais auxiliares, menos proeminentes → 2 ferramentas operacionais com links reais → metodologia e escopo legal. O catálogo distingue `available`, `development` e `planned`.

## 7. Controle de qualidade e limitações

- [x] Tema claro, marca própria, favicon SVG e documentação.
- [x] Parallax SVG controlado e acessibilidade de movimento reduzido.
- [x] Navegação e catálogo reorganizados com IDs internos preservados.
- [x] Testes automatizados de nomenclatura, grupos, marca, SSR e links.
- [ ] Revisão visual manual em desktop e mobile após publicação.
- [ ] Revisão futura dos ícones raster legados `favicon-32x32.png`, `icon-192.png` etc. (a versão SVG é primária).
- [ ] Revisão de segurança de dependências conforme Issue #4.
- [ ] Implementação de Evidence, Reports, Mobile **não faz parte deste PR**.

**Independência e legalidade:** plataforma não possui perícia oficial, laudo automático oficial nem custódia certificada. Apenas pessoas com competência e habilitação pertinente podem emitir documentos profissionais, respeitados os requisitos legais. Nenhum dispositivo foi analisado neste redesign.

**Prioridade externa preservada:** nenhuma alteração aos projetos de dissertação MPC/RL ou doutorado da UFRGS.
