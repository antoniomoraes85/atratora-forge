# Índice de Conhecimento e Referência Técnica (KNOWLEDGE INDEX)

> **AVISO DE CONFIDENCIALIDADE E INDEPENDÊNCIA**
> Os documentos listados abaixo são manuais e procedimentos operacionais mantidos estritamente em ambiente local para consulta de conceitos técnicos, terminologia, regras viárias e fluxos operacionais.
> **Eles NÃO fazem parte do repositório público**, não são distribuídos com o software e não estabelecem qualquer chancela ou vínculo entre a Atratora Labs e órgãos governamentais.

---

## 1. Inventário Geral

Total de documentos inventariados: **19 arquivos** distribuídos em 3 pastas locais.

---

## 2. Pasta: `Atendimento de Acidentes/`

| Arquivo | Categoria | Assunto Principal | Utilidade para Atratora Forge | Módulos Futuros Apoiados |
| :--- | :--- | :--- | :--- | :--- |
| `M 015 - Acidentes.pdf` | Manual Operacional | Diretrizes gerais de atendimento de acidentes de trânsito | Extração de taxonomia de acidentes, tipos de colisão, fases do atendimento | `traffic-accidents`, `Validator`, `Documents` |
| `M_015___versao_Final_up_processo.pdf` | Manual Operacional (Revisão) | Versão revisada do manual M-015 com detalhamento de procedimentos | Identificação de atualizações procedimentais e critérios de perícia sumária | `traffic-accidents`, `Validator` |
| `Manual_de_atendimento_de_acidentes_de_transito_M015_Final.docx` | Documentação Fonte | Matriz textual editável do manual M-015 | Busca textual e referência terminológica precisa de termos viários | `traffic-accidents`, `Documents` |
| `Manual_de_atendimento_de_acidentes_de_transito_M015_Final.pdf` | Manual Operacional (Consolidado) | Documento diagramado final do manual M-015 | Referência de ilustrações técnicas, amarrações de vestígios e croquis de referência | `Croqui Studio`, `Dynamics`, `traffic-accidents` |
| `M 040 Atendimento a Emergencia PP.pdf` | Manual de Especialidade | Atendimento a emergências envolvendo Produtos Perigosos (PP) | Tabelas de substâncias (ONU/risco), isolamento de perímetro e zonas quentes/frias | `Validator`, `Hazard Studio` (futuro) |
| `M-074 - 2021 - Manual de Inspeção Técnica Viaria.pdf` | Manual de Engenharia/Inspeção | Metodologia e critérios de inspeção técnica de rodovias e infraestrutura viária | Parâmetros de defeitos em pavimento, sinalização horizontal/vertical, drenagem e geometria viária | `Map Studio`, `Road Safety Validator` |

---

## 3. Pasta: `Educação para o Trânsito/`

| Arquivo | Categoria | Assunto Principal | Utilidade para Atratora Forge | Módulos Futuros Apoiados |
| :--- | :--- | :--- | :--- | :--- |
| `Manual_EDT_M_054.docx` | Documentação Educacional (Editável) | Estruturação de projetos e ações educativas de trânsito | Diretrizes para relatórios educativos, estatísticas pedagógicas e campanhas | `education`, `Documents` |
| `Manual_EDT_M_054.pdf` | Manual Educacional (Diagramado) | Manual M-054 consolidado de Educação para o Trânsito | Mapeamento de indicadores de conscientização e fluxos de campanhas viárias | `education`, `Documents` |

---

## 4. Pasta: `Sistemas PRF/`

| Arquivo | Categoria | Assunto Principal | Utilidade para Atratora Forge | Módulos Futuros Apoiados |
| :--- | :--- | :--- | :--- | :--- |
| `M 023 - BOP.docx` | Sistema Operacional | Boletim de Ocorrência Policial (BOP) | Modelo conceitual de campos estruturados de ocorrência | `Documents`, `Validator` |
| `M 023 - BOP.pdf` | Sistema Operacional | Manual de usuário e regras de preenchimento do BOP | Mapeamento de tipificações, qualificações de envolvidos e vestígios | `Documents`, `Validator` |
| `M 023 - BOP(1).docx` | Sistema Operacional (Duplicata) | Cópia redundante de trabalho do M 023 | N/A (Preservado para integridade histórica local) | N/A |
| `M 023 - BOP(2).docx` | Sistema Operacional (Duplicata) | Cópia redundante de trabalho do M 023 | N/A (Preservado para integridade histórica local) | N/A |
| `M 026 PDI.docx` | Gestão Operacional | Procedimento Disciplinar / PDI | Entendimento de fluxos administrativos formais | `Admin Automations` |
| `M 026 PDI.pdf` | Gestão Operacional | Manual completo de PDI | Regras de tramitação e validação de prazos e etapas | `Admin Automations` |
| `M 041 - Novo BAT.pdf` | Sistema de Acidentes (Crítico) | Boletim de Acidentes de Trânsito (BAT) e integração com LPST | Compreensão da estrutura de dados de acidentes, campos de croqui, veículos, vítimas e causas presumíveis | `Croqui Studio`, `traffic-accidents`, `Validator`, `Documents` |
| `M 098 - SICOP.pdf` | Sistema Processual | Sistema de Controle de Processos (SICOP) | Metadados de processos, numeração única, despachos e anexos | `Documents`, `Process Engine` |
| `MPO 011 - Sistemas Movéis.pdf` | Procedimento Operacional | Operação de dispositivos e coletores móveis em campo | Requisitos de usabilidade para interfaces móveis e trabalho offline | `Mobile UX`, `Offline-first` |
| `MPO 016 - Silver.pdf` | Telemetria e Fiscalização | Sistema Silver de consulta veicular e fiscalização eletrônica | Formatos de identificação veicular, placas, chassi e metadados de tráfego | `Vehicle Data Helpers` |
| `MPO 074 - Alerta Brasil.pdf` | Monitoramento e Cercamento | Sistema Alerta Brasil de leitura de placas (OCR/LPR) | Estrutura de dados de passagem, câmeras e coordenadas geográficas de pontos de monitoramento | `Map Studio`, `Geoprocessing` |

---

## 5. Diretrizes para Fases Futuras

1. **Desacoplamento Rigoroso**: Os conceitos extraídos destes manuais (como tipologia de acidentes ou regras de amarração pericial) devem ser modelados como regras técnicas genéricas de engenharia e perícia, e não como código proprietário da instituição.
2. **Camada de Domínios Opcionais**: Quando implementadas nas versões v0.6+, essas lógicas residirão em `src/domains/traffic-accidents/`, `src/domains/road-safety/`, etc., podendo ser ativadas ou desativadas modularmente.
3. **Segurança de Dados**: O build da plataforma web nunca lerá nem empacotará estes arquivos, mantendo a aplicação leve, 100% privada e em conformidade legal.
