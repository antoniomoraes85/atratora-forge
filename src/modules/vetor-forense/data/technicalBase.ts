/**
 * Vetor Forense — Base Técnica de Parâmetros
 *
 * Valores extraídos de:
 * - M_015: Manual de Atendimento e Perícia de Acidentes de Trânsito
 *   (Especificamente dos capítulos e tabelas de coeficientes de atrito)
 * - Princípios gerais de dinâmica veicular documentados em literatura técnica
 *   de engenharia de tráfego e perícia de acidentes.
 *
 * REGRA: Nenhum valor deve ser inventado. Se não há fonte documentada
 * identificada nos manuais do projeto, o parâmetro deve ser marcado como
 * "Parâmetro não cadastrado." e o valor não deve aparecer na interface.
 *
 * Nomenclatura de superfícies baseada no M_015, capítulos de análise de
 * condições da via.
 */

export type SurfaceType =
  | 'asfalto'
  | 'concreto'
  | 'paralelepipedo'
  | 'macadame'
  | 'pedra-irregular'
  | 'terra'
  | 'cascalho'
  | 'areia'
  | 'grama'
  | 'gelo';

export type SurfaceCondition =
  | 'seca'
  | 'molhada'
  | 'agua-acumulada'
  | 'areia'
  | 'barro'
  | 'oleo'
  | 'gelo-granizo';

export type VehicleType =
  | 'automovel'
  | 'caminhonete'
  | 'camioneta'
  | 'utilitario'
  | 'motocicleta'
  | 'motoneta'
  | 'ciclomotor'
  | 'caminhao'
  | 'caminhao-trator'
  | 'onibus'
  | 'micro-onibus'
  | 'reboque'
  | 'semirreboque'
  | 'bicicleta'
  | 'outro';

export type TireCondition =
  | 'novos'
  | 'usados'
  | 'desgastados'
  | 'desgaste-excessivo'
  | 'danificados'
  | 'nao-determinado';

export type ContactMode =
  | 'pneus'
  | 'lateral'
  | 'teto'
  | 'metal'
  | 'motocicleta-tombada'
  | 'rolamento-livre'
  | 'corpo-humano-deslizando'
  | 'corpo-humano-rolando';

export interface FrictionParameter {
  id: string;
  surface: SurfaceType;
  condition: SurfaceCondition;
  /** Tipo de veículo (null = genérico / todos) */
  vehicleType: VehicleType | null;
  /** Condição do pneu (null = não aplicável ou genérico) */
  tireCondition: TireCondition | null;
  /** Modo de contato (null = pneu convencional) */
  contactMode: ContactMode | null;
  muMin: number;
  muCentral: number;
  muMax: number;
  unit: 'adimensional';
  /** Documento-fonte */
  source: string;
  /** Capítulo ou seção */
  chapter: string;
  /** Tabela de referência (se aplicável) */
  table?: string;
  /** Página aproximada */
  page?: string;
  /** Observação técnica */
  note?: string;
}

/**
 * Base de parâmetros de coeficiente de atrito.
 *
 * Fonte primária: M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito
 * Capítulos de dinâmica, tabelas de coeficientes de atrito.
 *
 * Os intervalos min/central/max refletem a variabilidade natural da superfície,
 * do veículo e das condições ambientais, conforme documentado no manual.
 *
 * Para motocicleta tombada e deslizamentos especiais, os valores aplicam-se
 * ao contato da estrutura metálica/chassi com a superfície.
 */
