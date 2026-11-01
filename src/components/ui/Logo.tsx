import type { FC } from 'react';

interface LogoProps {
  size?: number;
  showSubtitle?: boolean;
}

/**
 * Identidade Vetor Forense: emblema VT com lente e impressão digital,
 * baseado na arte aprovada pelo titular. Imagem local otimizada, sem CDN.
 */
export const Logo: FC<LogoProps> = ({ size = 52, showSubtitle = true }) => (
  <div className="vf-brand-lockup" aria-label="Vetor Forense, ecossistema ATRATOR">
    <img
      className="vf-brand-emblem"
      src={`${import.meta.env.BASE_URL}brand/vt-emblem.webp`}
      width={size}
      height={size}
      alt="Monograma VT dourado com lupa e impressão digital"
      decoding="async"
    />
    <span className="vf-brand-names">
      <span className="vf-brand-title">VETOR <span>FORENSE</span></span>
      {showSubtitle && <span className="vf-brand-parent">ECOSSISTEMA <strong>ATRATOR</strong></span>}
    </span>
  </div>
);
