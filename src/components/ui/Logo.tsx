import React from 'react';
import logoImg from '../../assets/brand/atratora-forge-logo.png';

interface LogoProps {
  size?: number;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 36, showSubtitle = true }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', userSelect: 'none' }}>
      <img
        src={logoImg}
        alt="Atratora Forge Logo"
        width={size}
        height={size}
        style={{
          flexShrink: 0,
          objectFit: 'contain',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#f8fafc',
            lineHeight: 1.1,
          }}
        >
          Atratora Forge
        </span>
        {showSubtitle && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#818cf8',
              marginTop: '2px',
            }}
          >
            by Atratora Labs
          </span>
        )}
      </div>
    </div>
  );
};
