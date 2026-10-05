import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createDemoAnalysis } from '../data/demoCase';
import { computeMethods } from './methodsEngine';
import { hasQuantitativeResult, resolveTrack } from './trackValidation';
import { multiSegmentFrictionSpeed } from './calculator';
import { WizardStepMetodos } from '../components/wizard/WizardStepMetodos';
import { WizardStepVestigios } from '../components/wizard/WizardStepVestigios';
import { VFTutorial } from '../components/VFTutorial';
import { saveAnalysis, loadAnalyses } from '../store/localStore';

const markup = (a: ReturnType<typeof createDemoAnalysis>) => renderToStaticMarkup(<WizardStepMetodos analysis={a} onChange={() => {}} onCorrect={() => {}} />);
afterEach(() => vi.unstubAllGlobals());

describe('Fluxo Vetor Forense — cenários obrigatórios', () => {
  it('A: automóvel, frenagem, distância e asfalto seco habilitam dissipação', () => {
    const a = createDemoAnalysis();
    const m = computeMethods(a).find(m => m.id === 'friction-V1')!;
    expect(m.status).toBe('suficiente');
    expect(m.name).not.toContain('VV1');
    expect(m.centralKmh).toBeCloseTo(3.6 * Math.sqrt(2 * 9.80665 * 0.7 * 42.3), 1);
    expect(markup(a)).toContain('Dados considerados');
    expect(markup(a)).toContain('Aplicável');
  });
  it('B: sem distância, explica a pendência e fornece destino de correção', () => {
    const a = createDemoAnalysis(); a.tracks[0].distanceM = 0;
    const methods = computeMethods(a);
    expect(hasQuantitativeResult(methods)).toBe(false);
    const m = methods.find(m => m.id === 'friction-V1')!;
    expect(m.status).toBe('insuficiente');
    expect(m.availabilityReason).toContain('não possui distância válida');
    expect(m.issues?.[0]).toMatchObject({ field: 'distanceM', step: 'vestigios', trackId: 'demo-track' });
    expect(markup(a)).toContain('Corrigir agora');
  });
  it('C: motocicleta tombada usa coeficiente específico e todos os trechos', () => {
    const a = createDemoAnalysis(); a.vehicles[0].type = 'motocicleta';
    a.tracks[0].type = 'motocicleta-tombada'; a.tracks[0].contactMode = 'motocicleta-tombada';
    a.tracks.push({ ...a.tracks[0], id: 'segundo', distanceM: 10 });
    const m = computeMethods(a).find(m => m.id === 'moto-tombada-V1')!;
    expect(m.status).toBe('suficiente');
    const mu = resolveTrack(a.tracks[0], a).mu!;
    expect(m.centralKmh).toBe(multiSegmentFrictionSpeed([{ distanceM: 52.3, muMin: mu.muMin, muCentral: mu.muCentral, muMax: mu.muMax }]).centralKmh);
  });
  it('D: quantidade de movimento é indisponível independentemente dos dados', () => {
    const a = createDemoAnalysis(); a.vehicles.push({ ...a.vehicles[0], id: 'V2', massKg: 1200 });
    const m = computeMethods(a).find(m => m.id === 'momentum')!;
    expect(m.status).toBe('nao-disponivel');
    expect(m.availabilityReason).toBe('Não disponível nesta versão.');
    expect(m.issues).toBeUndefined();
  });
  it('E: tutorial oferece carregar caso e compartilha dados e resultado do motor', () => {
    const a = createDemoAnalysis();
    expect(a.methods).toEqual(computeMethods(a));
    expect(a.isTutorial).toBe(true);
    expect(hasQuantitativeResult(a.methods)).toBe(true);
    expect(renderToStaticMarkup(<VFTutorial onNavigate={() => {}} />)).toContain('Usar este caso demonstrativo');
    const memory = new Map<string, string>();
    vi.stubGlobal('localStorage', { getItem: (k: string) => memory.get(k), setItem: (k: string, v: string) => memory.set(k, v) });
    saveAnalysis(a);
    const restored = loadAnalyses()[0];
    expect(restored.tracks).toEqual(a.tracks);
    expect(computeMethods(restored)).toEqual(a.methods);
    expect(createDemoAnalysis().id).not.toBe(a.id);
  });
});

describe('Regressões de parâmetros e validação', () => {
  it('não escolhe arbitrariamente nem ignora seleção explícita compatível', () => {
    const a = createDemoAnalysis(); a.vehicles[0].tireCondition = 'nao-determinado';
    const r = resolveTrack(a.tracks[0], a);
    expect(r.candidates.length).toBeGreaterThan(1); expect(r.parameter).toBeUndefined();
    a.tracks[0].parameterRefId = r.candidates[1].id;
    expect(resolveTrack(a.tracks[0], a).parameter?.id).toBe(r.candidates[1].id);
    expect(hasQuantitativeResult(computeMethods(a))).toBe(true);
    a.vehicles[0].tireCondition = 'novos';
    expect(resolveTrack(a.tracks[0], a).parameter?.tireCondition).toBe('novos');
  });
  it('não substitui trecho sem coeficiente por atrito mínimo fictício', () => {
    const a = createDemoAnalysis(); a.tracks.push({ ...a.tracks[0], id: 'sem-base', surface: 'gelo', condition: 'oleo' });
    expect(hasQuantitativeResult(computeMethods(a))).toBe(false);
    expect(computeMethods(a)[0].availabilityReason).toContain('Nenhum coeficiente compatível');
  });
  it('preserva e aplica override e inclinação; rejeita override incompleto', () => {
    const a = createDemoAnalysis(); a.road.gradePercent = -3;
    a.tracks[0].frictionOverride = { muMin: 0.5, muCentral: 0.6, muMax: 0.7, source: 'Ensaio', justification: 'Medição local' };
    expect(computeMethods(a)[0].centralKmh).toBe(multiSegmentFrictionSpeed([{ distanceM: 42.3, muMin: 0.5, muCentral: 0.6, muMax: 0.7, gradePercent: -3 }]).centralKmh);
    const copy = JSON.parse(JSON.stringify(a));
    expect(computeMethods(copy)).toEqual(computeMethods(a));
    a.tracks[0].frictionOverride.muMax = 0.1;
    expect(hasQuantitativeResult(computeMethods(a))).toBe(false);
  });
  it('informa superfície e condição ausentes e não calcula com veículo removido', () => {
    const a = createDemoAnalysis();
    Object.assign(a.tracks[0], { surface: '', condition: '' });
    expect(resolveTrack(a.tracks[0], a).issues.map(i => i.field)).toEqual(expect.arrayContaining(['surface', 'condition']));
    a.vehicles = [];
    expect(hasQuantitativeResult(computeMethods(a))).toBe(false);
  });
  it('formulário mostra prontidão, coeficiente e fonte técnica', () => {
    const html = renderToStaticMarkup(<WizardStepVestigios analysis={createDemoAnalysis()} onChange={() => {}} />);
    expect(html).toContain('Dados suficientes para cálculo');
    expect(html).toContain('Coeficiente sugerido');
    expect(html).toContain('Fonte técnica disponível');
    expect(html).toContain('Obrigatórios para calcular');
  });
  it('sem trecho e com apenas auxiliares bloqueia resultado', () => {
    const a = createDemoAnalysis(); a.tracks = [];
    const methods = computeMethods(a);
    expect(hasQuantitativeResult(methods)).toBe(false);
    expect(methods.find(m => m.id === 'missing-track')?.issues?.[0].field).toBe('add-track');
  });
});
