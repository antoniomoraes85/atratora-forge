/**
 * Vetor Forense — Tipos da Análise
 */

import type {
  SurfaceType,
  SurfaceCondition,
  VehicleType,
  TireCondition,
  ContactMode,
} from '../data/technicalBase';

export type {
  SurfaceType,
  SurfaceCondition,
  VehicleType,
  TireCondition,
  ContactMode,
};

// ─────────────────────────────────────────────────────────────────────────────
// ENUMERAÇÕES
// ─────────────────────────────────────────────────────────────────────────────

export type RoadGeometry =
  | 'reta'
  | 'curva'
  | 'transicao'
  | 'cruzamento'
  | 'nao-determinada';

export type RoadProfile =
  | 'nivel'
  | 'aclive'
  | 'declive'
  | 'nao-determinado';

export type DayPhase =
  | 'amanhecer'
  | 'dia'
  | 'anoitecer'
  | 'noite'
  | 'nao-determinada';

export type Visibility =
  | 'boa'
  | 'reduzida'
  | 'severamente-reduzida'
  | 'nao-determinada';

export type SceneCondition =
  | 'preservado'
  | 'parcialmente-preservado'
  | 'desfeito'
  | 'nao-determinado';

export type ABS = 'sim' | 'nao' | 'nao-determinado';

export type BrakeFailure = 'identificada' | 'nao-identificada' | 'nao-determinada';

export type TireInflation =
  | 'normal'
  | 'parcialmente-vazios'
  | 'vazio-furado'
  | 'nao-determinada';

export type TrackType =
  | 'frenagem'
  | 'derrapagem'
  | 'arrastamento'
  | 'trilha'
  | 'friccao'
  | 'sulcagem'
  | 'rolamento'
  | 'deslizamento-lateral'
  | 'sobre-teto'
  | 'motocicleta-tombada'
  | 'outro';

export type TrackMoment =
  | 'pre-impacto'
  | 'pos-impacto'
  | 'entre-impactos'
  | 'nao-determinado';

export type MeasurementMethod =
  | 'topografia'
  | 'gnss'
  | 'distanciometro'
  | 'trena'
  | 'croqui-dimensionado'
  | 'fotogrametria'
  | 'fotografia-escala'
  | 'video-calibrado'
  | 'estimativa-visual'
  | 'outro';

export type DataSource =
  | 'medicao-direta'
  | 'croqui'
  | 'fotografia'
  | 'video'
  | 'documento'
  | 'declaracao'
  | 'estimativa'
  | 'outra';

export type DamageLevel =
  | 'leve'
  | 'media'
  | 'grave'
  | 'gravissima'
  | 'nao-determinada';

export type PedestrianTrajectory =
  | 'wrap'
  | 'forward-projection'
  | 'fender-vault'
  | 'roof-vault'
  | 'somersault'
  | 'nao-determinada';

export type ElectronicDataType =
  | 'cronotacografo'
  | 'edr'
  | 'gps'
  | 'telemetria'
  | 'video'
  | 'outro';

export type ElectronicDataIntegrity =
  | 'integro'
  | 'parcialmente-comprometido'
  | 'comprometido'
  | 'nao-avaliado';

export type MethodStatus =
  | 'suficiente'
  | 'insuficiente'
  | 'auxiliar'
  | 'nao-aplicavel'
  | 'nao-disponivel';

export type ParameterSource = 'tecnico' | 'externo';

// ─────────────────────────────────────────────────────────────────────────────
// ESTRUTURAS DE DADOS
// ─────────────────────────────────────────────────────────────────────────────

export interface Vehicle {
  id: string; // 'V1', 'V2', ...
  type: VehicleType;
  make?: string;
  model?: string;
  massKg?: number;
  loadKg?: number;
  occupantMassKg?: number;
  tireCondition: TireCondition;
  tireInflation: TireInflation;
  abs: ABS;
  brakeFailure: BrakeFailure;
}

export interface RoadInfo {
  surface: SurfaceType;
  condition: SurfaceCondition;
  geometry: RoadGeometry;
  profile: RoadProfile;
  gradePercent?: number;
  curveRadiusM?: number;
  superelevationPercent?: number;
  speedLimitKmh?: number;
  dayPhase: DayPhase;
  visibility: Visibility;
  sceneCondition: SceneCondition;
}

