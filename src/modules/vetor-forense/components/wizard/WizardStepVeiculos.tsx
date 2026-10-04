import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { ForensicAnalysis, Vehicle, VehicleType, TireCondition, TireInflation, ABS, BrakeFailure } from '../../types/analysis';
import {
  VEHICLE_TYPE_LABELS, TIRE_CONDITION_LABELS, TIRE_INFLATION_LABELS,
  ABS_LABELS, BRAKE_FAILURE_LABELS,
} from '../../utils/labels';

interface Props {
  analysis: ForensicAnalysis;
  onChange: (partial: Partial<ForensicAnalysis>) => void;
}

function createVehicle(index: number): Vehicle {
  return {
    id: `V${index + 1}`,
    type: 'automovel',
    tireCondition: 'nao-determinado',
    tireInflation: 'nao-determinada',
    abs: 'nao-determinado',
    brakeFailure: 'nao-determinada',
  };
}

const Field: React.FC<{ label: string; tooltip?: string; children: React.ReactNode }> = ({ label, tooltip, children }) => (
  <div>
    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {label}
      {tooltip && (
        <span title={tooltip} style={{ color: 'var(--text-dim)', cursor: 'help', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>ⓘ</span>
      )}
    </label>
    {children}
  </div>
);

export const WizardStepVeiculos: React.FC<Props> = ({ analysis, onChange }) => {
  const updateVehicle = (idx: number, partial: Partial<Vehicle>) => {
    const next = [...analysis.vehicles];
    next[idx] = { ...next[idx], ...partial };
    // Renomeia IDs sequencialmente
    onChange({ vehicles: next.map((v, i) => ({ ...v, id: `V${i + 1}` })) });
  };

  const addVehicle = () => {
    onChange({ vehicles: [...analysis.vehicles, createVehicle(analysis.vehicles.length)] });
  };

  const removeVehicle = (idx: number) => {
    const next = analysis.vehicles.filter((_, i) => i !== idx);
    onChange({ vehicles: next.map((v, i) => ({ ...v, id: `V${i + 1}` })) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Veículos</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
          Cadastre os veículos envolvidos. Apenas o tipo é obrigatório.
        </p>
      </div>

      {analysis.vehicles.map((v, idx) => (
        <div
          key={idx}
          style={{
            padding: '24px', background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                padding: '4px 12px', fontSize: '13px', fontWeight: 800,
                background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)',
                borderRadius: 'var(--radius-full)', color: '#38bdf8',
              }}>
                {v.id}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {VEHICLE_TYPE_LABELS[v.type]}
              </span>
            </div>
            <button
              onClick={() => removeVehicle(idx)}
              style={{ background: 'transparent', border: 'none', color: 'var(--danger-text)', cursor: 'pointer', padding: '4px' }}
              title="Remover veículo"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <Field label="Tipo *">
              <select value={v.type} onChange={e => updateVehicle(idx, { type: e.target.value as VehicleType })} style={{ width: '100%' }}>
                {Object.entries(VEHICLE_TYPE_LABELS).map(([k, lbl]) => (
                  <option key={k} value={k}>{lbl}</option>
                ))}
              </select>
            </Field>

            <Field label="Marca / Modelo" tooltip="Opcional — auxilia na identificação">
              <input
                type="text"
                value={v.make ?? ''}
                onChange={e => updateVehicle(idx, { make: e.target.value })}
                placeholder="Ex.: Honda Civic 2020"
                style={{ width: '100%' }}
              />
            </Field>

            <Field label="Massa (kg)" tooltip="Massa do veículo sem ocupantes">
              <input
                type="number"
                value={v.massKg ?? ''}
                onChange={e => updateVehicle(idx, { massKg: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Opcional"
                min={0}
                style={{ width: '100%' }}
              />
            </Field>

            <Field label="Carga (kg)" tooltip="Carga transportada">
              <input
                type="number"
                value={v.loadKg ?? ''}
                onChange={e => updateVehicle(idx, { loadKg: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Opcional"
                min={0}
                style={{ width: '100%' }}
              />
            </Field>

            <Field label="Massa de ocupantes (kg)" tooltip="Estimativa da massa total dos ocupantes">
              <input
                type="number"
                value={v.occupantMassKg ?? ''}
                onChange={e => updateVehicle(idx, { occupantMassKg: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Opcional"
                min={0}
                style={{ width: '100%' }}
              />
            </Field>

            <Field label="Estado dos pneus" tooltip="Condição da banda de rodagem">
              <select value={v.tireCondition} onChange={e => updateVehicle(idx, { tireCondition: e.target.value as TireCondition })} style={{ width: '100%' }}>
                {Object.entries(TIRE_CONDITION_LABELS).map(([k, lbl]) => (
                  <option key={k} value={k}>{lbl}</option>
                ))}
              </select>
            </Field>

            <Field label="Calibragem" tooltip="Estado de pressão dos pneus">
              <select value={v.tireInflation} onChange={e => updateVehicle(idx, { tireInflation: e.target.value as TireInflation })} style={{ width: '100%' }}>
                {Object.entries(TIRE_INFLATION_LABELS).map(([k, lbl]) => (
                  <option key={k} value={k}>{lbl}</option>
                ))}
              </select>
            </Field>

            <Field label="ABS" tooltip="Sistema de freio ABS instalado e operacional">
              <select value={v.abs} onChange={e => updateVehicle(idx, { abs: e.target.value as ABS })} style={{ width: '100%' }}>
                {Object.entries(ABS_LABELS).map(([k, lbl]) => (
                  <option key={k} value={k}>{lbl}</option>
                ))}
              </select>
            </Field>

            <Field label="Falha de freios" tooltip="Falha mecânica no sistema de freios identificada na perícia">
              <select value={v.brakeFailure} onChange={e => updateVehicle(idx, { brakeFailure: e.target.value as BrakeFailure })} style={{ width: '100%' }}>
                {Object.entries(BRAKE_FAILURE_LABELS).map(([k, lbl]) => (
                  <option key={k} value={k}>{lbl}</option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      ))}

      <button
        onClick={addVehicle}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 20px', border: '1px dashed var(--border-default)',
          borderRadius: 'var(--radius-md)', background: 'transparent',
          color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(56,189,248,0.4)'; (e.currentTarget as HTMLButtonElement).style.color = '#38bdf8'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; }}
      >
        <PlusCircle size={16} /> Adicionar veículo
      </button>

      {analysis.vehicles.length === 0 && (
        <div style={{ padding: '12px 16px', background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--warning-text)' }}>
          Adicione pelo menos um veículo para associar vestígios e calcular velocidade.
        </div>
      )}
    </div>
  );
};
