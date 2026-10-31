# Vetor Forense — identidade ATRATOR e hero panorâmico v3

**Data:** 31/10/2026. **Natureza:** revisão de interface e arquivos de marca; nenhuma funcionalidade pericial nova foi implementada.

## Orientação do titular

1. O **buraco negro cinematográfico** deve ocupar toda a **área central superior** da dashboard, não ficar em um painel pequeno.
2. O conceito de parallax deve trazer curvatura, halo, disco de acreção e **linhas de luz atraídas** ao centro, seguindo as imagens de referência fornecidas.
3. A logo Vetor Forense deve seguir a **família visual ATRATOR**, com V direcional, vórtice e identidade azul-petróleo/dourado, substituindo o monograma anterior.
4. As áreas inferiores continuam **claras**, com organização e nomenclatura técnicas.

## Arquivos realmente incorporados

| Caminho | Função | Estado |
|---|---|---|
| `public/hero/atrator-black-hole.avif` | Arte cinematográfica gerada para o hero (1672 × 941, 28.073 bytes) | Incorporada como blob binário Git |
| `public/brand/vetor-forense-concept.avif` | Referência visual gerada para a identidade (14 KB) | Arquivada no repositório para consulta |
| `src/components/ui/BlackHoleField.tsx` | Carregamento local da imagem, parallax e linhas luminosas | Atualizado |
| `src/components/ui/black-hole-field.css` | Máscara de legibilidade, profundidade e `prefers-reduced-motion` | Atualizado |
| `src/pages/Home/home-forensics.css` | Hero de largura integral, texto sobre o fundo e adaptação mobile | Atualizado |
| `src/components/ui/Logo.tsx` | Ícone vetorial ATRATOR + assinatura de texto | Atualizado |
| `public/favicon.svg` | Favicon vetorial | Atualizado |
| `public/brand/vetor-forense-symbol.svg` | Símbolo original escalável | Atualizado |
| `public/brand/vetor-forense-lockup.svg` | Assinatura horizontal escalável | Atualizado |
| `public/favicon.ico`, `public/favicon-32x32.png`, `favicon-64x64.png`, `icon-192.png`, `icon-512.png` | Ícones raster gerados do novo SVG | Atualizados |
| `public/site.webmanifest` | Referências oficiais a ícones PWA | Atualizado |

A referência ilustrada da logo foi adaptada para um SVG independente, em vez de exibir o PNG de conceito com margens extensas dentro do menu.

## Layout

- Hero com largura de ponta a ponta do conteúdo central, respeitando a sidebar; em desktop usa margem negativa equivalente ao padding do `main`.
- Imagem de fundo panorâmica, com centro fotográfico deslocado para a região direita e máscara azul-escura para preservar a legibilidade do título à esquerda.
- Conteúdo sobre a imagem: título, explicação, botões e contagem de ferramentas atuais/planejadas.
- Em telas pequenas, reduz-se a intensidade de movimento e reajusta-se o enquadramento.
- Abaixo do hero, mantém-se a interface clara de catálogo técnico, sem multiplicidade de cores.

## Parallax e desempenho

- A imagem AVIF local é a camada de fundo; não há download de serviços externos ou dependência de CDN.
- Uma camada de SVG com 24 linhas sutis adiciona pequenas partículas animadas em direção ao centro.
- Uma terceira camada mantém o leve efeito de iluminação atmosférica.
- O movimento de mouse/scroll usa `requestAnimationFrame`, sem causar re-render React por evento.
- `prefers-reduced-motion` desativa os movimentos, e `pointer-events:none` evita bloquear cliques.
- Foto e movimentos são **representações artísticas**, não simulações fisicamente rigorosas do espaço-tempo.

## Preservação

- Mantidas rotas `/tools/vetor-forense` e `/tools/croqui-converter`.
- Não alterados cálculos, dados locais, documentação científica ou experimentos.
- Os seis módulos digitais seguem classificados como **planejados**, sem emitir laudos oficiais nem realizar perícia mobile nesta etapa.
- A marca não representa vínculo com órgãos públicos.

## Critérios para publicar

- [ ] TypeScript sem erros.
- [ ] Testes automatizados, inclusive verificação de arquivos AVIF e ícones PNG/ICO.
- [ ] Build de produção.
- [ ] Deploy no GitHub Pages.
- [ ] Revisão visual pelo titular em desktop e smartphone.
