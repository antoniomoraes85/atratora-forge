import React, { useState } from 'react';
import { Info, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { FRICTION_PARAMETERS, SURFACE_LABELS, CONDITION_LABELS } from '../data/technicalBase';
import type { SurfaceType, SurfaceCondition } from '../data/technicalBase';
import { SURFACE_OPTIONS, CONDITION_OPTIONS } from '../utils/labels';

export const VFTechnicalBase: React.FC = () => {
  const [surfaceFilter, setSurfaceFilter] = useState<SurfaceType | 'todas'>('todas');
  const [conditionFilter, setConditionFilter] = useState<SurfaceCondition | 'todas'>('todas');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = FRICTION_PARAMETERS.filter(p => {
    if (surfaceFilter !== 'todas' && p.surface !== surfaceFilter) return false;
    if (conditionFilter !== 'todas' && p.condition !== conditionFilter) return false;
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      p.surface.includes(q) ||
      p.condition.includes(q) ||
      (p.note ?? '').toLowerCase().includes(q) ||
      (p.chapter ?? '').toLowerCase().includes(q) ||
      (p.contactMode ?? '').includes(q)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Base técnica de parâmetros</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '640px' }}>
          Coeficientes de atrito documentados em fontes técnicas identificadas no projeto.
          Todos os valores são rastreáveis ao documento de origem.
        </p>
        <div style={{
          marginTop: '12px', padding: '10px 14px',
          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '12px', color: 'var(--warning-text)',
        }}>
          <Info size={14} />
          Parâmetros não cadastrados nesta base devem ser informados pelo usuário com fonte e justificativa explícitas.
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="search"
            placeholder="Buscar parâmetros..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 10px 9px 32px', fontSize: '13px' }}
          />
        </div>
        <select
          value={surfaceFilter}
          onChange={e => setSurfaceFilter(e.target.value as SurfaceType | 'todas')}
          style={{ padding: '9px 14px', fontSize: '13px', minWidth: '180px' }}
        >
          <option value="todas">Todas as superfícies</option>
          {SURFACE_OPTIONS.map(s => (
            <option key={s} value={s}>{SURFACE_LABELS[s]}</option>
          ))}
        </select>
        <select
          value={conditionFilter}
          onChange={e => setConditionFilter(e.target.value as SurfaceCondition | 'todas')}
          style={{ padding: '9px 14px', fontSize: '13px', minWidth: '160px' }}
        >
          <option value="todas">Todas as condições</option>
          {CONDITION_OPTIONS.map(c => (
            <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
          ))}
        </select>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
        {filtered.length} parâmetro(s) encontrado(s)
      </div>

      {/* Tabela de parâmetros */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)' }}>
              {['Superfície', 'Condição', 'Contato', 'µ min', 'µ central', 'µ max', 'Fonte técnica', ''].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <React.Fragment key={p.id}>
                <tr
                  style={{ borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}
                  onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                >
                  <td style={{ padding: '10px 12px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {SURFACE_LABELS[p.surface]}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                    {CONDITION_LABELS[p.condition]}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    {p.contactMode ?? 'pneus'}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {p.muMin.toFixed(2)}
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    {p.muCentral.toFixed(2)}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {p.muMax.toFixed(2)}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '11px', color: 'var(--text-dim)', maxWidth: '200px' }}>
                    Fonte técnica
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {expandedId === p.id
                      ? <ChevronUp size={14} color="var(--text-dim)" />
                      : <ChevronDown size={14} color="var(--text-dim)" />
                    }
                  </td>
                </tr>
                {expandedId === p.id && (
                  <tr style={{ background: 'var(--bg-surface)' }}>
                    <td colSpan={8} style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Referência completa</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.source}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '4px' }}>{p.chapter}</div>
                          {p.table && <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Tabela: {p.table}</div>}
                          {p.page && <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Pág.: {p.page}</div>}
                        </div>
                        {p.note && (
                          <div>
                            <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Observação técnica</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.note}</div>
                          </div>
                        )}
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Condições específicas</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {p.vehicleType ? `Veículo: ${p.vehicleType}` : 'Genérico (todos os veículos)'}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {p.tireCondition ? `Pneu: ${p.tireCondition}` : 'Condição de pneu não específica'}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-dim)' }}>
            Nenhum parâmetro encontrado para os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
};
