import { findFrictionParameters } from '../data/technicalBase';
import type { AnalysisIssue, ForensicAnalysis, TrackSegment } from '../types/analysis';
import { TRACK_TYPE_LABELS } from '../utils/labels';

export function resolveTrack(track: TrackSegment, analysis: ForensicAnalysis) {
  const vehicle = analysis.vehicles.find(v => v.id === track.vehicleId);
  const candidates = findFrictionParameters({ surface: track.surface, condition: track.condition,
    contactMode: track.contactMode, vehicleType: vehicle?.type, tireCondition: vehicle?.tireCondition });
  const parameter = candidates.find(p => p.id === track.parameterRefId) ?? (candidates.length === 1 ? candidates[0] : undefined);
  const mu = track.frictionOverride ?? parameter;
  const issues: AnalysisIssue[] = [];
  const add = (field: string, message: string, step: AnalysisIssue['step'] = 'vestigios') =>
    issues.push({ field, message, step, trackId: track.id });
  const label = `O trecho de ${TRACK_TYPE_LABELS[track.type]?.toLowerCase() ?? 'vestígio'} de ${track.vehicleId || 'veículo não associado'}`;
  if (!vehicle) add('vehicleId', `${label} precisa de um veículo cadastrado.`, analysis.vehicles.length ? 'vestigios' : 'veiculos');
  if (!track.type) add('type', 'Falta informar: tipo de vestígio.');
  if (!Number.isFinite(track.distanceM) || track.distanceM <= 0) add('distanceM', `${label} não possui distância válida. Informe a distância medida para habilitar o cálculo.`);
  if (!track.surface) add('surface', 'Falta informar: superfície do vestígio.');
  if (!track.condition) add('condition', 'Falta informar: condição da superfície.');
  if (!track.contactMode) add('contactMode', 'Falta informar: forma de contato.');
  const expected = track.type === 'motocicleta-tombada' ? 'motocicleta-tombada' : track.type === 'sobre-teto' ? 'teto' : undefined;
  if (expected && track.contactMode !== expected) add('contactMode', `Selecione o contato ${expected} para este tipo de vestígio.`);
  if (track.type === 'motocicleta-tombada' && vehicle && !['motocicleta', 'motoneta', 'ciclomotor'].includes(vehicle.type)) add('vehicleId', 'Associe o vestígio de motocicleta tombada a uma motocicleta, motoneta ou ciclomotor.');
  if (track.frictionOverride) {
    const m = track.frictionOverride;
    if (![m.muMin, m.muCentral, m.muMax].every(v => Number.isFinite(v) && v > 0) || m.muMin > m.muCentral || m.muCentral > m.muMax)
      add('frictionOverride', 'Informe coeficientes positivos na ordem µ mínimo ≤ µ central ≤ µ máximo.');
    if (!m.source.trim() || !m.justification.trim()) add('frictionOverride', 'Falta informar fonte e justificativa do coeficiente manual.');
  } else if (track.surface && track.condition && track.contactMode && !parameter) {
    add('parameterRefId', candidates.length ? 'Há mais de um coeficiente compatível. Escolha o parâmetro conforme as condições observadas.' : 'Nenhum coeficiente compatível foi encontrado na base técnica. Informe um coeficiente manual com fonte e justificativa.');
  }
  const grade = analysis.road.gradePercent ?? 0;
  if (!Number.isFinite(grade) || (mu && mu.muMin + grade / 100 <= 0)) add('gradePercent', 'Revise a inclinação e o atrito: a desaceleração efetiva deve ser positiva.', 'via');
  return { candidates, parameter, mu, issues };
}

export function hasQuantitativeResult(methods: import('../types/analysis').MethodResult[]) {
  return methods.some(m => m.status === 'suficiente' && m.isIndependent && Number.isFinite(m.centralKmh));
}
