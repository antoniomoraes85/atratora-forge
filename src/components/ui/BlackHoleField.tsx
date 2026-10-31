import { useEffect, useRef, useState } from 'react';
import './black-hole-field.css';

/** Smooth, deterministic vector streamlines. Decorative only: no WebGL/canvas or network. */
const STREAMS = Array.from({ length: 18 }, (_, index) => {
  const phase = (index / 18) * Math.PI * 2;
  const points = Array.from({ length: 104 }, (_, p) => {
    const t = p / 103;
    const radius = 340 - 282 * Math.pow(t, 0.82);
    const angle = phase + (t * 2.12) + 0.18 * Math.sin(t * 4.1);
    const x = 445 + Math.cos(angle) * radius;
    const y = 270 + Math.sin(angle) * radius * 0.77;
    return `${p === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return { id: index, d: points.join(' '), opacity: 0.13 + (index % 4) * 0.042 };
});

/**
 * Discreet ATRATOR black hole: accretion lines curve toward the dark center.
 * Motion respects prefers-reduced-motion. Pointer/scroll parallax is clamped.
 */
export const BlackHoleField = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0, scroll: 0 });
  const reduced = useRef(false);
  const pending = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMedia = () => {
      reduced.current = media.matches;
      if (media.matches) setOffset({ x: 0, y: 0, scroll: 0 });
    };
    updateMedia();
    media.addEventListener?.('change', updateMedia);
    const scroll = () => {
      if (reduced.current || pending.current !== null) return;
      pending.current = window.requestAnimationFrame(() => {
        setOffset(previous => ({ ...previous, scroll: Math.max(0, Math.min(window.scrollY * 0.035, 18)) }));
        pending.current = null;
      });
    };
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', scroll);
      media.removeEventListener?.('change', updateMedia);
      if (pending.current !== null) window.cancelAnimationFrame(pending.current);
    };
  }, []);

  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced.current || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setOffset(previous => ({
      ...previous,
      x: Math.max(-10, Math.min(10, ((event.clientX - bounds.left) / bounds.width - 0.5) * 17)),
      y: Math.max(-9, Math.min(9, ((event.clientY - bounds.top) / bounds.height - 0.5) * 15)),
    }));
  };
  const pointerLeave = () => {
    if (!reduced.current) setOffset(previous => ({ ...previous, x: 0, y: 0 }));
  };

  return (
    <div className="atrator-event-horizon" aria-hidden="true" onPointerMove={pointerMove} onPointerLeave={pointerLeave}>
      <div
        className="atrator-event-horizon-layer"
        style={{ transform: `translate3d(${offset.x}px,${offset.y + offset.scroll}px,0)` }}
      >
        <svg viewBox="0 0 900 550" fill="none" preserveAspectRatio="xMidYMid meet" focusable="false">
          <defs>
            <radialGradient id="vf-accretion" cx="0" cy="0" r="1" gradientTransform="translate(445 270) rotate(90) scale(238 286)" gradientUnits="userSpaceOnUse">
              <stop offset="0.19" stopColor="#132830" stopOpacity="0.00" />
              <stop offset="0.30" stopColor="#C49B60" stopOpacity="0.10" />
              <stop offset="0.53" stopColor="#BCA888" stopOpacity="0.025" />
              <stop offset="1" stopColor="#E0E7E7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vf-horizon" cx=".3" cy=".24" r=".83">
              <stop stopColor="#30444A" />
              <stop offset=".52" stopColor="#18282E" />
              <stop offset="1" stopColor="#071317" />
            </radialGradient>
            <linearGradient id="vf-light-line" x1="160" y1="120" x2="670" y2="410">
              <stop stopColor="#71838A" stopOpacity=".07" />
              <stop offset=".50" stopColor="#B38B55" stopOpacity=".62" />
              <stop offset="1" stopColor="#73848A" stopOpacity=".14" />
            </linearGradient>
            <filter id="vf-horizon-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>

          <ellipse cx="445" cy="270" rx="310" ry="255" fill="url(#vf-accretion)" />
          <g className="atrator-flow-field">
            {STREAMS.map(stream => (
              <path
                key={stream.id}
                d={stream.d}
                stroke="url(#vf-light-line)"
                strokeWidth={stream.id % 5 === 0 ? 1.6 : .85}
                opacity={stream.opacity}
                strokeLinecap="round"
              />
            ))}
          </g>
          <g className="atrator-orbits" stroke="#A68758">
            <ellipse cx="445" cy="270" rx="164" ry="76" strokeOpacity=".10" strokeWidth="1" transform="rotate(-28 445 270)" />
            <ellipse cx="445" cy="270" rx="132" ry="98" strokeOpacity=".11" strokeWidth=".85" transform="rotate(31 445 270)" />
            <ellipse cx="445" cy="270" rx="213" ry="121" strokeOpacity=".075" strokeWidth=".8" transform="rotate(-18 445 270)" />
          </g>
          <ellipse cx="445" cy="270" rx="92" ry="70" fill="#C5A06A" opacity=".25" filter="url(#vf-horizon-glow)" />
          <circle cx="445" cy="270" r="64" fill="url(#vf-horizon)" />
          <circle cx="445" cy="270" r="66" stroke="#A7895A" strokeOpacity=".5" strokeWidth="1.7" />
          <circle cx="445" cy="270" r="71" stroke="#D9C5A3" strokeOpacity=".12" strokeWidth="1" />
          <ellipse cx="445" cy="270" rx="157" ry="44" transform="rotate(-17 445 270)" stroke="#9A7D51" strokeOpacity=".27" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
};
