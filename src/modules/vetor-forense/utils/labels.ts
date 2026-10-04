/**
 * Vetor Forense — Labels e constantes de UI
 */

import type {
  VehicleType,
  TireCondition,
  TireInflation,
  ABS,
  BrakeFailure,
  RoadGeometry,
  RoadProfile,
  DayPhase,
  Visibility,
  SceneCondition,
  TrackType,
  TrackMoment,
  MeasurementMethod,
  DataSource,
  DamageLevel,
  PedestrianTrajectory,
  AvailableElement,
} from '../types/analysis';

import type { SurfaceType, SurfaceCondition, ContactMode } from '../data/technicalBase';
import { SURFACE_LABELS, CONDITION_LABELS } from '../data/technicalBase';

export { SURFACE_LABELS, CONDITION_LABELS };

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  'automovel': 'Automóvel',
  'caminhonete': 'Caminhonete',
  'camioneta': 'Camioneta',
  'utilitario': 'Utilitário',
  'motocicleta': 'Motocicleta',
  'motoneta': 'Motoneta',
  'ciclomotor': 'Ciclomotor',
  'caminhao': 'Caminhão',
  'caminhao-trator': 'Caminhão-trator',
  'onibus': 'Ônibus',
  'micro-onibus': 'Micro-ônibus',
  'reboque': 'Reboque',
  'semirreboque': 'Semirreboque',
  'bicicleta': 'Bicicleta',
  'outro': 'Outro',
};

export const TIRE_CONDITION_LABELS: Record<TireCondition, string> = {
  'novos': 'Novos',
  'usados': 'Usados (desgaste normal)',
  'desgastados': 'Desgastados',
  'desgaste-excessivo': 'Desgaste excessivo',
  'danificados': 'Danificados',
  'nao-determinado': 'Não determinado',
};

export const TIRE_INFLATION_LABELS: Record<TireInflation, string> = {
  'normal': 'Normal',
  'parcialmente-vazios': 'Parcialmente vazios',
  'vazio-furado': 'Vazio / furado',
  'nao-determinada': 'Não determinada',
};

export const ABS_LABELS: Record<ABS, string> = {
  'sim': 'Sim',
  'nao': 'Não',
  'nao-determinado': 'Não determinado',
};

export const BRAKE_FAILURE_LABELS: Record<BrakeFailure, string> = {
  'identificada': 'Identificada',
  'nao-identificada': 'Não identificada',
  'nao-determinada': 'Não determinada',
};

export const GEOMETRY_LABELS: Record<RoadGeometry, string> = {
  'reta': 'Reta',
  'curva': 'Curva',
  'transicao': 'Transição',
  'cruzamento': 'Cruzamento / interseção',
  'nao-determinada': 'Não determinada',
};

export const PROFILE_LABELS: Record<RoadProfile, string> = {
  'nivel': 'Nível',
  'aclive': 'Aclive',
  'declive': 'Declive',
  'nao-determinado': 'Não determinado',
};

export const DAY_PHASE_LABELS: Record<DayPhase, string> = {
  'amanhecer': 'Amanhecer',
  'dia': 'Dia',
  'anoitecer': 'Anoitecer',
  'noite': 'Noite',
  'nao-determinada': 'Não determinada',
};

export const VISIBILITY_LABELS: Record<Visibility, string> = {
  'boa': 'Boa',
  'reduzida': 'Reduzida',
  'severamente-reduzida': 'Severamente reduzida',
  'nao-determinada': 'Não determinada',
};

export const SCENE_CONDITION_LABELS: Record<SceneCondition, string> = {
  'preservado': 'Preservado',
  'parcialmente-preservado': 'Parcialmente preservado',
  'desfeito': 'Desfeito',
  'nao-determinado': 'Não determinado',
};

export const TRACK_TYPE_LABELS: Record<TrackType, string> = {
  'frenagem': 'Frenagem',
  'derrapagem': 'Derrapagem',
  'arrastamento': 'Arrastamento',
  'trilha': 'Trilha',
  'friccao': 'Fricção',
  'sulcagem': 'Sulcagem',
  'rolamento': 'Rolamento',
  'deslizamento-lateral': 'Deslizamento lateral',
  'sobre-teto': 'Veículo sobre teto',
  'motocicleta-tombada': 'Motocicleta tombada',
  'outro': 'Outro',
};