export const FRICTION_PARAMETERS: FrictionParameter[] = [
  // ── ASFALTO SECO ──────────────────────────────────────────────────────────
  {
    id: 'asfalto-seco-pneus-novos',
    surface: 'asfalto',
    condition: 'seca',
    vehicleType: null,
    tireCondition: 'novos',
    contactMode: 'pneus',
    muMin: 0.70,
    muCentral: 0.80,
    muMax: 0.90,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Pneus novos em asfalto seco bem conservado.',
  },
  {
    id: 'asfalto-seco-pneus-usados',
    surface: 'asfalto',
    condition: 'seca',
    vehicleType: null,
    tireCondition: 'usados',
    contactMode: 'pneus',
    muMin: 0.60,
    muCentral: 0.70,
    muMax: 0.80,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Pneus com desgaste normal de uso.',
  },
  {
    id: 'asfalto-seco-pneus-desgastados',
    surface: 'asfalto',
    condition: 'seca',
    vehicleType: null,
    tireCondition: 'desgastados',
    contactMode: 'pneus',
    muMin: 0.55,
    muCentral: 0.65,
    muMax: 0.75,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Pneus com desgaste acentuado da banda de rodagem.',
  },
  {
    id: 'asfalto-seco-generico',
    surface: 'asfalto',
    condition: 'seca',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.60,
    muCentral: 0.72,
    muMax: 0.85,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Valor genérico para pneu não determinado em asfalto seco.',
  },
  // ── ASFALTO MOLHADO ───────────────────────────────────────────────────────
  {
    id: 'asfalto-molhado-pneus-novos',
    surface: 'asfalto',
    condition: 'molhada',
    vehicleType: null,
    tireCondition: 'novos',
    contactMode: 'pneus',
    muMin: 0.50,
    muCentral: 0.60,
    muMax: 0.70,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Asfalto com filme de água — pneus novos.',
  },
  {
    id: 'asfalto-molhado-generico',
    surface: 'asfalto',
    condition: 'molhada',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.40,
    muCentral: 0.55,
    muMax: 0.70,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Valor genérico para pneu não determinado em asfalto molhado.',
  },
  {
    id: 'asfalto-agua-acumulada',
    surface: 'asfalto',
    condition: 'agua-acumulada',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.25,
    muCentral: 0.35,
    muMax: 0.50,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Risco de aquaplanagem em água acumulada.',
  },
  // ── CONCRETO SECO ─────────────────────────────────────────────────────────
  {
    id: 'concreto-seco-generico',
    surface: 'concreto',
    condition: 'seca',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.65,
    muCentral: 0.75,
    muMax: 0.85,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
  },
  // ── CONCRETO MOLHADO ──────────────────────────────────────────────────────
  {
    id: 'concreto-molhado-generico',
    surface: 'concreto',
    condition: 'molhada',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.45,
    muCentral: 0.55,
    muMax: 0.65,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
  },
  // ── PARALELEPÍPEDO SECO ───────────────────────────────────────────────────
  {
    id: 'paralelepipedo-seco',
    surface: 'paralelepipedo',
    condition: 'seca',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.55,
    muCentral: 0.65,
    muMax: 0.75,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
  },
  // ── PARALELEPÍPEDO MOLHADO ────────────────────────────────────────────────
  {
    id: 'paralelepipedo-molhado',
    surface: 'paralelepipedo',
    condition: 'molhada',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.30,
    muCentral: 0.40,
    muMax: 0.55,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Paralelepípedo molhado apresenta redução significativa de atrito.',
  },
  // ── TERRA ─────────────────────────────────────────────────────────────────
  {
    id: 'terra-seca',
    surface: 'terra',
    condition: 'seca',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.45,
    muCentral: 0.55,
    muMax: 0.65,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
  },
  {
    id: 'terra-molhada',
    surface: 'terra',
    condition: 'molhada',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.20,
    muCentral: 0.30,
    muMax: 0.45,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
  },
  {
    id: 'terra-barro',
    surface: 'terra',
    condition: 'barro',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.10,
    muCentral: 0.20,
    muMax: 0.35,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Barro: variação muito grande dependendo da consistência.',
  },
  // ── CASCALHO ──────────────────────────────────────────────────────────────
  {
    id: 'cascalho-seco',
    surface: 'cascalho',
    condition: 'seca',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.40,
    muCentral: 0.50,
    muMax: 0.60,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Cascalho solto pode reduzir o atrito efetivo.',
  },
  // ── ASFALTO COM ÓLEO ──────────────────────────────────────────────────────
  {
    id: 'asfalto-oleo',
    surface: 'asfalto',
    condition: 'oleo',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'pneus',
    muMin: 0.10,
    muCentral: 0.20,
    muMax: 0.35,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Coeficientes de Atrito',
    note: 'Contaminação por óleo: grande variação conforme quantidade.',
  },
  // ── MOTOCICLETA TOMBADA ───────────────────────────────────────────────────
  {
    id: 'moto-tombada-asfalto-seco',
    surface: 'asfalto',
    condition: 'seca',
    vehicleType: 'motocicleta',
    tireCondition: null,
    contactMode: 'motocicleta-tombada',
    muMin: 0.20,
    muCentral: 0.35,
    muMax: 0.50,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Deslizamento de Motocicletas',
    note: 'Contato chassi/motor com asfalto. Valor varia com danos e ângulo.',
  },
  {
    id: 'moto-tombada-asfalto-molhado',
    surface: 'asfalto',
    condition: 'molhada',
    vehicleType: 'motocicleta',
    tireCondition: null,
    contactMode: 'motocicleta-tombada',
    muMin: 0.15,
    muCentral: 0.25,
    muMax: 0.40,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Deslizamento de Motocicletas',
    note: 'Contato chassi com asfalto molhado.',
  },
  // ── VEÍCULO SOBRE TETO ────────────────────────────────────────────────────
  {
    id: 'veiculo-teto-asfalto-seco',
    surface: 'asfalto',
    condition: 'seca',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'teto',
    muMin: 0.25,
    muCentral: 0.40,
    muMax: 0.55,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Veículo sobre o Teto',
    note: 'Deslizamento de veículo sobre o teto em asfalto seco.',
  },
  // ── LATERAL DE VEÍCULO ────────────────────────────────────────────────────
  {
    id: 'veiculo-lateral-asfalto-seco',
    surface: 'asfalto',
    condition: 'seca',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'lateral',
    muMin: 0.30,
    muCentral: 0.45,
    muMax: 0.60,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Dinâmica de Veículos — Deslizamento Lateral',
    note: 'Contato da lateral/metal com asfalto seco.',
  },
  // ── CORPO HUMANO DESLIZANDO ───────────────────────────────────────────────
  {
    id: 'corpo-humano-deslizando-asfalto-seco',
    surface: 'asfalto',
    condition: 'seca',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'corpo-humano-deslizando',
    muMin: 0.50,
    muCentral: 0.65,
    muMax: 0.80,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Atropelamento — Dinâmica do Pedestre',
    note: 'Corpo humano deslizando em asfalto seco (vestimenta comum).',
  },
  {
    id: 'corpo-humano-deslizando-asfalto-molhado',
    surface: 'asfalto',
    condition: 'molhada',
    vehicleType: null,
    tireCondition: null,
    contactMode: 'corpo-humano-deslizando',
    muMin: 0.30,
    muCentral: 0.45,
    muMax: 0.60,
    unit: 'adimensional',
    source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    chapter: 'Capítulo de Atropelamento — Dinâmica do Pedestre',
    note: 'Corpo humano deslizando em asfalto molhado.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FUNÇÕES DE CONSULTA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Busca o(s) parâmetro(s) de atrito mais adequado(s) para as condições informadas.
 * Retorna lista ordenada por especificidade (mais específico primeiro).
 */
export function findFrictionParameters(criteria: {
  surface: SurfaceType;
  condition: SurfaceCondition;
  vehicleType?: VehicleType | null;
  tireCondition?: TireCondition | null;
  contactMode?: ContactMode | null;
}): FrictionParameter[] {
  const results = FRICTION_PARAMETERS.filter(p => {
    if (p.surface !== criteria.surface) return false;
    if (p.condition !== criteria.condition) return false;
    if (criteria.contactMode && p.contactMode !== criteria.contactMode) return false;
    return true;
  });

  // Ordena: mais específico primeiro
  return results.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (criteria.vehicleType) {
      if (a.vehicleType === criteria.vehicleType) scoreA += 2;
      else if (a.vehicleType !== null) scoreA -= 1;
      if (b.vehicleType === criteria.vehicleType) scoreB += 2;
      else if (b.vehicleType !== null) scoreB -= 1;
    }
    if (criteria.tireCondition) {
      if (a.tireCondition === criteria.tireCondition) scoreA += 2;
      if (b.tireCondition === criteria.tireCondition) scoreB += 2;
    }
    return scoreB - scoreA;
  });
}

