import React, { useEffect, useCallback } from 'react';
import { X, Download, Maximize2, ExternalLink } from 'lucide-react';
import { GuideDefinition, GUIDE_STATUS_LABEL } from '../../app/config/guides';
import { GuideStatusBadge } from './GuideCard';

interface GuideViewerProps {
  guide: GuideDefinition;
  onClose: () => void;
}

export const GuideViewer: React.FC<GuideViewerProps> = ({ guide, onClose }) => {
  const isAvailable = guide.status === 'available';
  const imageUrl = `./guides/${guide.image}`;

  // Fechar no ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Travar scroll do body
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = guide.image;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenFull = () => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(7, 9, 16, 0.85)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal Container */}
      <div
        className="card animate-fade-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: 'calc(100vh - 40px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-highlight)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 1001,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {guide.title}
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '2px' }}>
                {guide.description}
              </p>
            </div>
            <div className="hide-mobile">
              <GuideStatusBadge status={guide.status} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleOpenFull}
              className="btn btn-secondary hide-mobile"
              style={{ padding: '8px 12px' }}
              title="Abrir imagem em nova guia"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-secondary hide-mobile"
              style={{ padding: '8px 12px' }}
              title="Baixar guia"
            >
              <Download size={16} />
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '8px 12px', color: 'var(--text-main)' }}
              title="Fechar (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content (Image Viewer) */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
            backgroundColor: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '100%',
              margin: 'auto',
            }}
          >
            <img
              src={imageUrl}
              alt={`Guia completo: ${guide.title}`}
              style={{
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-default)',
                opacity: isAvailable ? 1 : 0.5,
                filter: isAvailable ? 'none' : 'grayscale(40%)',
              }}
            />

            {!isAvailable && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--bg-glass)',
                    backdropFilter: 'blur(8px)',
                    padding: '16px 32px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {GUIDE_STATUS_LABEL[guide.status]}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Esta imagem é apenas ilustrativa/conceitual.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Actions Footer */}
        <div
          className="mobile-actions"
          style={{
            display: 'none',
            padding: '16px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
            gap: '8px',
          }}
        >
           <button
              onClick={handleOpenFull}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '10px' }}
            >
              <ExternalLink size={16} /> Tela Cheia
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '10px' }}
            >
              <Download size={16} /> Baixar
            </button>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-actions { display: flex !important; }
        }
      `}</style>
    </div>
  );
};
