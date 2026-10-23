import React from 'react';

interface LogoProps {
  size?: number;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 36, showSubtitle = true }) => {
  const gradientId = React.useId().replace(/:/g, '');
  return (
    <div className="vf-brand-lockup" aria-label="Vetor Forense, tecnologia ATRATOR">
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Símbolo Vetor Forense" fill="none">
        <defs>
          <linearGradient id={gradientId} x1="4" y1="7" x2="56" y2="59" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2F0EB" />
            <stop offset=".46" stopColor="#AAB0B7" />
            <stop offset="1" stopColor="#D8A23A" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="29" stroke="#D8A23A" strokeOpacity=".45" strokeWidth="1.3"/>
        <circle cx="32" cy="32" r="20" stroke="#B9BDC2" strokeOpacity=".25" strokeDasharray="2 5"/>
        <path d="M10 16 28 54 52 9" stroke={`url(#${gradientId})`} strokeWidth="8" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M9 43C19 22 36 12 56 23" stroke="#E8B45C" strokeWidth="2.4" strokeLinecap="round"/>
        <path d="m48 18 9 5-9 5" stroke="#E8B45C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 4v6m0 44v6M4 32h6m44 0h6" stroke="#C5C9CE" strokeOpacity=".55" strokeWidth="1.3"/>
      </svg>
      <span className="vf-brand-names">
        <span className="vf-brand-title">VETOR <span>FORENSE</span></span>
        {showSubtitle && <span className="vf-brand-parent">UMA TECNOLOGIA <strong>ATRATOR</strong></span>}
      </span>
    </div>
  );
};
