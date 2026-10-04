/**
 * Vetor Forense — Motor de Cálculo (TypeScript puro, sem IA)
 *
 * Fórmulas baseadas em:
 * - M_015: Manual de Atendimento e Perícia de Acidentes de Trânsito
 * - Dinâmica clássica newtoniana
 *
 * Todas as funções são puras (sem efeitos colaterais).
 */

import { G_STD, MS_TO_KMH } from './constants';

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS DE ENTRADA E SAÍDA
// ─────────────────────────────────────────────────────────────────────────────

export interface TrackSegment {
  /** Distância do trecho em metros */
  distanceM: number;
  /** Coeficiente de atrito adimensional */
  mu: number;
  /** Inclinação em % (positiva = aclive, negativa = declive). Opcional. */
  gradePercent?: number;
}

export interface SpeedRange {
  minKmh: number;
  centralKmh: number;
  maxKmh: number;
}

export interface FrictionResult extends SpeedRange {
  /** Energia dissipada total em J/kg (J por kg de massa) */
  energyJpKg: number;
  /** Número de trechos usados */
  segmentCount: number;
  /** Detalhes por trecho para auditoria */
  segments: SegmentDetail[];
}

export interface SegmentDetail {
  distanceM: number;
  muMin: number;
  muCentral: number;
  muMax: number;
  gradePercent: number;
  energyMinJpKg: number;
  energyCentralJpKg: number;
  energyMaxJpKg: number;
}

export interface StoppingDistanceResult {
  /** Distância de reação (m) */
  reactionDistM: number;
  /** Distância de frenagem (m) */
  brakingDistM: number;
  /** Distância total (m) */
  totalDistM: number;
}

