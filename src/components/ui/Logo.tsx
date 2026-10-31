import React from 'react';

interface LogoProps {
  size?: number;
  showSubtitle?: boolean;
}

/**
 * Símbolo Vetor Forense: V geométrico + direção vetorial + ponto de exame.
 * Duas tintas, escalável, sem iconografia policial ou chancela institucional.
 * O conceito do buraco negro pertence à linguagem do ecossistema ATRATOR,
 * e não precisa competir com a identidade da marca de produto.
 */
export const Logo: React.FC<LogoProps> = ({ size = 38, showSubtitle = true }) => (
  <div className="vf-brand-lockup" aria-label="Vetor Forense, uma tecnologia ATRATOR">
    <svg
      width={size} height={size} viewBox="0 0 64 64"
      role="img" aria-label="Monograma Vetor Forense"
      fill="none"
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#1E333A" />
      <path d="M14 16 31 48 49 16" stroke="#F7F8F5" strokeWidth="6.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 38 43 18" stroke="#C5A06A" strokeWidth="3.5" strokeLinecap="round" />
      <path d="m36 18 7 0 0 7" stroke="#C5A06A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="31.5" cy="31" r="5" fill="#1E333A" stroke="#C5A06A" strokeWidth="2" />
      <circle cx="31.5" cy="31" r="1.5" fill="#F7F8F5" />
    </svg>
    <span className="vf-brand-names">
      <span className="vf-brand-title">VETOR <span>FORENSE</span></span>
      {showSubtitle && <span className="vf-brand-parent">ECOSSISTEMA <strong>ATRATOR</strong></span>}
    </span>
  </div>
);
