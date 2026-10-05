import type { ForensicAnalysis } from '../types/analysis';
import { computeMethods, computeIndices, generateTechnicalSummary } from '../engine/methodsEngine';

export function createDemoAnalysis(): ForensicAnalysis {
  const now = new Date().toISOString();
  const analysis: ForensicAnalysis = {
    id: crypto.randomUUID(), title: 'Caso demonstrativo — frenagem de V1', date: new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' }), createdAt: now, updatedAt: now, isTutorial: true,
    availableElements: ['frenagem', 'danos'],
    vehicles: [{ id: 'V1', type: 'automovel', tireCondition: 'usados', tireInflation: 'nao-determinada', abs: 'nao-determinado', brakeFailure: 'nao-determinada' }],
    road: { surface: 'asfalto', condition: 'seca', geometry: 'reta', profile: 'nivel', gradePercent: 0, dayPhase: 'dia', visibility: 'boa', sceneCondition: 'parcialmente-preservado' },
    tracks: [{ id: 'demo-track', vehicleId: 'V1', type: 'frenagem', distanceM: 42.3, surface: 'asfalto', condition: 'seca', contactMode: 'pneus', moment: 'pre-impacto', measurementMethod: 'distanciometro', dataSource: 'medicao-direta' }],
    damages: [{ vehicleId: 'V1', level: 'media' }], electronicRecords: [], methods: [],
  };
  analysis.methods = computeMethods(analysis);
  Object.assign(analysis, computeIndices(analysis, analysis.methods));
  analysis.technicalSummary = generateTechnicalSummary(analysis, analysis.methods, analysis.ift!, analysis.ica!, analysis.iae!);
  return analysis;
}