export interface SpeedFromDistanceResult extends SpeedRange {
  availableDistM: number;
  mu: number;
  reactionTimeS: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSÕES
// ─────────────────────────────────────────────────────────────────────────────

/** Converte m/s para km/h */
export function msToKmh(ms: number): number {
  return ms * MS_TO_KMH;
}

/** Converte km/h para m/s */
export function kmhToMs(kmh: number): number {
  return kmh / MS_TO_KMH;
}

// ─────────────────────────────────────────────────────────────────────────────
// A. DISSIPAÇÃO DE ENERGIA POR ATRITO — TRECHO ÚNICO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula a velocidade inicial a partir da dissipação de energia por atrito
 * em um único trecho plano.
 *
 * Fórmula: v = sqrt(2 × g × µ × d)
 *
 * Fonte: M_015, Capítulo de Dinâmica de Acidentes (eq. de energia cinética/atrito)
 *
 * @param mu   coeficiente de atrito adimensional
 * @param distM distância em metros
 * @returns velocidade em m/s
 */
export function frictionSpeedMs(mu: number, distM: number): number {
  if (mu <= 0 || distM <= 0) return 0;
  return Math.sqrt(2 * G_STD * mu * distM);
}

// ─────────────────────────────────────────────────────────────────────────────
// B. CORREÇÃO DE INCLINAÇÃO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula o fator efetivo de desaceleração considerando inclinação da via.
 *
 * Em aclive (grade > 0): a gravidade auxilia a frenagem → µ_eff = µ + sin(θ) ≈ µ + tan(θ)
 * Em declive (grade < 0): a gravidade opõe-se à frenagem → µ_eff = µ - |sin(θ)|
 *
 * Usa aproximação: sin(θ) ≈ tan(θ) = grade/100 para ângulos pequenos (< 15°).
 *
 * @param mu             coeficiente de atrito base
 * @param gradePercent   inclinação em %
 * @returns fator efetivo de desaceleração
 */
export function effectiveMu(mu: number, gradePercent: number): number {
  const sinTheta = gradePercent / 100; // aproximação válida para grades típicas de via
  return Math.max(0.001, mu + sinTheta);
}

// ─────────────────────────────────────────────────────────────────────────────
// C. DISSIPAÇÃO POR ENERGIA — MÚLTIPLOS TRECHOS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula velocidade inicial a partir de múltiplos trechos de vestígio
 * usando conservação de energia (soma de dissipações).
 *
 * Energia cinética inicial = Σ (µ_eff_i × g × d_i) para cada trecho i.
 * v = sqrt(2 × Σ (µ_eff_i × g × d_i))
 *
 * Fonte: M_015 — Método de dissipação sequencial de energia
 *
 * Para cada trecho, aceita range [muMin, muCentral, muMax].
 *
 * @param segments  lista de trechos com distância, mu range e inclinação
 */
export function multiSegmentFrictionSpeed(
  segments: Array<{
    distanceM: number;
    muMin: number;
    muCentral: number;
    muMax: number;
    gradePercent?: number;
  }>
): FrictionResult {
  if (segments.length === 0) {
    return {
      minKmh: 0, centralKmh: 0, maxKmh: 0,
      energyJpKg: 0, segmentCount: 0, segments: []
    };
  }

  let energyMin = 0;
  let energyCentral = 0;
  let energyMax = 0;

  const details: SegmentDetail[] = [];

  for (const seg of segments) {
    const grade = seg.gradePercent ?? 0;
    const effMin = effectiveMu(seg.muMin, grade);
    const effCentral = effectiveMu(seg.muCentral, grade);
    const effMax = effectiveMu(seg.muMax, grade);

    const eMin = effMin * G_STD * seg.distanceM;
    const eCentral = effCentral * G_STD * seg.distanceM;
    const eMax = effMax * G_STD * seg.distanceM;

    energyMin += eMin;
    energyCentral += eCentral;
    energyMax += eMax;

    details.push({
      distanceM: seg.distanceM,
      muMin: seg.muMin,
      muCentral: seg.muCentral,
      muMax: seg.muMax,
      gradePercent: grade,
      energyMinJpKg: eMin,
      energyCentralJpKg: eCentral,
      energyMaxJpKg: eMax,
    });
  }

  // v = sqrt(2 × ΣE)
  const vMinMs = Math.sqrt(2 * energyMin);
  const vCentralMs = Math.sqrt(2 * energyCentral);
  const vMaxMs = Math.sqrt(2 * energyMax);

  return {
    minKmh: parseFloat(msToKmh(vMinMs).toFixed(1)),
    centralKmh: parseFloat(msToKmh(vCentralMs).toFixed(1)),
    maxKmh: parseFloat(msToKmh(vMaxMs).toFixed(1)),
    energyJpKg: energyCentral,
    segmentCount: segments.length,
    segments: details,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// G. DISTÂNCIA DE REAÇÃO E PARADA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula distâncias de reação, frenagem e parada total.
 *
 * d_reação  = v × t_reação
 * d_frenagem = v² / (2 × g × µ_eff)
 * d_total   = d_reação + d_frenagem
 *
 * Fonte: M_015 — Equações de dinâmica de frenagem
 *
 * @param speedKmh     velocidade inicial em km/h
 * @param mu           coeficiente de atrito
 * @param reactionTimeS tempo de reação em segundos
 * @param gradePercent  inclinação em %
 */
export function stoppingDistance(
  speedKmh: number,
  mu: number,
  reactionTimeS: number,
  gradePercent = 0
): StoppingDistanceResult {
  const vMs = kmhToMs(speedKmh);
  const effMu = effectiveMu(mu, gradePercent);

  const reactionDistM = vMs * reactionTimeS;
  const brakingDistM = (vMs * vMs) / (2 * G_STD * effMu);
  const totalDistM = reactionDistM + brakingDistM;

  return {
    reactionDistM: parseFloat(reactionDistM.toFixed(2)),
    brakingDistM: parseFloat(brakingDistM.toFixed(2)),
    totalDistM: parseFloat(totalDistM.toFixed(2)),
  };
}

/**
 * Cálculo inverso: velocidade máxima possível dado distância total disponível.
 *
 * d_total = v × t_r + v² / (2 × g × µ)
 * Resolvendo: 0 = v²/(2gµ) + v×t_r - d_total
 * v = (-t_r + sqrt(t_r² + 4×d/(2gµ))) / (2/(2gµ))
 *
 * @param availableDistM  distância disponível para parada (m)
 * @param mu              coeficiente de atrito
 * @param reactionTimeS   tempo de reação (s)
 * @param gradePercent    inclinação em %
 */
export function speedFromAvailableDistance(
  availableDistM: number,
  mu: number,
  reactionTimeS: number,
  gradePercent = 0
): SpeedFromDistanceResult {
  const effMu = effectiveMu(mu, gradePercent);

  const a = 1 / (2 * G_STD * effMu); // coef de v²
  const b = reactionTimeS;            // coef de v
  const c = -availableDistM;          // termo independente

  // Fórmula de Bhaskara: v = (-b + sqrt(b² - 4ac)) / (2a)
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return { minKmh: 0, centralKmh: 0, maxKmh: 0, availableDistM, mu, reactionTimeS };

  const vMs = (-b + Math.sqrt(discriminant)) / (2 * a);
  const vKmh = msToKmh(Math.max(0, vMs));

  return {
    minKmh: parseFloat((vKmh * 0.92).toFixed(1)),
    centralKmh: parseFloat(vKmh.toFixed(1)),
    maxKmh: parseFloat((vKmh * 1.08).toFixed(1)),
    availableDistM,
    mu,
    reactionTimeS,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// IFT — Índice de Fidedignidade Técnica
// ─────────────────────────────────────────────────────────────────────────────

export interface IFTInput {
  /** Qualidade do método de medição: 0–100 */
  measurementQuality: number;
  /** Qualidade do parâmetro técnico: 0–100 */
  parameterQuality: number;
  /** Preservação da cena: 0–100 */
  preservation: number;
  /** Completude dos dados: 0–100 */
  completeness: number;
  /** Rastreabilidade/documentação: 0–100 */
  traceability: number;
}

/**
 * Calcula o IFT — Índice de Fidedignidade Técnica (0–100).
 *
 * Pesos:
 * - Qualidade da medição:  30%
 * - Qualidade do parâmetro: 25%
 * - Preservação:           15%
 * - Completude:            15%
 * - Rastreabilidade:       15%
 *
 * ATENÇÃO: índice interno de qualidade dos dados. Não representa
 * probabilidade estatística de acerto.
 */
export function calculateIFT(input: IFTInput): number {
  const score =
    input.measurementQuality * 0.30 +
    input.parameterQuality   * 0.25 +
    input.preservation       * 0.15 +
    input.completeness       * 0.15 +
    input.traceability       * 0.15;
  return parseFloat(Math.min(100, Math.max(0, score)).toFixed(1));
}

export type IFTClassification =
  | 'muito-elevada'
  | 'elevada'
  | 'moderada'
  | 'baixa'
  | 'insuficiente';

export function classifyIFT(ift: number): IFTClassification {
  if (ift >= 90) return 'muito-elevada';
  if (ift >= 75) return 'elevada';
  if (ift >= 60) return 'moderada';
  if (ift >= 40) return 'baixa';
  return 'insuficiente';
}

// ─────────────────────────────────────────────────────────────────────────────
// ICA — Índice de Convergência Analítica
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula o ICA — Índice de Convergência Analítica (0–100).
 *
 * Requer pelo menos 2 métodos independentes quantitativos.
 * Compara sobreposição dos intervalos [min, max].
 *
 * Se os intervalos se sobrepõem completamente → ICA alto.
 * Se não há sobreposição → ICA baixo.
 *
 * Dois vestígios do mesmo tipo não são considerados métodos independentes.
 *
 * ATENÇÃO: Não representa probabilidade científica de acerto.
 */
export function calculateICA(
  methods: Array<{ minKmh: number; centralKmh: number; maxKmh: number }>
): number | null {
  if (methods.length < 2) return null;

  // Calcula sobreposição par a par e toma média
  let totalScore = 0;
  let count = 0;

  for (let i = 0; i < methods.length; i++) {
    for (let j = i + 1; j < methods.length; j++) {
      const a = methods[i];
      const b = methods[j];

      const overlapMin = Math.max(a.minKmh, b.minKmh);
      const overlapMax = Math.min(a.maxKmh, b.maxKmh);

      if (overlapMax < overlapMin) {
        // Sem sobreposição: pontuação baseada na diferença relativa
        const gap = overlapMin - overlapMax;
        const refRange = Math.max(a.maxKmh - a.minKmh, b.maxKmh - b.minKmh, 1);
        const penalty = Math.min(100, (gap / refRange) * 100);
        totalScore += Math.max(0, 100 - penalty * 2);
      } else {
        // Com sobreposição: pontuação baseada na razão de sobreposição
        const overlapSize = overlapMax - overlapMin;
        const unionSize = Math.max(a.maxKmh, b.maxKmh) - Math.min(a.minKmh, b.minKmh);
        const ratio = unionSize > 0 ? overlapSize / unionSize : 1;
        totalScore += ratio * 100;
      }
      count++;
    }
  }

  if (count === 0) return null;
  return parseFloat(Math.min(100, Math.max(0, totalScore / count)).toFixed(1));
}

// ─────────────────────────────────────────────────────────────────────────────
// IAE — Índice de Assertividade da Estimativa
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula o IAE — Índice de Assertividade da Estimativa.
 *
 * IAE = 0,60 × IFT + 0,40 × ICA
 *
 * Somente calculável quando ICA estiver disponível (≥ 2 métodos independentes).
 *
 * ATENÇÃO: índice técnico interno de robustez. Não representa probabilidade
 * científica de acerto.
 */
export function calculateIAE(ift: number, ica: number | null): number | null {
  if (ica === null) return null;
  const iae = 0.60 * ift + 0.40 * ica;
  return parseFloat(Math.min(100, Math.max(0, iae)).toFixed(1));
}

// ─────────────────────────────────────────────────────────────────────────────
// AGREGAÇÃO DE INTERVALO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Combina múltiplos resultados de métodos em um único intervalo consensual.
 * min = menor mínimo, max = maior máximo, central = média dos centrais.
 */
export function aggregateSpeedRanges(ranges: SpeedRange[]): SpeedRange | null {
  if (ranges.length === 0) return null;
  const minKmh = Math.min(...ranges.map(r => r.minKmh));
  const maxKmh = Math.max(...ranges.map(r => r.maxKmh));
  const centralKmh = parseFloat(
    (ranges.reduce((s, r) => s + r.centralKmh, 0) / ranges.length).toFixed(1)
  );
  return { minKmh, centralKmh, maxKmh };
}
