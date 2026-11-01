import { useEffect, useRef } from 'react';
import './black-hole-field.css';

const BLACK_HOLE = `${import.meta.env.BASE_URL}hero/atrator-black-hole.avif`;
const FINGERPRINT = `${import.meta.env.BASE_URL}hero/fingerprint-matrix.webp`;

const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

/**
 * Fluxo gráfico conceitual: linhas nascem na lupa e convergem para o limbo
 * aparente do disco de acreção da imagem. Não são geodésicas físicas.
 *
 * A sequência é determinística para evitar diferenças de SSR/hidratação.
 * Prioriza a percepção de densidade sem criar 96 animações simultâneas:
 * 96 linhas estáticas, 48 partículas móveis e 20 trilhas binárias.
 */
const STREAM_COUNT = 96;
const STREAMS = Array.from({ length: STREAM_COUNT }, (_, index) => {
  const position = (index - (STREAM_COUNT - 1) / 2) / ((STREAM_COUNT - 1) / 2);
  const ripple = Math.sin(index * 1.37) * 14 + Math.cos(index * .77) * 8;
  const startX = 393 + (index % 7) * 9;
  const startY = 315 + position * 218 + ripple;

  const shoulderX = 617 + (index % 6) * 12;
  const shoulderY = 315 + position * 206 + Math.sin(index * .94) * 24;
  const middleX = 810 + (index % 9) * 8;
  const middleY = 316 + position * 148 + Math.cos(index * 1.17) * 18;

  // Approximate the photographed ring's visible left edge, not the physical
  // event horizon. Tighten the bundle and bend toward its tangent.
  const approachY = 313 + position * 98 + Math.sin(index * .81) * 8;
  const ringX = 1256 - 175 * Math.sqrt(
    Math.max(.1, 1 - ((approachY - 312) / 192) ** 2)
  );
  const approachX = ringX - 23 - (index % 4) * 5;
  const turbulence = Math.sin(index * 2.09) * 19;

  const d = [
    `M${startX.toFixed(1)} ${startY.toFixed(1)}`,
    `C${(startX + 86).toFixed(1)} ${(startY + turbulence).toFixed(1)}`,
    `${(shoulderX - 91).toFixed(1)} ${(shoulderY - ripple).toFixed(1)}`,
    `${shoulderX.toFixed(1)} ${shoulderY.toFixed(1)}`,
    `C${(shoulderX + 78).toFixed(1)} ${(shoulderY + turbulence * .78).toFixed(1)}`,
    `${(middleX - 67).toFixed(1)} ${(middleY - turbulence).toFixed(1)}`,
    `${middleX.toFixed(1)} ${middleY.toFixed(1)}`,
    `C${(middleX + 75).toFixed(1)} ${(middleY + position * 18).toFixed(1)}`,
    `${(approachX - 66).toFixed(1)} ${(approachY - position * 36).toFixed(1)}`,
    `${(approachX - 20).toFixed(1)} ${(approachY - position * 11).toFixed(1)}`,
    `Q${(approachX - 5).toFixed(1)} ${(approachY - position * 4).toFixed(1)}`,
    `${approachX.toFixed(1)} ${approachY.toFixed(1)}`,
  ].join(' ');

  return {
    id: index,
    d,
    opacity: .13 + (index % 8) * .029,
    width: index % 11 === 0 ? 1.42 : index % 4 === 0 ? .95 : .62,
    duration: 8.4 + (index % 13) * .28,
    delay: -((index * .83) % 10.4),
  };
});

// Moving marks are deliberately fewer than the static threads to keep the
// composition responsive on older phones and laptops.
const PARTICLE_STREAMS = STREAMS.filter(stream => stream.id % 2 === 0);
const BINARY_STREAMS = [
  1, 5, 9, 13, 17, 21, 25, 29, 33, 37,
  41, 45, 49, 53, 57, 61, 65, 69, 77, 89,
];

const BINARY_WORDS = [
  '010110101011001',
  '101100101101110',
  '001011010111010',
  '110010101001101',
  '010101101001011',
];

/**
 * Animations follow the entire Bézier curve with increasing speed:
 * cubic spline progress (0.70,0,0.90,0.35) starts slowly and accelerates
 * toward the destination. A slower overall cadence does not imply
 * constant-speed motion. Reduced-motion users see only static flow lines.
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
    const resetPointer = () => { x = 0; y = 0; schedule(); };
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
            <linearGradient id="vf-binary-infall" x1="395" y1="320" x2="1115" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#32F36D" stopOpacity=".15" />
              <stop offset=".2" stopColor="#4EFF8D" stopOpacity=".75" />
              <stop offset=".47" stopColor="#40DDB0" stopOpacity=".82" />
              <stop offset=".72" stopColor="#80C8D0" stopOpacity=".8" />
              <stop offset=".92" stopColor="#DABF90" stopOpacity=".64" />
              <stop offset="1" stopColor="#F5D7A0" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="vf-particle-light">
              <stop offset="0" stopColor="#F5FFEA" stopOpacity=".95" />
              <stop offset=".45" stopColor="#5EFF98" stopOpacity=".8" />
              <stop offset="1" stopColor="#1CEB71" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="atrator-flow-field" fill="none">
            {STREAMS.map(stream => (
              <path key={stream.id}
                id={`vf-infall-${stream.id}`}
                d={stream.d}
                stroke="url(#vf-binary-infall)"
                strokeWidth={stream.width}
                strokeLinecap="round"
                opacity={stream.opacity} />
            ))}
          </g>
          <g className="atrator-moving-particles">
            {PARTICLE_STREAMS.map(stream => (
              <g key={stream.id} className="atrator-infall-particles"
                style={{ opacity: .42 + (stream.id % 4) * .12 }}>
                <ellipse cx="-6" cy="0" rx="12" ry="1.4" fill="url(#vf-particle-light)" />
                <circle cx="0" cy="0" r="2.2" fill="#A6FCCC" />
                <animateMotion path={stream.d} dur={`${stream.duration}s`}
                  begin={`${stream.delay}s`} repeatCount="indefinite"
                  rotate="auto" calcMode="spline" keyTimes="0;1"
                  keySplines=".70 0 .90 .35" />
                <animate attributeName="opacity"
                  values="0;.30;.80;1;0" keyTimes="0;.13;.55;.91;1"
                  dur={`${stream.duration}s`} begin={`${stream.delay}s`}
                  repeatCount="indefinite" />
              </g>
            ))}
          </g>
          <g className="atrator-binary-flow" fill="url(#vf-binary-infall)" fontFamily="monospace"
            fontSize="12" letterSpacing="3" opacity=".83">
            {BINARY_STREAMS.map((id, index) => (
              <text key={id} className="atrator-binary-digits"
                style={{ opacity: .70 + (index % 4) * .08 }}>
                <textPath href={`#vf-infall-${id}`} startOffset="-32%">
                  {BINARY_WORDS[index % BINARY_WORDS.length]}
                  <animate attributeName="startOffset"
                    values="-32%;114%" dur={`${9.6 + index * .28}s`}
                    begin={`${-((index * .89) % 11)}s`}
                    calcMode="spline" keyTimes="0;1"
                    keySplines=".70 0 .90 .35"
                    repeatCount="indefinite" />
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
