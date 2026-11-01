import { useEffect, useRef } from 'react';
import './black-hole-field.css';

const BLACK_HOLE = `${import.meta.env.BASE_URL}hero/atrator-black-hole.avif`;
const FINGERPRINT = `${import.meta.env.BASE_URL}hero/fingerprint-matrix.webp`;

const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

/**
 * Trajetórias ilustrativas: saem da impressão digital à esquerda e convergem
 * para o horizonte de eventos do buraco negro à direita. Não representam
 * geodésicas físicas, evidência real nem processamento de dados do usuário.
 */
const STREAMS = Array.from({ length: 24 }, (_, index) => {
  const spread = index - 11.5;
  const startX = 455 + (index % 4) * 11;
  const startY = 311 + spread * 9.6;
  const endX = 1190 + (index % 3) * 2;
  const endY = 320 + spread * 1.65;
  const c1x = 670 + (index % 3) * 9;
  const c1y = 306 + spread * 11.4;
  const c2x = 1017;
  const c2y = 323 + spread * 4.1;
  return {
    id: index,
    d: `M${startX.toFixed(1)} ${startY.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x} ${c2y.toFixed(1)} ${endX} ${endY.toFixed(1)}`,
    opacity: .28 + (index % 5) * .065,
    delay: -(index * .73) % 11,
  };
});

/**
 * Composição em duas cenas com profundidades independentes.
 * Parallax por pointer/scroll escreve apenas CSS variables em rAF e não
 * re-renderiza React. A arte é decorativa, não bloqueia eventos.
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
      // Restringe o efeito à área visual, mesmo com listener na janela.
      if (bounds.width < 1 || bounds.height < 1 ||
          event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) return;
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
            <linearGradient id="vf-binary-infall" x1="440" y1="320" x2="1200" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#40FF79" stopOpacity=".70" />
              <stop offset=".25" stopColor="#36F9A0" stopOpacity=".95" />
              <stop offset=".55" stopColor="#60C9C8" stopOpacity=".9" />
              <stop offset=".80" stopColor="#D8C09A" stopOpacity=".85" />
              <stop offset="1" stopColor="#F9D69B" stopOpacity=".15" />
            </linearGradient>
            <linearGradient id="vf-flow-haze" x1="400" y1="320" x2="1210" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#18FA61" stopOpacity="0" />
              <stop offset=".44" stopColor="#3EDFB1" stopOpacity=".14" />
              <stop offset=".75" stopColor="#B7D7C1" stopOpacity=".12" />
              <stop offset="1" stopColor="#F4C37A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="atrator-flow-field" fill="none">
            {STREAMS.map(stream => (
              <g key={stream.id}>
                <path id={`vf-infall-${stream.id}`} d={stream.d}
                  stroke="url(#vf-binary-infall)"
                  strokeWidth={stream.id % 6 === 0 ? 1.7 : .9}
                  strokeLinecap="round" opacity={stream.opacity} />
                <path d={stream.d} className="atrator-infall-particles"
                  stroke="url(#vf-binary-infall)" strokeWidth="2.25"
                  strokeLinecap="round" strokeDasharray="2 42"
                  style={{ animationDelay: `${stream.delay}s`, opacity: stream.opacity * .86 }} />
              </g>
            ))}
          </g>
          <g className="atrator-binary-flow" fill="#66F6A4" fontFamily="monospace"
            fontSize="14" letterSpacing="4" opacity=".84">
            {[2, 5, 8, 11, 14, 17, 20].map((id, index) => (
              <text key={id} className="atrator-binary-digits">
                <textPath href={`#vf-infall-${id}`} startOffset="0%">
                  {index % 2 ? '101100101101' : '010110101011'}
                  <animate attributeName="startOffset"
                    values="-24%;112%" dur={`${8 + index * .8}s`}
                    begin={`${index * .9}s`} repeatCount="indefinite" />
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
