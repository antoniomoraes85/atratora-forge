# Direção do produto — Vetor Forense / ATRATOR

**Atualização:** 31/10/2026. **Natureza:** estratégia de produto e readequação da dashboard. Não implica operação comercial autorizada, habilitação pericial ou certificação forense.

## Objetivo

Evoluir a plataforma de automação técnica e dinâmica veicular para uma suíte modular de **organização de evidências digitais, documentação técnica, análise mobile e exame de mídias**, mantendo independência institucional e o núcleo atual estável.

O produto deve distinguir:
- **Software para profissionais habilitados:** infraestrutura de análise e documentação.
- **Prestação de serviços:** depende de competência técnica, autorização do titular dos dados, eventual habilitação legal e análise de incompatibilidades com o cargo público.
- **Perícia oficial:** não é uma funcionalidade do software; depende de investidura/designação nos termos aplicáveis.

## Matriz de maturidade

| ID | Módulo | Status de software em 31/10 | Proposta (não entregue) |
|---|---|---|---|
| `vetor-evidence` | Vetor Evidence | **Planejado** | Caso, origem, autorização, SHA-256, manifesto, histórico de operações |
| `vetor-reports` | Vetor Reports | **Planejado** | Relatórios com método, achados, fontes, limitações e assinatura humana |
| `vetor-mobile` | Vetor Mobile | **Planejado** | Importação e análise de artefatos de dispositivos próprios/autorizados |
| `vetor-media` | Vetor Media | **Planejado** | Exames de metadados, integridade e consistência em áudio/vídeo/imagem |
| `vetor-documents` | Vetor Documents | **Planejado** | Metadados, integridade e assinaturas de documentos eletrônicos |
| `vetor-fraud` | Vetor Fraud | **Planejado, fase futura** | Correlação documental de registros autorizados de incidentes/fraudes |
| `vetor-forense` | Análise de Dinâmica Veicular | **Disponível — protótipo exploratório** | Motor físico e classificação de métodos já implementados |
| `croqui-converter` | Conversor .CROQUI | **Disponível** | Conversão local em formato compatível |
| Demais módulos antigos | Map Studio, Croqui Studio, Dynamics, Validator, Field Toolkit, Automation | **Em desenvolvimento no catálogo** | Roadmap preservado, sem promoção indevida |

**Regra comercial:** nenhum card planejado pode ter botão 'executar perícia' ou 'emitir laudo'. Somente ferramentas com rotas reais podem ser marcadas como disponíveis.

## Ordem de entrega

### Fase 0 — fundamentos jurídicos e segurança
- [ ] Consultar compatibilidade de exploração de software e prestação de serviços pelo titular, servidor da PRF, com órgão competente/SeCI.
- [ ] Identificar limites legais da prestação de pareceres e nomeação pericial e eventual necessidade de profissional registrado.
- [ ] Definir categorias de dados pessoais, retenção, segregação, controle de acesso e base legal LGPD.
- [ ] Validar mercado com profissionais e escritórios, sem prometer serviços ainda não disponíveis.

### Fase 1 — Vetor Evidence (primeiro MVP)
- [ ] Criar estrutura de `Case`, `Evidence`, `Acquisition`, `Operation`, `Attachment` e `ExportManifest`.
- [ ] Importar arquivos com autorização documentada; nunca modificar o original.
- [ ] SHA-256 calculado sobre **bytes originais**; arquivo de saída com hashes, versão, horário e ambiente.
- [ ] Histórico de operações exportável; distinguir horário informado e confiável.
- [ ] Verificador independente de manifesto, testes de corrupção e casos sintéticos.
- [ ] Definir armazenamento robusto: `localStorage` atual **não** garante custódia de evidências sensíveis.
- [ ] Política de cópia, backup, criptografia, limites de tamanho e exclusão.

### Fase 2 — Vetor Reports
- [ ] Templates: relatório de triagem, relatório técnico detalhado e parecer.
- [ ] Campos obrigatórios: objeto, autorização, material, fontes, métodos, ferramentas/versões, resultados, hipóteses alternativas, limitações, anexos.
- [ ] Exportar PDF com consistência de citações e manifestos.
- [ ] Assinatura cabe ao responsável; documento do software **não equivale** a laudo oficial ou decisão judicial.

### Fase 3 — Vetor Mobile
- [ ] Priorizar **Android** em dispositivos de teste próprios e autorizados.
- [ ] Começar por **importar** artefatos de ferramentas especializadas, não criar mecanismo de desbloqueio.
- [ ] Evidenciar lacunas de cobertura, falso negativo e impossibilidade de garantir 'ausência de invasão'.
- [ ] Construir casos sintéticos conhecidos e revisão técnica externa.
- [ ] Somente depois incluir iOS e ferramentas comerciais, conforme demanda e orçamento.

### Fase 4+ — mídia, documentos, fraudes e expansão
- [ ] Módulos de metadados/imagens e documentos eletrônicos após Evidence+Reports.
- [ ] Parcerias com especialistas habilitados conforme área de atuação.
- [ ] Preservar projeto de dinâmica veicular, sem usar materiais internos da PRF ou chancelas institucionais.

## Princípios de produto

1. **Transparência da maturidade:** `disponível` ≠ `desenvolvimento` ≠ `planejado`.
2. **Segurança:** arquivos fornecidos só mediante autorização legítima; nunca analisar aparelhos de terceiros sem base jurídica.
3. **Método:** hash não prova autenticidade anterior à aquisição; ausência de IOC não significa ausência de spyware.
4. **Rastreabilidade:** origem, ferramentas, versão e limitações são parte da evidência.
5. **Privacidade:** não colocar evidências sensíveis em GitHub Pages, issues públicas ou telemetria.
6. **Independência:** marca e software independentes; nenhuma representação de endosso institucional.
7. **Compatibilidade legal:** emissão de relatório por software não dispensa competência/habilitação ou autoriza exercício remunerado vedado ao titular.
8. **Convivência:** evolução não reescreve códigos do motor de dinâmica veicular nem projeto de pesquisa MPC/RL.

## Checklist desta entrega (dashboard)

- [x] Hero e narrativa da plataforma alinhados à evolução digital.
- [x] Catálogo de seis módulos digitais com status **planejado**, sem rotas falsas.
- [x] Cards de ferramentas realmente existentes preservados.
- [x] Diretório pesquisável por categorias novas; filtro por status atualizado.
- [x] Avisos de independência institucional, limitação técnica e distinção entre relatórios/perícia oficial.
- [x] Teste automatizado do catálogo para prevenir falso anúncio de disponibilidade.
- [ ] Validação no pipeline CI e revisão visual do site após publicação.
- [ ] Implementação do motor Evidence/Reports/Mobile — **fora do escopo deste redesenho**.

## Lançamento e comercialização

O site atualmente funciona como vitrine de produto e demonstração de ferramentas existentes, **não como laboratório de perícia digital operacional**. Não incluir preços, promessas de resultados, checkout ou recepção de dados de clientes antes de validação de requisitos técnicos, legais e de segurança.

**Documento canônico de estratégia da expansão.** Manter o antigo [ROADMAP.md](ROADMAP.md) como histórico dos módulos de cartografia e acidente; evitar apagá-lo.
