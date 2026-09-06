import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { ConversionOptions } from '../types';

interface ConverterConfigProps {
  options: ConversionOptions;
  onChange: (updated: ConversionOptions) => void;
}

export const ConverterConfig: React.FC<ConverterConfigProps> = ({ options, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWidthChange = (val: number) => {
    onChange({ ...options, targetWidth: val });
  };

  const handleQualityChange = (val: number) => {
    onChange({ ...options, quality: val });
  };

  const handleNameChange = (name: string) => {
    onChange({ ...options, outputName: name });
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        style={{
          width: '100%',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-main)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sliders size={16} color="var(--primary-400)" />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Configurações de Saída</span>
          <span
            style={{
              fontSize: '11px',
              color: 'var(--text-dim)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {options.targetWidth} px • {Math.round(options.quality * 100)}%
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-dim)' }}>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div
          style={{
            padding: '18px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          {/* Nome do arquivo */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: '6px',
              }}
            >
              Nome do arquivo de saída
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={options.outputName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="nome_do_arquivo"
                style={{
                  width: '100%',
                  padding: '9px 70px 9px 12px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  color: 'var(--text-main)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '12px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--primary-400)',
                  fontWeight: 600,
                }}
              >
                .croqui
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
              A extensão .croqui será concatenada automaticamente no download.
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
            }}
          >
            {/* Largura Alvo */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                }}
              >
                <span>Largura máxima (px)</span>
                <span style={{ color: 'var(--primary-300)', fontFamily: 'var(--font-mono)' }}>
                  {options.targetWidth} px
                </span>
              </label>
              <input
                type="number"
                min="300"
                max="4000"
                step="50"
                value={options.targetWidth}
                onChange={(e) => handleWidthChange(Number(e.target.value) || 1300)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  color: 'var(--text-main)',
                }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
                Padrão ideal LPST: 1300 px
              </span>
            </div>

            {/* Qualidade JPEG */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                }}
              >
                Qualidade JPEG
              </label>
              <select
                value={options.quality.toFixed(2)}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                }}
              >
                <option value="0.80">80% - Arquivo menor</option>
                <option value="0.90">90% - Recomendado</option>
                <option value="0.95">95% - Alta fidelidade</option>
                <option value="1.00">100% - Sem perdas visuais</option>
              </select>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
                90% equilibra peso e legibilidade
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
