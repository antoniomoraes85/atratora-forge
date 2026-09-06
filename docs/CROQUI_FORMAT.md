# Especificação Técnica do Formato `.croqui`

Este documento registra a anatomia, o payload e os parâmetros de compatibilidade do formato de arquivo com extensão `.croqui`, utilizado historicamente em editores vetoriais baseados em HTML5 Canvas e Fabric.js (como o LPST).

---

## 1. Fatos Confirmados (CONFIRMADO)

### 1.1 Natureza do Arquivo
- **Codificação**: Texto plano formatado em JSON UTF-8.
- **Extensão**: `.croqui` (ex.: `cenario_acidente.croqui`).
- **MIME Type**: `application/json;charset=utf-8`.
- **Origem da Tecnologia**: O formato é a serialização nativa do método `canvas.toJSON()` da biblioteca **Fabric.js** (versão 2.x/3.x).

### 1.2 Estrutura Raiz
A raiz do documento JSON é obrigatoriamente um objeto contendo a chave `objects`:
```json
{
  "objects": [ ... ]
}
```
Não existem metadados obrigatórios fora de `objects` para que o carregamento ocorra com sucesso via `canvas.loadFromJSON()`.

### 1.3 Objeto de Imagem Encapsulada (`type: "image"`)
Para encapsular uma imagem rasterizada (foto aérea, ortofoto, mapa exportado, diagrama) como base do croqui, o objeto dentro do array `objects` deve conter as seguintes propriedades exatas:

```json
{
  "type": "image",
  "originX": "left",
  "originY": "top",
  "left": 0,
  "top": 0,
  "width": 1300,
  "height": 731,
  "fill": "rgb(0,0,0)",
  "stroke": null,
  "strokeWidth": 0,
  "strokeDashArray": null,
  "strokeLineCap": "butt",
  "strokeLineJoin": "miter",
  "strokeMiterLimit": 10,
  "scaleX": 1,
  "scaleY": 1,
  "angle": 0,
  "flipX": false,
  "flipY": false,
  "opacity": 1,
  "shadow": null,
  "visible": true,
  "clipTo": null,
  "backgroundColor": "",
  "fillRule": "nonzero",
  "globalCompositeOperation": "source-over",
  "transformMatrix": null,
  "skewX": 0,
  "skewY": 0,
  "selectable": true,
  "hasBorders": true,
  "hasControls": true,
  "lockMovementX": false,
  "lockMovementY": false,
  "filters": [],
  "src": "data:image/jpeg;base64,...",
  "crossOrigin": "",
  "alignX": "none",
  "alignY": "none",
  "meetOrSlice": "meet"
}
```

### 1.4 Propriedade `src` e Codificação
- O payload de imagem **deve** ser uma Data URL em formato Base64.
- Inicia com: `data:image/jpeg;base64,`.
- Para desempenho e compatibilidade no navegador, JPEG com qualidade entre `0.80` e `0.95` (padrão `0.90`) e largura máxima recomendada de **1300 px** oferece o melhor balanço entre nitidez e tamanho do arquivo final.

### 1.5 Múltiplos Objetos Vetoriais
A inspeção do arquivo de teste de produção `26035629B01.croqui` confirma que um arquivo `.croqui` complexo suporta uma lista heterogênea de objetos vetoriais serializados pelo Fabric.js:
- `group`: Agrupamentos de pistas, veículos e faixas.
- `path`: Traçados de curvas, marcas de frenagem e trajetórias.
- `i-text` / `text`: Anotações, placas de trânsito, legendas e identificações numéricas.

---

## 2. Hipóteses e Comportamentos a Investigar (HIPÓTESE / A INVESTIGAR)

| Item | Status | Hipótese | Ação Necessária em Versões Futuras |
| :--- | :--- | :--- | :--- |
| Propriedade `opcoes` | A Investigar | Observada em alguns grupos do `26035629B01.croqui`. Parece ser metadado específico do LPST para propriedades de pista. | Mapear chaves permitidas antes de implementar exportador vetorial multiobjeto no `Croqui Studio`. |
| Limite de Resolução | A Investigar | Imagens acima de 2500 px podem gerar arquivos `.croqui` superiores a 5MB, causando lentidão no renderizador de terceiros. | Manter a restrição padrão em 1300 px na v0.1 e testar limites práticos de memória na v0.4. |
| Coordenadas de Referência | A Investigar | Não há sistema georreferenciado nativo (EPSG/WGS84) gravado no `.croqui`. As coordenadas são pixels relativos do canvas `(0, 0)`. | Criar camada de projeção cartográfica no futuro `Map Studio` para converter lat/long em pixels antes da exportação. |

---

## 3. Isolamento Arquitetural na Atratora Forge

O formato `.croqui` **NÃO** é o modelo canônico de dados da Atratora Forge. 
O sistema segue o princípio:
$$\text{Modelo Interno Atratora} \longrightarrow \text{Adaptador / Serializador} \longrightarrow \text{Arquivo .croqui}$$

Qualquer evolução futura para formatos abertos (GeoJSON, SVG, PDF Pericial, DXF) utilizará outros adaptadores paralelos, mantendo o conversor e o serializador `.croqui` desacoplados do núcleo da plataforma.