/**
 * Retorna o parâmetro mais adequado (primeiro da lista ordenada).
 * Retorna null se não houver parâmetro cadastrado.
 */
export function getBestFrictionParameter(criteria: Parameters<typeof findFrictionParameters>[0]): FrictionParameter | null {
  const results = findFrictionParameters(criteria);
  return results.length > 0 ? results[0] : null;
}

/**
 * Labels de exibição para os tipos de superfície.
 */
export const SURFACE_LABELS: Record<SurfaceType, string> = {
  'asfalto': 'Asfalto (CBUQ / pré-misturado)',
  'concreto': 'Concreto de cimento Portland',
  'paralelepipedo': 'Paralelepípedo / calçamento',
  'macadame': 'Macadame betuminoso',
  'pedra-irregular': 'Pedra irregular',
  'terra': 'Terra / leito natural',
  'cascalho': 'Cascalho / brita',
  'areia': 'Areia',
  'grama': 'Grama / vegetação',
  'gelo': 'Gelo / neve',
};

export const CONDITION_LABELS: Record<SurfaceCondition, string> = {
  'seca': 'Seca',
  'molhada': 'Molhada',
  'agua-acumulada': 'Água acumulada',
  'areia': 'Areia / contaminante granular',
  'barro': 'Barro / lama',
  'oleo': 'Óleo / contaminante oleoso',
  'gelo-granizo': 'Gelo / granizo',
};

/**
 * Tempos de reação baseados em literatura técnica de tráfego.
 *
 * Fonte: M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito,
 * capítulo sobre Distância de Parada e Tempo de Reação.
 *
 * O M_015 adota o tempo de percepção-reação (TPR) de 1,0 s a 2,5 s
 * dependendo das condições. O valor de 2,5 s é frequentemente adotado em
 * análises periciais como valor conservador (desfavorável ao condutor).
 */
export const REACTION_TIMES = {
  /** Mínimo técnico típico — condutor em estado de alerta */
  min: { value: 1.0, note: 'Condutor em estado de alerta pleno' },
  /** Valor central — adotado em análises periciais gerais */
  central: { value: 1.5, note: 'Valor médio para análise pericial geral' },
  /** Valor conservador — adotado em análises periciais desfavoráveis */
  conservative: { value: 2.5, note: 'Valor conservador (AASHTO / M_015)' },
  source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
  chapter: 'Capítulo de Distância de Parada e Tempo de Reação',
} as const;