export interface FrictionOverride {
  /** Valor mínimo informado pelo usuário */
  muMin: number;
  muCentral: number;
  muMax: number;
  source: string;
  justification: string;
}

export interface TrackSegment {
  id: string;
  type: TrackType;
  vehicleId: string;
  moment: TrackMoment;
  distanceM: number;
  surface: SurfaceType;
  condition: SurfaceCondition;
  contactMode: ContactMode;
  measurementMethod: MeasurementMethod;
  dataSource: DataSource;
  /** ID do parâmetro técnico da base (auto-selecionado) */
  parameterRefId?: string;
  /** Override manual de coeficiente */
  frictionOverride?: FrictionOverride;
  /** Qualidade do parâmetro: 0–100 */
  parameterQualityScore?: number;
}

export interface DamageInfo {
  vehicleId: string;
  level: DamageLevel;
  description?: string;
  note?: string;
}

export interface PedestrianData {
  ageGroup?: string;
  sex?: string;
  trajectory: PedestrianTrajectory;
  projectionDistM?: number;
  slidingDistM?: number;
  note?: string;
}

export interface ElectronicRecord {
  id: string;
  type: ElectronicDataType;
  vehicleId?: string;
  speedKmh?: number;
  momentDescription?: string;
  integrity: ElectronicDataIntegrity;
  source?: string;
  note?: string;
}

export interface MethodResult {
  id: string;
  name: string;
  description: string;
  status: MethodStatus;
  isIndependent: boolean;
  minKmh?: number;
  centralKmh?: number;
  maxKmh?: number;
  /** Razão pela qual está disponível ou não */
  availabilityReason: string;
  /** Qualidade deste método: 0–100 */
  qualityScore: number;
  issues?: AnalysisIssue[];
  /** Parâmetro técnico usado */
  parameterRef?: string;
  /** Fórmula usada */
  formula?: string;
  explanation?: string;
  /** Variáveis com valores */
  variables?: Record<string, string | number>;
  /** Fonte do parâmetro */
  parameterSource?: string;
}

export interface IFTInput {
  measurementQuality: number;
  parameterQuality: number;
  preservation: number;
  completeness: number;
  traceability: number;
}

export type AvailableElement =
  | 'frenagem'
  | 'derrapagem'
  | 'arrastamento'
  | 'trilha'
  | 'friccao'
  | 'sulcagem'
  | 'deslocamento-pos-impacto'
  | 'veiculo-tombado'
  | 'veiculo-sobre-teto'
  | 'veiculo-deslizando-lateral'
  | 'motocicleta-tombada'
  | 'sitio-colisao'
  | 'posicao-final'
  | 'danos'
  | 'atropelamento'
  | 'projecao-pedestre'
  | 'distancia-para-parada'
  | 'objeto-fixo'
  | 'cronotacografo'
  | 'edr'
  | 'gps-telemetria'
  | 'video'
  | 'outro';

// ─────────────────────────────────────────────────────────────────────────────
// ANÁLISE COMPLETA
// ─────────────────────────────────────────────────────────────────────────────

export interface ForensicAnalysis {
  id: string;
  title: string;
  caseNumber?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  /** Elementos disponíveis selecionados */
  availableElements: AvailableElement[];
  vehicles: Vehicle[];
  road: RoadInfo;
  tracks: TrackSegment[];
  damages: DamageInfo[];
  pedestrian?: PedestrianData;
  electronicRecords: ElectronicRecord[];
  methods: MethodResult[];
  ift?: number;
  ica?: number | null;
  iae?: number | null;
  iftInput?: IFTInput;
  /** Texto técnico auto-gerado */
  technicalSummary?: string;
  isTutorial?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// WIZARD STATE
// ─────────────────────────────────────────────────────────────────────────────

export type WizardStep =
  | 'caso'
  | 'elementos'
  | 'veiculos'
  | 'via'
  | 'vestigios'
  | 'metodos'
  | 'resultado';

export interface AnalysisIssue {
  message: string;
  step: WizardStep;
  field: string;
  trackId?: string;
}
