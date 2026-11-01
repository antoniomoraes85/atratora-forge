import { useEffect, useRef } from 'react';
import './black-hole-field.css';

const BLACK_HOLE = `${import.meta.env.BASE_URL}hero/atrator-black-hole.avif`;
const FINGERPRINT = `${import.meta.env.BASE_URL}hero/fingerprint-matrix.webp`;

const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

/**
 * As linhas ilustram a convergência de dados da lupa para a região próxima
 * ao horizonte de eventos (limbo esquerdo do disco). São curvas artísticas,
 * não geodésicas relativísticas nem representação de evidências reais.
 *
 * Variação determinística: dispersão de origem, curvaturas intermediárias e
 * pontos de aproximação tangencial diferentes, sem Math.random().
 */
const STREAM_COUNT = 34;
const STREAMS = Array.from({ length: STREAM_COUNT }, (_, index) => {
  const normalized = (index - (STREAM_COUNT - 1) / 2) / ((STREAM_COUNT - 1) / 2);
  const ripple = Math.sin(index * 1.17) * 12 + Math.cos(index * .63) * 7;
  const startX = 400 + (index % 5) * 11;
  const startY = 315 + normalized * 194 + ripple;

  const shoulderX = 640 + (index % 4) * 13;
  const shoulderY = 318 + normalized * 207 + Math.sin(index * .82) * 23;
  const middleX = 823 + (index % 7) * 8;
  const middleY = 318 + normalized * 146 + Math.cos(index * 1.49) * 25;

  // The visible left edge of the photographed accretion ring, not its center.
  const approachY = 312 + normalized * 108 + Math.sin(index * .91) * 9;
  const ringX = 1256 - 175 * Math.sqrt(
    Math.max(.1, 1 - ((approachY - 312) / 192) ** 2)
  );
  const approachX = ringX - 18 - (index % 3) * 7;
  const curveShift = Math.sin(index * 2.07) * 17;

  const d = [
    `M${startX.toFixed(1)} ${startY.toFixed(1)}`,
    // Small turbulent disturbances near the digital evidence.
    `C${(startX + 93).toFixed(1)} ${(startY + curveShift).toFixed(1)}`,
    `${(shoulderX - 103).toFixed(1)} ${(shoulderY - ripple).toFixed(1)}`,
    `${shoulderX.toFixed(1)} ${shoulderY.toFixed(1)}`,
    // Smoother but irregular trajectory across the field.
    `C${(shoulderX + 83).toFixed(1)} ${(shoulderY + curveShift * .7).toFixed(1)}`,
    `${(middleX - 86).toFixed(1)} ${(middleY - curveShift).toFixed(1)}`,
    `${middleX.toFixed(1)} ${middleY.toFixed(1)}`,
    // The flow bends and tightens in the photographed ring's vicinity.
    `C${(middleX + 79).toFixed(1)} ${(middleY + normalized * 21).toFixed(1)}`,
    `${(approachX - 66).toFixed(1)} ${(approachY - normalized * 31).toFixed(1)}`,
    `${(approachX - 23).toFixed(1)} ${(approachY - normalized * 13).toFixed(1)}`,
    `Q${(approachX - 3).toFixed(1)} ${(approachY - normalized * 5).toFixed(1)}`,
    `${approachX.toFixed(1)} ${approachY.toFixed(1)}`,
  ].join(' ');

  return {
    id: index,
    d,
    opacity: .18 + (index % 6) * .043,
    delay: -((index * .71) % 8.7),
    width: index % 7 === 0 ? 1.55 : index % 3 === 0 ? 1.16 : .77,
    duration: 5.6 + (index % 9) * .64,
  };
});

const BINARY_STREAMS = [1, 4, 7, 10, 13, 16, 19, 23, 27, 31];
const BINARY_WORDS = [
  '010110101011001',
  '101100101101110',
  '001011010111010',
  '110010101001101',
  '010101101001011',
];

/**
 * Three visual depths, updated via requestAnimationFrame and CSS variables.
 * Reduced motion removes particle animation; artwork cannot capture clicks.
 */
