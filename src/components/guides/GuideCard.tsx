import React from 'react';
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
  onView: (guide: GuideDefinition) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onView }) => {
  const isAvailable = guide.status === 'available';

  return (
    <article
      className={`card ${isAvailable ? 'card-hover' : ''}`}
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
          src={`./guides/${guide.image}`}
          alt={`Guia: ${guide.title}`}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isAvailable ? 1 : 0.45,
            filter: isAvailable ? 'none' : 'grayscale(40%)',
          }}
          onError={(e) => {
            // Placeholder se imagem não existir
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
          }}
        />

        {/* Overlay para guias não disponíveis */}
        {!isAvailable && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(7,9,16,0.55)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textAlign: 'center',
                padding: '6px 12px',
                background: 'rgba(7,9,16,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
              }}
            >
              {GUIDE_STATUS_LABEL[guide.status]}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: isAvailable ? 'var(--text-primary)' : 'var(--text-muted)',
              lineHeight: 1.3,
            }}
          >
            {guide.title}
          </h3>
          <GuideStatusBadge status={guide.status} size="sm" />
        </div>

        <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
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

        <button
          id={`guide-view-${guide.id}`}
          onClick={() => onView(guide)}
          disabled={!isAvailable}
          className={isAvailable ? 'btn btn-primary' : 'btn btn-secondary'}
          style={{ width: '100%', marginTop: '4px', fontSize: '12px', padding: '8px 14px' }}
          aria-label={`Ver guia: ${guide.title}`}
        >
          {isAvailable ? 'Ver guia' : 'Disponível em breve'}
        </button>
      </div>
    </article>
  );
};
