/**
 * Vetor Forense — Motor de Métodos
 *
 * Identifica métodos disponíveis e executa cálculos
 * com base nos dados da análise.
 */

import {
  multiSegmentFrictionSpeed,
  calculateIFT,
  calculateICA,
  calculateIAE,
  stoppingDistance,
} from './calculator';
import {
  findFrictionParameters,
  REACTION_TIMES,
} from '../data/technicalBase';
import type { ForensicAnalysis, MethodResult, IFTInput, TrackSegment } from '../types/analysis';

// ─────────────────────────────────────────────────────────────────────────────
// QUALIDADE DE MEDIÇÃO
// ─────────────────────────────────────────────────────────────────────────────

const MEASUREMENT_QUALITY: Record<string, number> = {
  'topografia': 95,
  'gnss': 90,
  'distanciometro': 85,
  'fotogrametria': 85,
  'video-calibrado': 80,
  'trena': 75,
  'croqui-dimensionado': 70,
  'fotografia-escala': 65,
  'estimativa-visual': 30,
  'outro': 50,
};

const PRESERVATION_QUALITY: Record<string, number> = {
  'preservado': 100,
  'parcialmente-preservado': 60,
  'desfeito': 20,
  'nao-determinado': 40,
};

function getMeasurementQuality(tracks: TrackSegment[]): number {
  if (tracks.length === 0) return 50;
  const avg = tracks.reduce((s, t) => s + (MEASUREMENT_QUALITY[t.measurementMethod] ?? 50), 0) / tracks.length;
  return avg;
}

function getParameterQuality(tracks: TrackSegment[]): number {
  // Parâmetro da base técnica = 80+, override externo = 50, sem parâmetro = 30
  if (tracks.length === 0) return 30;
  const scores = tracks.map(t => {
    if (t.frictionOverride) return 50;
    if (t.parameterRefId) return 85;
    return 40;
  });
  return scores.reduce((s, v) => s + v, 0) / scores.length;
}

// ─────────────────────────────────────────────────────────────────────────────
// PARÂMETRO MU PARA TRECHO
// ─────────────────────────────────────────────────────────────────────────────

function getMuForTrack(track: TrackSegment, analysis: ForensicAnalysis): {
  muMin: number; muCentral: number; muMax: number;
  source: string; paramId?: string;
} {
  // Override manual tem prioridade
  if (track.frictionOverride) {
    return {
      muMin: track.frictionOverride.muMin,
      muCentral: track.frictionOverride.muCentral,
      muMax: track.frictionOverride.muMax,
      source: `[Externo] ${track.frictionOverride.source}`,
    };
  }

  const vehicle = analysis.vehicles.find(v => v.id === track.vehicleId);

  const params = findFrictionParameters({
    surface: track.surface,
    condition: track.condition,
    vehicleType: vehicle?.type ?? null,
    tireCondition: vehicle?.tireCondition ?? null,
    contactMode: track.contactMode,
  });

  if (params.length > 0) {
    const p = params[0];
    return {
      muMin: p.muMin,
      muCentral: p.muCentral,
      muMax: p.muMax,
      source: `${p.source} — ${p.chapter}`,
      paramId: p.id,
    };
  }

  return { muMin: 0, muCentral: 0, muMax: 0, source: 'Parâmetro não cadastrado.' };
}

// ─────────────────────────────────────────────────────────────────────────────
// IDENTIFICAR E CALCULAR MÉTODOS
// ─────────────────────────────────────────────────────────────────────────────