export const BlackHoleField = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    let frame = 0;
    let x = 0;
    let y = 0;
    let scroll = 0;

    const render = () => {
      frame = 0;
      const still = reduced.matches;
      node.style.setProperty('--pointer-x', still ? '0px' : `${x.toFixed(1)}px`);
      node.style.setProperty('--pointer-y', still ? '0px' : `${y.toFixed(1)}px`);
      node.style.setProperty('--scroll-shift', still ? '0px' : `${scroll.toFixed(1)}px`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const pointer = (event: PointerEvent) => {
      if (reduced.matches || !fine.matches) return;
      const bounds = node.getBoundingClientRect();
      if (bounds.width < 1 || bounds.height < 1 ||
          event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) {
        // Do not leave the field displaced when the pointer exits the banner.
        if (x !== 0 || y !== 0) { x = 0; y = 0; schedule(); }
        return;
      }
      x = clamp(((event.clientX - bounds.left) / bounds.width - .5) * 46, 23);
      y = clamp(((event.clientY - bounds.top) / bounds.height - .5) * 30, 15);
      schedule();
    };

    const onScroll = () => {
      if (reduced.matches) return;
      const bounds = node.getBoundingClientRect();
      scroll = clamp(-bounds.top * .055, 25);
      schedule();
    };
    const resetPointer = () => {
      x = 0;
      y = 0;
      schedule();
    };
    const motionChange = () => {
      if (reduced.matches) { x = 0; y = 0; scroll = 0; }
      schedule();
    };

    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('pointerleave', resetPointer);
    window.addEventListener('scroll', onScroll, { passive: true });
    reduced.addEventListener?.('change', motionChange);
    onScroll();

    return () => {
      window.removeEventListener('pointermove', pointer);
      window.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('scroll', onScroll);
      reduced.removeEventListener?.('change', motionChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="atrator-event-horizon" ref={root} aria-hidden="true" data-parallax="enabled">
      <div className="atrator-depth-evidence">
        <img src={FINGERPRINT} alt="" className="atrator-evidence-photo"
          width="1672" height="941" decoding="async" />
      </div>
      <div className="atrator-depth-back">
        <img className="atrator-photo" src={BLACK_HOLE} alt=""
          width="1672" height="941" decoding="async" />
      </div>

      <div className="atrator-depth-streams">
        <svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid slice" focusable="false">
          <defs>
            <linearGradient id="vf-binary-infall" x1="400" y1="320" x2="1115" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#32F36D" stopOpacity=".28" />
              <stop offset=".23" stopColor="#4EFF8D" stopOpacity=".84" />
              <stop offset=".48" stopColor="#40DDB0" stopOpacity=".8" />
              <stop offset=".71" stopColor="#80C8D0" stopOpacity=".72" />
              <stop offset=".91" stopColor="#DABF90" stopOpacity=".48" />
              <stop offset="1" stopColor="#F5D7A0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="vf-flow-haze" x1="430" y1="320" x2="1115" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#18FA61" stopOpacity="0" />
              <stop offset=".4" stopColor="#3EDFB1" stopOpacity=".11" />
              <stop offset=".78" stopColor="#B7D7C1" stopOpacity=".12" />
              <stop offset="1" stopColor="#F4C37A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="atrator-flow-field" fill="none">
            {STREAMS.map(stream => (
              <g key={stream.id}>
                <path id={`vf-infall-${stream.id}`} d={stream.d}
                  stroke="url(#vf-binary-infall)" strokeWidth={stream.width}
                  strokeLinecap="round" opacity={stream.opacity} />
                <path d={stream.d} className="atrator-infall-particles"
                  stroke="url(#vf-binary-infall)" strokeWidth={stream.width + .65}
                  strokeLinecap="round" strokeDasharray="1 48"
                  style={{
                    animationDelay: `${stream.delay}s`,
                    animationDuration: `${stream.duration}s`,
                    opacity: stream.opacity * .79,
                  }} />
              </g>
            ))}
          </g>
          <g className="atrator-binary-flow" fill="url(#vf-binary-infall)" fontFamily="monospace"
            fontSize="13" letterSpacing="3" opacity=".76">
            {BINARY_STREAMS.map((id, index) => (
              <text key={id} className="atrator-binary-digits"
                style={{ opacity: .74 + (index % 4) * .07 }}>
                <textPath href={`#vf-infall-${id}`} startOffset="-30%">
                  {BINARY_WORDS[index % BINARY_WORDS.length]}
                  <animate attributeName="startOffset"
                    values="-30%;112%" dur={`${7.4 + index * .55}s`}
                    begin={`${index * .45}s`} repeatCount="indefinite" />
                </textPath>
              </text>
            ))}
          </g>
        </svg>
      </div>
      <div className="atrator-depth-core"><div className="atrator-light-haze" /></div>
    </div>
  );
};
