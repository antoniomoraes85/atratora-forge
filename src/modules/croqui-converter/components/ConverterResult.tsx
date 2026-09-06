import React from 'react';
import { Download, CheckCircle2, RotateCcw } from 'lucide-react';
import { ConversionResult } from '../types';
import { formatBytes } from '../services/imageProcessor';
import { downloadCroquiBlob } from '../serializer/downloadCroqui';

interface ConverterResultProps {
  result: ConversionResult | null;
  onReset: () => void;
}

export const ConverterResult: React.FC<ConverterResultProps> = ({ result, onReset }) => {
  if (!result) return null;

  const handleDownload = () => {
    downloadCroquiBlob(result.blob, result.fileName);
  };

  return (
    <div
      className="card animate-fade-in"
      style={{
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        border: '1px solid var(--success-border)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--success-text)',
            }}
          >
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
              Arquivo gerado com sucesso!
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              O payload JSON compatível com o editor Fabric.js / LPST está pronto.
            </p>
          </div>
        </div>

        <span className="badge badge-success" style={{ fontSize: '11px' }}>
          Pronto
        </span>
      </div>

      {/* Metadata summary of generated file */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          padding: '12px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          fontSize: '12px',
        }}
      >
        <div>
          <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: '2px' }}>
            Nome Final
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--primary-300)',
              wordBreak: 'break-all',
            }}
          >
            {result.fileName}
          </span>
        </div>

        <div>
          <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: '2px' }}>
            Resolução de Saída
          </span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            {result.outputWidth} × {result.outputHeight} px
          </span>
        </div>

        <div>
          <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: '2px' }}>
            Tamanho Estimado
          </span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            {formatBytes(result.sizeBytes)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          type="button"
          data-guide="download"
          onClick={handleDownload}
          className="btn btn-success"
          style={{ flex: 1, minWidth: '180px', padding: '12px 20px', fontSize: '14px' }}
        >
          <Download size={18} />
          <span>Baixar .CROQUI</span>
        </button>

        <button
          onClick={onReset}
          className="btn btn-secondary"
          style={{ padding: '12px 18px', fontSize: '14px' }}
          title="Limpar formulário e converter outra imagem"
        >
          <RotateCcw size={16} />
          <span>Converter outra imagem</span>
        </button>
      </div>
    </div>
  );
};
