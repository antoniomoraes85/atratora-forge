import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle, RefreshCw, X } from 'lucide-react';
import { ImageSourceMeta } from '../types';
import { formatBytes, loadImageFromFile } from '../services/imageProcessor';

interface ImageUploaderProps {
  selectedMeta: ImageSourceMeta | null;
  onImageLoaded: (image: HTMLImageElement, meta: ImageSourceMeta) => void;
  onClear: () => void;
  onError: (msg: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedMeta,
  onImageLoaded,
  onClear,
  onError,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsLoading(true);
    try {
      const { image, meta } = await loadImageFromFile(file);
      onImageLoaded(image, meta);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao processar arquivo de imagem.';
      onError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/bmp"
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {!selectedMeta ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClickUpload}
          style={{
            minHeight: '220px',
            border: `2px dashed ${isDragging ? 'var(--primary-400)' : 'var(--border-default)'}`,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: isDragging ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-tertiary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 20px',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-400)',
              marginBottom: '16px',
            }}
          >
            {isLoading ? <RefreshCw className="spin" size={26} /> : <UploadCloud size={28} />}
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
            {isDragging ? 'Solte a imagem aqui' : 'Arraste uma imagem aqui'}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            ou clique para <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>selecionar do computador</span>
          </p>

          <div
            style={{
              display: 'flex',
              gap: '6px',
              marginTop: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['JPG', 'JPEG', 'PNG', 'WEBP', 'BMP'].map((fmt) => (
              <span
                key={fmt}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-dim)',
                }}
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Card com Metadados da Imagem Carregada */
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <img
              src={selectedMeta.previewUrl}
              alt="Miniatura"
              style={{
                width: '56px',
                height: '56px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-default)',
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '220px',
                  }}
                  title={selectedMeta.name}
                >
                  {selectedMeta.name}
                </span>
                <CheckCircle size={15} color="var(--success-border)" style={{ flexShrink: 0 }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  fontSize: '12px',
                  color: 'var(--text-dim)',
                  marginTop: '3px',
                  flexWrap: 'wrap',
                }}
              >
                <span>{selectedMeta.naturalWidth} × {selectedMeta.naturalHeight} px</span>
                <span>•</span>
                <span>{formatBytes(selectedMeta.sizeBytes)}</span>
                <span>•</span>
                <span style={{ textTransform: 'uppercase' }}>
                  {selectedMeta.name.split('.').pop()}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <button
              onClick={handleClickUpload}
              className="btn btn-secondary"
              style={{ padding: '7px 12px', fontSize: '12px' }}
              title="Trocar imagem selecionada"
            >
              <RefreshCw size={14} />
              <span>Trocar</span>
            </button>
            <button
              onClick={onClear}
              className="btn btn-secondary"
              style={{ padding: '7px 10px', fontSize: '12px' }}
              title="Remover imagem"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