export function computeMethods(analysis: ForensicAnalysis): MethodResult[] {
  const results: MethodResult[] = [];

  // ── MÉTODO A: Frenagem / Derrapagem / Arrastamento / Trilha ──────────────
  const frictionTracks = analysis.tracks.filter(t =>
    ['frenagem', 'derrapagem', 'arrastamento', 'trilha', 'friccao', 'sulcagem'].includes(t.type)
  );

  // Agrupa por veículo
  const vehicleIds = [...new Set(frictionTracks.map(t => t.vehicleId))];

  for (const vid of vehicleIds) {
    const vTracks = frictionTracks.filter(t => t.vehicleId === vid);
    const vehicle = analysis.vehicles.find(v => v.id === vid);
    const vehicleLabel = vehicle ? `V${vehicle.id}` : vid;

    const hasDistance = vTracks.every(t => t.distanceM > 0);
    const hasMu = vTracks.some(t => {
      const mu = getMuForTrack(t, analysis);
      return mu.muCentral > 0;
    });

    if (!hasDistance || !hasMu) {
      results.push({
        id: `friction-${vid}`,
        name: `Dissipação por atrito — ${vehicleLabel}`,
        description: 'Estimativa de velocidade pela dissipação de energia cinética em vestígios de frenagem/deslizamento.',
        status: 'insuficiente',
        isIndependent: true,
        availabilityReason: !hasDistance
          ? 'Distância não informada para um ou mais trechos.'
          : 'Parâmetro de atrito não disponível.',
        qualityScore: 0,
      });
      continue;
    }

    // Prepara segmentos para o motor
    const segments = vTracks.map(t => {
      const mu = getMuForTrack(t, analysis);
      return {
        distanceM: t.distanceM,
        muMin: mu.muMin || 0.001,
        muCentral: mu.muCentral || 0.001,
        muMax: mu.muMax || 0.001,
        gradePercent: analysis.road.gradePercent ?? 0,
      };
    });

    const result = multiSegmentFrictionSpeed(segments);
    const mu = getMuForTrack(vTracks[0], analysis);
    const totalDist = vTracks.reduce((s, t) => s + t.distanceM, 0);

    const variables: Record<string, string | number> = {
      'g (m/s²)': 9.80665,
      'Trechos': segments.length,
      'Distância total (m)': totalDist.toFixed(2),
      'µ central adotado': mu.muCentral,
      'Inclinação (%)': analysis.road.gradePercent ?? 0,
    };

    results.push({
      id: `friction-${vid}`,
      name: `Dissipação por atrito — ${vehicleLabel}`,
      description: `Velocidade estimada a partir de ${vTracks.length} trecho(s) de vestígio de ${vehicleLabel}.`,
      status: 'suficiente',
      isIndependent: true,
      minKmh: result.minKmh,
      centralKmh: result.centralKmh,
      maxKmh: result.maxKmh,
      availabilityReason: 'Dados suficientes para cálculo.',
      qualityScore: getMeasurementQuality(vTracks),
      parameterRef: mu.source,
      parameterSource: mu.paramId ? 'técnico' : 'externo',
      formula: 'v = √(2 × Σ(µ_eff_i × g × d_i))',
      variables,
    });
  }

  // ── MÉTODO B: Motocicleta tombada ─────────────────────────────────────────
  const motoTracks = analysis.tracks.filter(t => t.type === 'motocicleta-tombada');
  if (motoTracks.length > 0) {
    const moto = motoTracks[0];
    const mu = getMuForTrack(moto, analysis);
    const hasData = moto.distanceM > 0 && mu.muCentral > 0;

    if (hasData) {
      const result = multiSegmentFrictionSpeed([{
        distanceM: moto.distanceM,
        muMin: mu.muMin,
        muCentral: mu.muCentral,
        muMax: mu.muMax,
        gradePercent: analysis.road.gradePercent ?? 0,
      }]);

      results.push({
        id: 'moto-tombada',
        name: 'Deslizamento — Motocicleta tombada',
        description: 'Estimativa de velocidade pelo deslizamento da motocicleta tombada.',
        status: 'suficiente',
        isIndependent: true,
        minKmh: result.minKmh,
        centralKmh: result.centralKmh,
        maxKmh: result.maxKmh,
        availabilityReason: 'Dados suficientes.',
        qualityScore: MEASUREMENT_QUALITY[moto.measurementMethod] ?? 50,
        parameterRef: mu.source,
        formula: 'v = √(2 × µ_eff × g × d)',
        variables: {
          'µ min': mu.muMin,
          'µ central': mu.muCentral,
          'µ max': mu.muMax,
          'd (m)': moto.distanceM,
          'g (m/s²)': 9.80665,
        },
      });
    } else {
      results.push({
        id: 'moto-tombada',
        name: 'Deslizamento — Motocicleta tombada',
        description: 'Estimativa de velocidade pelo deslizamento da motocicleta tombada.',
        status: 'insuficiente',
        isIndependent: true,
        availabilityReason: !hasData ? 'Distância ou parâmetro de atrito não disponível.' : '',
        qualityScore: 0,
      });
    }
  }

  // ── MÉTODO C: Veículo sobre teto ──────────────────────────────────────────
  const tetoTracks = analysis.tracks.filter(t => t.type === 'sobre-teto');
  if (tetoTracks.length > 0) {
    const teto = tetoTracks[0];
    const mu = getMuForTrack(teto, analysis);

    if (teto.distanceM > 0 && mu.muCentral > 0) {
      const result = multiSegmentFrictionSpeed([{
        distanceM: teto.distanceM,
        muMin: mu.muMin,
        muCentral: mu.muCentral,
        muMax: mu.muMax,
        gradePercent: analysis.road.gradePercent ?? 0,
      }]);

      results.push({
        id: 'sobre-teto',
        name: 'Deslizamento — Veículo sobre teto',
        description: 'Estimativa de velocidade pelo deslizamento do veículo sobre o teto.',
        status: 'suficiente',
        isIndependent: true,
        minKmh: result.minKmh,
        centralKmh: result.centralKmh,
        maxKmh: result.maxKmh,
        availabilityReason: 'Dados suficientes.',
        qualityScore: MEASUREMENT_QUALITY[teto.measurementMethod] ?? 50,
        parameterRef: mu.source,
        formula: 'v = √(2 × µ_eff × g × d)',
        variables: { 'µ central': mu.muCentral, 'd (m)': teto.distanceM },
      });
    }
  }

  // ── MÉTODO D: Distância disponível para parada ────────────────────────────
  const hasStoppingDist = analysis.availableElements.includes('distancia-para-parada');
  if (hasStoppingDist && analysis.vehicles.length > 0) {
    const firstVehicle = analysis.vehicles[0];
    const relevantTracks = analysis.tracks.filter(t => t.vehicleId === firstVehicle.id);

    if (relevantTracks.length > 0) {
      const mu = getMuForTrack(relevantTracks[0], analysis);
      if (mu.muCentral > 0) {
        const totalDist = relevantTracks.reduce((s, t) => s + t.distanceM, 0);
        if (totalDist > 0) {
          const sd = stoppingDistance(
            80, // velocidade arbitrária — o método inverso usaria a distância disponível
            mu.muCentral,
            REACTION_TIMES.central.value
          );

          results.push({
            id: 'stopping-distance',
            name: 'Distância disponível para parada',
            description: 'Análise auxiliar da distância necessária para parada em condições dadas.',
            status: 'auxiliar',
            isIndependent: false,
            availabilityReason: 'Indicador auxiliar. Requer distância disponível explícita.',
            qualityScore: 60,
            parameterRef: mu.source,
            formula: 'd = v×t_r + v²/(2×g×µ)',
            variables: {
              't_r (s)': REACTION_TIMES.central.value,
              'µ': mu.muCentral,
              'd_frenagem (m)': sd.brakingDistM,
              'd_reação (m)': sd.reactionDistM,
            },
          });
        }
      }
    }
  }

  // ── MÉTODO E: Danos ───────────────────────────────────────────────────────
  if (analysis.damages.length > 0) {
    results.push({
      id: 'damages',
      name: 'Danos',
      description: 'Avaliação qualitativa baseada nos danos observados.',
      status: 'auxiliar',
      isIndependent: false,
      availabilityReason: 'Indicador auxiliar. Não deve ser usado isoladamente para estimativa de velocidade.',
      qualityScore: 40,
      formula: 'Classificação qualitativa — indicador auxiliar',
    });
  }

  // ── MÉTODO F: Registro eletrônico ─────────────────────────────────────────
  const electronicWithSpeed = analysis.electronicRecords.filter(r => r.speedKmh != null);
  for (const rec of electronicWithSpeed) {
    results.push({
      id: `electronic-${rec.id}`,
      name: `Registro eletrônico — ${rec.type.toUpperCase()}`,
      description: `Velocidade registrada por ${rec.type} no momento relevante.`,
      status: 'suficiente',
      isIndependent: true,
      minKmh: (rec.speedKmh ?? 0) * 0.97,
      centralKmh: rec.speedKmh ?? 0,
      maxKmh: (rec.speedKmh ?? 0) * 1.03,
      availabilityReason: 'Dado eletrônico disponível.',
      qualityScore:
        rec.integrity === 'integro' ? 95
        : rec.integrity === 'parcialmente-comprometido' ? 65
        : 30,
      formula: 'Leitura direta do dispositivo eletrônico.',
    });
  }

  // ── Quantidade de movimento (não implementado nesta versão) ───────────────
  const hasTwoVehicles = analysis.vehicles.length >= 2;
  results.push({
    id: 'momentum',
    name: 'Quantidade de movimento',
    description: 'Análise da dinâmica de colisão usando conservação do momentum.',
    status: 'insuficiente',
    isIndependent: true,
    availabilityReason: hasTwoVehicles
      ? 'Massa e posição final necessários. Módulo avançado não implementado nesta versão.'
      : 'Requer pelo menos dois veículos com massa conhecida.',
    qualityScore: 0,
  });

  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULAR ÍNDICES
// ─────────────────────────────────────────────────────────────────────────────

export function computeIndices(
  analysis: ForensicAnalysis,
  methods: MethodResult[]
): { ift: number; ica: number | null; iae: number | null; iftInput: IFTInput } {
  const frictionTracks = analysis.tracks;

  const measurementQuality = getMeasurementQuality(frictionTracks);
  const parameterQuality = getParameterQuality(frictionTracks);
  const preservation = PRESERVATION_QUALITY[analysis.road.sceneCondition] ?? 40;
  const completeness = computeCompleteness(analysis);
  const traceability = computeTraceability(frictionTracks);

  const iftInput: IFTInput = {
    measurementQuality,
    parameterQuality,
    preservation,
    completeness,
    traceability,
  };

  const ift = calculateIFT(iftInput);

  // ICA: somente métodos independentes quantitativos
  const independentMethods = methods.filter(
    m => m.isIndependent && m.status === 'suficiente' && m.centralKmh !== undefined
  );

  const ica = independentMethods.length >= 2
    ? calculateICA(independentMethods.map(m => ({
        minKmh: m.minKmh ?? 0,
        centralKmh: m.centralKmh ?? 0,
        maxKmh: m.maxKmh ?? 0,
      })))
    : null;

  const iae = calculateIAE(ift, ica);

  return { ift, ica, iae, iftInput };
}

function computeCompleteness(analysis: ForensicAnalysis): number {
  let score = 0;
  let max = 0;

  max += 20; if (analysis.vehicles.length > 0) score += 20;
  max += 15; if (analysis.road.surface) score += 15;
  max += 20; if (analysis.tracks.length > 0) score += 20;
  max += 10; if (analysis.road.gradePercent !== undefined) score += 10;
  max += 15; if (analysis.vehicles.some(v => v.tireCondition !== 'nao-determinado')) score += 15;
  max += 10; if (analysis.vehicles.some(v => v.abs !== 'nao-determinado')) score += 10;
  max += 10; if (analysis.damages.length > 0 || analysis.electronicRecords.length > 0) score += 10;

  return max > 0 ? (score / max) * 100 : 0;
}

function computeTraceability(tracks: TrackSegment[]): number {
  if (tracks.length === 0) return 40;
  const scores = tracks.map(t => {
    let s = 0;
    if (t.measurementMethod !== 'estimativa-visual') s += 40;
    if (t.dataSource === 'medicao-direta') s += 30;
    else if (t.dataSource === 'croqui') s += 20;
    else if (t.dataSource === 'fotografia' || t.dataSource === 'video') s += 25;
    else s += 10;
    if (t.parameterRefId) s += 30;
    else s += 10;
    return Math.min(100, s);
  });
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXTO TÉCNICO
// ─────────────────────────────────────────────────────────────────────────────

export function generateTechnicalSummary(
  analysis: ForensicAnalysis,
  methods: MethodResult[],
  ift: number,
  ica: number | null,
  _iae: number | null
): string {
  const independentMethods = methods.filter(
    m => m.isIndependent && m.status === 'suficiente' && m.centralKmh !== undefined
  );

  if (independentMethods.length === 0) {
    return 'Dados insuficientes para geração de estimativa de velocidade. Verifique os vestígios e parâmetros informados.';
  }

  const allMins = independentMethods.map(m => m.minKmh ?? 0);
  const allMaxs = independentMethods.map(m => m.maxKmh ?? 0);
  const allCentral = independentMethods.map(m => m.centralKmh ?? 0);

  const globalMin = Math.min(...allMins).toFixed(0);
  const globalMax = Math.max(...allMaxs).toFixed(0);
  const globalCentral = (allCentral.reduce((a, b) => a + b, 0) / allCentral.length).toFixed(0);

  const vehicleLabel = analysis.vehicles[0]?.id ?? 'V1';
  const methodCount = independentMethods.length;

  let summary = `Com base nos dados informados e nos métodos disponíveis, a velocidade de ${vehicleLabel} no início da fase analisada foi estimada entre ${globalMin} e ${globalMax} km/h, com valor central de referência de ${globalCentral} km/h. `;
  summary += `O índice de fidedignidade técnica (IFT) foi de ${ift.toFixed(0)}%. `;

  if (ica !== null) {
    summary += `O índice de convergência analítica (ICA) foi de ${ica.toFixed(0)}%, calculado com base em ${methodCount} método(s) independente(s). `;
  } else {
    summary += `O ICA não é aferível com base em apenas ${methodCount} método independente. `;
  }

  summary += `A estimativa está condicionada às premissas e limitações apresentadas na análise.`;

  return summary;
}
