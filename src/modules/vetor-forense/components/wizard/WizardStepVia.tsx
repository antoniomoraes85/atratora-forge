import React from 'react';
import type { ForensicAnalysis, RoadInfo, RoadGeometry, RoadProfile, DayPhase, Visibility, SceneCondition } from '../../types/analysis';
import type { SurfaceType, SurfaceCondition } from '../../data/technicalBase';
import {
  SURFACE_LABELS, CONDITION_LABELS,
  GEOMETRY_LABELS, PROFILE_LABELS, DAY_PHASE_LABELS,
  VISIBILITY_LABELS, SCENE_CONDITION_LABELS,
  SURFACE_OPTIONS, CONDITION_OPTIONS,
} from '../../utils/labels';

interface Props {
  analysis: ForensicAnalysis;
  onChange: (partial: Partial<ForensicAnalysis>) => void;
}

const Field: React.FC<{ label: string; tooltip?: string; children: React.ReactNode }> = ({ label, tooltip, children }) => (
  <div>
    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {label}
      {tooltip && <span title={tooltip} style={{ color: 'var(--text-dim)', cursor: 'help' }}>ⓘ</span>}
    </label>
    {children}
  </div>
);

export const WizardStepVia: React.FC<Props> = ({ analysis, onChange }) => {
  const road = analysis.road;
  const update = (partial: Partial<RoadInfo>) => onChange({ road: { ...road, ...partial } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Via e ambiente</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
          Condições da via e do ambiente no momento do sinistro.
        </p>
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
          Superfície e condição
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <Field label="Tipo de superfície *" tooltip="Material da camada de rolamento">
            <select value={road.surface} onChange={e => update({ surface: e.target.value as SurfaceType })} style={{ width: '100%' }}>
              {SURFACE_OPTIONS.map(s => (
                <option key={s} value={s}>{SURFACE_LABELS[s]}</option>
              ))}
            </select>
          </Field>

          <Field label="Condição da superfície *">
            <select value={road.condition} onChange={e => update({ condition: e.target.value as SurfaceCondition })} style={{ width: '100%' }}>
              {CONDITION_OPTIONS.map(c => (
                <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
          Geometria e perfil
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Field label="Geometria">
            <select value={road.geometry} onChange={e => update({ geometry: e.target.value as RoadGeometry })} style={{ width: '100%' }}>
              {Object.entries(GEOMETRY_LABELS).map(([k, lbl]) => (
                <option key={k} value={k}>{lbl}</option>
              ))}
            </select>
          </Field>

          <Field label="Perfil longitudinal">
            <select value={road.profile} onChange={e => update({ profile: e.target.value as RoadProfile })} style={{ width: '100%' }}>
              {Object.entries(PROFILE_LABELS).map(([k, lbl]) => (
                <option key={k} value={k}>{lbl}</option>
              ))}
            </select>
          </Field>

          <Field label="Inclinação (%)" tooltip="Positivo = aclive, negativo = declive. Influencia o cálculo de velocidade.">
            <input
              type="number"
              value={road.gradePercent ?? ''}
              onChange={e => update({ gradePercent: e.target.value !== '' ? Number(e.target.value) : undefined })}
              placeholder="Opcional"
              step={0.1}
              style={{ width: '100%' }}
            />
          </Field>

          <Field label="Raio de curva (m)" tooltip="Raio da curva em metros, se aplicável">
            <input
              type="number"
              value={road.curveRadiusM ?? ''}
              onChange={e => update({ curveRadiusM: e.target.value !== '' ? Number(e.target.value) : undefined })}
              placeholder="Opcional"
              min={0}
              style={{ width: '100%' }}
            />
          </Field>

          <Field label="Superelevação (%)" tooltip="Inclinação transversal da via (peralte)">
            <input
              type="number"
              value={road.superelevationPercent ?? ''}
              onChange={e => update({ superelevationPercent: e.target.value !== '' ? Number(e.target.value) : undefined })}
              placeholder="Opcional"
              step={0.1}
              style={{ width: '100%' }}
            />
          </Field>

          <Field label="Velocidade regulamentar (km/h)" tooltip="Sinalizada na via. Não altera o cálculo.">
            <input
              type="number"
              value={road.speedLimitKmh ?? ''}
              onChange={e => update({ speedLimitKmh: e.target.value !== '' ? Number(e.target.value) : undefined })}
              placeholder="Opcional"
              min={0}
              style={{ width: '100%' }}
            />
          </Field>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
          Ambiente e estado da cena
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Field label="Fase do dia">
            <select value={road.dayPhase} onChange={e => update({ dayPhase: e.target.value as DayPhase })} style={{ width: '100%' }}>
              {Object.entries(DAY_PHASE_LABELS).map(([k, lbl]) => (
                <option key={k} value={k}>{lbl}</option>
              ))}
            </select>
          </Field>

          <Field label="Visibilidade">
            <select value={road.visibility} onChange={e => update({ visibility: e.target.value as Visibility })} style={{ width: '100%' }}>
              {Object.entries(VISIBILITY_LABELS).map(([k, lbl]) => (
                <option key={k} value={k}>{lbl}</option>
              ))}
            </select>
          </Field>

          <Field label="Estado da cena" tooltip="Nível de preservação dos vestígios">
            <select value={road.sceneCondition} onChange={e => update({ sceneCondition: e.target.value as SceneCondition })} style={{ width: '100%' }}>
              {Object.entries(SCENE_CONDITION_LABELS).map(([k, lbl]) => (
                <option key={k} value={k}>{lbl}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      {road.gradePercent !== undefined && road.gradePercent !== 0 && (
        <div style={{ padding: '12px 16px', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--info-text)' }}>
          Inclinação de {road.gradePercent > 0 ? 'aclive' : 'declive'} de {Math.abs(road.gradePercent)}% será aplicada na correção do coeficiente de atrito efetivo.
        </div>
      )}
    </div>
  );
};
