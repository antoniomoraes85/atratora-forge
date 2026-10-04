import React from 'react';
import type { ForensicAnalysis, AvailableElement } from '../../types/analysis';
import { AVAILABLE_ELEMENT_LABELS } from '../../utils/labels';


const GROUPS = [
  { label: 'Vestígios de deslizamento', items: ['frenagem', 'derrapagem', 'arrastamento', 'trilha', 'friccao', 'sulcagem'] as AvailableElement[] },
  { label: 'Configuração do veículo', items: ['deslocamento-pos-impacto', 'veiculo-tombado', 'veiculo-sobre-teto', 'veiculo-deslizando-lateral', 'motocicleta-tombada'] as AvailableElement[] },
  { label: 'Cena e colisão', items: ['sitio-colisao', 'posicao-final', 'danos', 'objeto-fixo'] as AvailableElement[] },
  { label: 'Pedestre', items: ['atropelamento', 'projecao-pedestre'] as AvailableElement[] },
  { label: 'Outros dados', items: ['distancia-para-parada', 'cronotacografo', 'edr', 'gps-telemetria', 'video', 'outro'] as AvailableElement[] },
];

interface Props {
  analysis: ForensicAnalysis;
  onChange: (partial: Partial<ForensicAnalysis>) => void;
}

export const WizardStepElementos: React.FC<Props> = ({ analysis, onChange }) => {
  const selected = new Set(analysis.availableElements);

  const toggle = (el: AvailableElement) => {
    const next = new Set(selected);
    if (next.has(el)) next.delete(el);
    else next.add(el);
    onChange({ availableElements: Array.from(next) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          Elementos disponíveis
        </h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Selecione todos os elementos documentados neste caso. Os módulos de entrada de dados
          e os métodos aplicáveis serão ativados de acordo com sua seleção.
        </p>
      </div>

      {selected.size > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {Array.from(selected).map(el => (
            <span
              key={el}
              style={{
                padding: '4px 10px', fontSize: '12px', fontWeight: 600,
                background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)',
                borderRadius: 'var(--radius-full)', color: '#38bdf8',
              }}
            >
              {AVAILABLE_ELEMENT_LABELS[el]}
            </span>
          ))}
        </div>
      )}

      {GROUPS.map(group => (
        <div key={group.label}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            {group.label}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {group.items.map(el => {
              const isSelected = selected.has(el);
              return (
                <button
                  key={el}
                  onClick={() => toggle(el)}
                  style={{
                    padding: '8px 14px', fontSize: '13px', fontWeight: 500,
                    border: '1px solid',
                    borderColor: isSelected ? 'rgba(56,189,248,0.5)' : 'var(--border-default)',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'rgba(56,189,248,0.12)' : 'transparent',
                    color: isSelected ? '#38bdf8' : 'var(--text-muted)',
                    cursor: 'pointer', transition: 'all var(--transition-fast)',
                  }}
                >
                  {isSelected ? '✓ ' : ''}{AVAILABLE_ELEMENT_LABELS[el]}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selected.size === 0 && (
        <div style={{ fontSize: '13px', color: 'var(--warning-text)', padding: '10px 14px', background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-sm)' }}>
          Selecione ao menos um elemento para ativar os módulos de análise.
        </div>
      )}
    </div>
  );
};
