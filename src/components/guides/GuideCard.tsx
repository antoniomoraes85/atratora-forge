import React from 'react';
import { ExternalLink, Download } from 'lucide-react';
import { GuideDefinition, GuideStatus, GUIDE_STATUS_LABEL } from '../../app/config/guides';

interface GuideStatusProps {
  status: GuideStatus;
  size?: 'sm' | 'md';
}

export const GuideStatusBadge: React.FC<GuideStatusProps> = ({ status, size = 'md' }) => {
  const fontSize = size === 'sm' ? '9.5px' : '10.5px';
  const padding  = size === 'sm' ? '2px 7px' : '3px 9px';

  const styleMap: Record<GuideStatus, React.CSSProperties> = {
    available: {
      background: 'rgba(16,185,129,0.10)',
      border: '1px solid rgba(5,150,105,0.35)',
      color: '#34d399',
    },
    concept: {
      background: 'rgba(99,102,241,0.10)',
      border: '1px solid rgba(99,102,241,0.30)',
      color: '#a5b4fc',
    },
    planned: {
      background: 'rgba(100,116,139,0.10)',
      border: '1px solid rgba(100,116,139,0.22)',
      color: '#94a3b8',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding,
        fontSize,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderRadius: '9999px',
        whiteSpace: 'nowrap',
        ...styleMap[status],
      }}
    >
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          flexShrink: 0,
        }}
      />
      {GUIDE_STATUS_LABEL[status]}
    </span>
  );
};

interface GuideCardProps {
  guide: GuideDefinition;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  const isAvailable = guide.status === 'available';
  
  // Utilizar BASE_URL para não quebrar no GitHub Pages e afins
  const baseUrl = import.meta.env.BASE_URL || '/';
  const imageUrl = `${baseUrl}guides/${guide.image}`.replace('//', '/');

  return (
    <article
      className={`card card-hover`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        padding: '0',
        overflow: 'hidden',
        borderColor: isAvailable ? 'rgba(99,102,241,0.25)' : 'var(--border-subtle)',
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '52%',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          alt={`Guia: ${guide.title}`}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isAvailable ? 1 : 0.9,
            filter: 'none',
          }}
          onError={(e) => {
            // Placeholder se imagem não existir
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
          }}
        />

        {/* Overlay leve para guias não disponíveis (para evidenciar o status, mas sem esconder a imagem) */}
        {!isAvailable && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(4, 10, 20, 0.15)',
              pointerEvents: 'none'
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#e2e8f0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textAlign: 'center',
                padding: '6px 12px',
                background: 'rgba(7,9,16,0.85)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {GUIDE_STATUS_LABEL[guide.status]}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
            }}
          >
            {guide.title}
          </h3>
          <GuideStatusBadge status={guide.status} size="sm" />
        </div>

        <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.5, flex: 1 }}>
          {guide.description}
        </p>

        {guide.topics && guide.topics.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {guide.topics.slice(0, 3).map((topic) => (
              <span key={topic} className="tag" style={{ fontSize: '10px' }}>
                {topic}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ flex: 1, fontSize: '12px', padding: '8px 14px' }}
            aria-label={`Ver guia: ${guide.title}`}
          >
            Ver guia <ExternalLink size={14} style={{ marginLeft: '2px' }} />
          </a>
          <a
            href={imageUrl}
            download={guide.image}
            className="btn btn-secondary"
            style={{ fontSize: '12px', padding: '8px 14px' }}
            title="Baixar guia"
            aria-label={`Baixar guia: ${guide.title}`}
          >
            <Download size={14} />
          </a>
        </div>
        
        {!isAvailable && (
          <p style={{ fontSize: '10px', color: 'var(--text-dim)', textAlign: 'center', marginTop: '2px' }}>
            Ferramenta ainda em desenvolvimento.
          </p>
        )}
      </div>
    </article>
  );
};