export const TRACK_MOMENT_LABELS: Record<TrackMoment, string> = {
  'pre-impacto': 'Pré-impacto',
  'pos-impacto': 'Pós-impacto',
  'entre-impactos': 'Entre impactos',
  'nao-determinado': 'Não determinado',
};

export const MEASUREMENT_METHOD_LABELS: Record<MeasurementMethod, string> = {
  'topografia': 'Topografia',
  'gnss': 'GNSS / GPS geodésico',
  'distanciometro': 'Distanciômetro',
  'trena': 'Trena',
  'croqui-dimensionado': 'Croqui dimensionado',
  'fotogrametria': 'Fotogrametria',
  'fotografia-escala': 'Fotografia com escala',
  'video-calibrado': 'Vídeo calibrado',
  'estimativa-visual': 'Estimativa visual',
  'outro': 'Outro',
};

export const DATA_SOURCE_LABELS: Record<DataSource, string> = {
  'medicao-direta': 'Medição direta',
  'croqui': 'Croqui',
  'fotografia': 'Fotografia',
  'video': 'Vídeo',
  'documento': 'Documento',
  'declaracao': 'Declaração',
  'estimativa': 'Estimativa',
  'outra': 'Outra',
};

export const CONTACT_MODE_LABELS: Record<ContactMode, string> = {
  'pneus': 'Pneus',
  'lateral': 'Lateral do veículo',
  'teto': 'Teto do veículo',
  'metal': 'Metal / carroceria',
  'motocicleta-tombada': 'Motocicleta tombada',
  'rolamento-livre': 'Rolamento livre',
  'corpo-humano-deslizando': 'Corpo humano deslizando',
  'corpo-humano-rolando': 'Corpo humano rolando',
};

export const DAMAGE_LEVEL_LABELS: Record<DamageLevel, string> = {
  'leve': 'Leve',
  'media': 'Média',
  'grave': 'Grave',
  'gravissima': 'Gravíssima',
  'nao-determinada': 'Não determinada',
};

export const PEDESTRIAN_TRAJECTORY_LABELS: Record<PedestrianTrajectory, string> = {
  'wrap': 'WRAP',
  'forward-projection': 'Forward Projection',
  'fender-vault': 'Fender Vault',
  'roof-vault': 'Roof Vault',
  'somersault': 'Somersault',
  'nao-determinada': 'Não determinada',
};

export const AVAILABLE_ELEMENT_LABELS: Record<AvailableElement, string> = {
  'frenagem': 'Frenagem',
  'derrapagem': 'Derrapagem',
  'arrastamento': 'Arrastamento',
  'trilha': 'Trilha',
  'friccao': 'Fricção',
  'sulcagem': 'Sulcagem',
  'deslocamento-pos-impacto': 'Deslocamento pós-impacto',
  'veiculo-tombado': 'Veículo tombado',
  'veiculo-sobre-teto': 'Veículo sobre teto',
  'veiculo-deslizando-lateral': 'Veículo deslizando lateralmente',
  'motocicleta-tombada': 'Motocicleta tombada',
  'sitio-colisao': 'Sítio de colisão',
  'posicao-final': 'Posição final',
  'danos': 'Danos',
  'atropelamento': 'Atropelamento',
  'projecao-pedestre': 'Projeção de pedestre',
  'distancia-para-parada': 'Distância disponível para parada',
  'objeto-fixo': 'Objeto fixo',
  'cronotacografo': 'Cronotacógrafo',
  'edr': 'EDR',
  'gps-telemetria': 'GPS / telemetria',
  'video': 'Vídeo',
  'outro': 'Outro',
};

export const SURFACE_OPTIONS: SurfaceType[] = [
  'asfalto', 'concreto', 'paralelepipedo', 'macadame',
  'pedra-irregular', 'terra', 'cascalho', 'areia', 'grama', 'gelo'
];

export const CONDITION_OPTIONS: SurfaceCondition[] = [
  'seca', 'molhada', 'agua-acumulada', 'areia', 'barro', 'oleo', 'gelo-granizo'
];
