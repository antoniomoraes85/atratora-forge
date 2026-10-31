import type { FC } from 'react';

interface LogoProps {
  size?: number;
  showSubtitle?: boolean;
}

/** Identidade ATRATOR — vetor direcional, vórtice de espaço-tempo e ponto de análise.
 * O símbolo é conceitual e não representa órgão público ou certificação pericial.
 */
export const Logo: FC<LogoProps> = ({ size = 40, showSubtitle = true }) => (
  <div className="vf-brand-lockup" aria-label="Vetor Forense, ecossistema ATRATOR">
    <svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      role="img" aria-label="Monograma Vetor Forense" focusable="false"
    >
      <defs>
        <linearGradient id="vf-brand-tile" x1="8" y1="7" x2="57" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#144553" />
          <stop offset="1" stopColor="#102b35" />
        </linearGradient>
        <linearGradient id="vf-brand-gold" x1="12" y1="50" x2="54" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5D891" />
          <stop offset=".57" stopColor="#D4AA5C" />
          <stop offset="1" stopColor="#F0C477" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#vf-brand-tile)" />
      <g stroke="#A9C0C1" strokeLinecap="round" strokeWidth=".65" opacity=".64">
        <ellipse cx="32" cy="18" rx="20" ry="6" />
        <ellipse cx="32" cy="21" rx="16" ry="5" />
        <ellipse cx="32" cy="25" rx="11" ry="3.6" />
        <path d="M12 18c5 1 12 15 20 22 7-7 15-21 20-22M20 20c3 9 7 16 12 21 5-5 9-12 12-21M32 12v29" />
      </g>
      <path d="M14 20 32 54 50 20" stroke="#F9F8F4" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
      <g stroke="url(#vf-brand-gold)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 42C19 53 34 40 42 27l9-13" strokeWidth="3.1" />
        <path d="m43 14 9-2-1 10" strokeWidth="3.4" />
        <ellipse cx="29.5" cy="35" rx="9.3" ry="5.1" transform="rotate(-26 29.5 35)" strokeWidth="1.7" />
      </g>
      <circle cx="31" cy="34" r="3.4" fill="#09232B" stroke="#F4D28C" strokeWidth="1.9" />
      <circle cx="31" cy="34" r=".9" fill="#FFF1CB" />
    </svg>
    <span className="vf-brand-names">
      <span className="vf-brand-title">VETOR <span>FORENSE</span></span>
      {showSubtitle && <span className="vf-brand-parent">ECOSSISTEMA <strong>ATRATOR</strong></span>}
    </span>
  </div>
);
