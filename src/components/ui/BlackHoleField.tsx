import { useEffect, useRef } from 'react';
import './black-hole-field.css';

/**
 * Vetorial, determinístico e decorativo. Cada linha parte de uma região externa
 * e termina próxima ao horizonte. Não representa simulação física de lente gravitacional.
 */
const STREAMS = Array.from({ length: 24 }, (_, index) => {
  const origin = (index / 24) * Math.PI * 2 + 0.07;
  const path = Array.from({ length: 82 }, (_, point) => {
    const t = point / 81;
    const radius = 440 - 353 * (t ** 0.83);
    const angle = origin + 1.9 * t + 0.06 * Math.sin(t * 7 + index);
    const x = 480 + Math.cos(angle) * radius;
    const y = 280 + Math.sin(angle) * radius * 0.78;
    return `${point === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  return {
    id: index,
    path,
    opacity: 0.27 + ((index * 7) % 11) * 0.018,
    delay: -((index * 1.7) % 9),
  };
});

const BEAMS = [
  'M 980 65 C 814 112 710 162 594 221 C 546 246 542 264 531 277',
  'M 960 459 C 807 434 691 386 596 333 C 557 313 542 292 532 279',
  'M 880 0 C 786 92 688 128 595 207 C 556 241 544 266 536 277',
  'M 946 550 C 794 482 720 422 622 356 C 564 318 543 295 532 281',
];

const clamp = (value: number, limit: number) =>
  Math.min(limit, Math.max(-limit, value));

/**
 * Parallax em três profundidades usando CSS custom properties. O tracking é
 * único por frame; não causa re-render de React nem intercepta cliques.
 */
export const BlackHoleField = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let frame = 0;
    let px = 0;
    let py = 0;
    let scroll = 0;

    const render = () => {
      frame = 0;
      if (reduced.matches) {
        node.style.setProperty('--pointer-x', '0px');
        node.style.setProperty('--pointer-y', '0px');
        node.style.setProperty('--scroll-shift', '0px');
        return;
      }
      node.style.setProperty('--pointer-x', `${px.toFixed(2)}px`);
      node.style.setProperty('--pointer-y', `${py.toFixed(2)}px`);
      node.style.setProperty('--scroll-shift', `${scroll.toFixed(2)}px`);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    const pointer = (event: PointerEvent) => {
      if (reduced.matches || !finePointer.matches) return;
      const bounds = node.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;
      px = clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 48, 24);
      py = clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 32, 16);
      schedule();
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      schedule();
    };
    const onScroll = () => {
      if (reduced.matches) return;
      const bounds = node.getBoundingClientRect();
      scroll = clamp((bounds.top - 130) * -0.055, 24);
      schedule();
    };
    const motionChange = () => {
      if (reduced.matches) { px = 0; py = 0; scroll = 0; }
      schedule();
    };

    // Ouvir movimento na janela evita o bug da camada decorativa ficar sob
    // títulos e botões e por isso nunca receber pointermove.
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    reduced.addEventListener?.('change', motionChange);
    onScroll();

    return () => {
      window.removeEventListener('pointermove', pointer);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      reduced.removeEventListener?.('change', motionChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="atrator-event-horizon" ref={root} aria-hidden="true" data-parallax="enabled">
      <div className="atrator-depth-back">
        <svg viewBox="0 0 960 560" preserveAspectRatio="xMidYMid meet" focusable="false">
          <defs>
            <radialGradient id="vf-nebula" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#D3AA70" stopOpacity=".24" />
              <stop offset=".34" stopColor="#315261" stopOpacity=".20" />
              <stop offset=".72" stopColor="#294552" stopOpacity=".08" />
              <stop offset="1" stopColor="#172732" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="490" cy="284" rx="390" ry="252" fill="url(#vf-nebula)" />
          <g stroke="#B0C2C8" opacity=".11" fill="none">
            <path d="M0 118H960M0 279H960M0 443H960" strokeDasharray="2 18" />
            <path d="M168 0V560M480 0V560M785 0V560" strokeDasharray="2 18" />
          </g>
          {Array.from({ length: 18 }, (_, n) => (
            <circle key={n} cx={60 + ((n * 131) % 842)} cy={34 + ((n * 89) % 495)}
              r={n % 5 === 0 ? 1.6 : 0.85} fill="#D8C5A8" opacity={0.18 + (n % 4) * .1} />
          ))}
        </svg>
      </div>

      <div className="atrator-depth-streams">
        <svg viewBox="0 0 960 560" preserveAspectRatio="xMidYMid meet" focusable="false">
          <defs>
            <linearGradient id="vf-infall" x1="0" y1="0" x2="1" y2=".8">
              <stop offset="0" stopColor="#8AA9B6" stopOpacity=".26" />
              <stop offset=".46" stopColor="#D9BB91" stopOpacity=".92" />
              <stop offset="1" stopColor="#E9D5B3" stopOpacity=".38" />
            </linearGradient>
            <linearGradient id="vf-arc" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#E8CAA1" stopOpacity=".16" />
              <stop offset=".35" stopColor="#D6B27F" stopOpacity=".9" />
              <stop offset=".65" stopColor="#FFF3D8" stopOpacity=".85" />
              <stop offset="1" stopColor="#A7885D" stopOpacity=".14" />
            </linearGradient>
          </defs>
          <g className="atrator-flow-field">
            {STREAMS.map(stream => (
              <g key={stream.id}>
                <path d={stream.path} fill="none" stroke="url(#vf-infall)"
                  strokeWidth={stream.id % 5 === 0 ? 1.45 : .8}
                  opacity={stream.opacity} strokeLinecap="round" />
                <path d={stream.path} fill="none" className="atrator-infall-particles"
                  stroke="#F4D5A2" strokeWidth={stream.id % 6 === 0 ? 2.2 : 1.35}
                  strokeDasharray="1 43" strokeLinecap="round"
                  style={{ animationDelay: `${stream.delay}s`, opacity: stream.opacity * .84 }} />
              </g>
            ))}
          </g>
          {BEAMS.map((path, index) => (
            <path key={index} d={path} fill="none" stroke="url(#vf-arc)"
              strokeWidth={index % 2 ? 1.2 : 1.7} strokeLinecap="round" opacity=".42" />
          ))}
          <g fill="none" transform="rotate(-21 480 280)">
            <ellipse cx="480" cy="280" rx="224" ry="91" stroke="#9FB5B8" strokeOpacity=".17" strokeWidth=".75" />
            <ellipse cx="480" cy="280" rx="184" ry="68" stroke="#D6B079" strokeOpacity=".23" strokeWidth="1.1" />
            <ellipse cx="480" cy="280" rx="147" ry="48" stroke="url(#vf-arc)" strokeWidth="2.8" strokeOpacity=".72" />
            <ellipse cx="480" cy="280" rx="152" ry="51" stroke="#E5C591" strokeWidth="11" strokeOpacity=".08" />
          </g>
        </svg>
      </div>

      <div className="atrator-depth-core">
        <svg viewBox="0 0 960 560" preserveAspectRatio="xMidYMid meet" focusable="false">
          <defs>
            <radialGradient id="vf-core-glow" cx=".5" cy=".5" r=".5">
              <stop offset=".30" stopColor="#F5CF8C" stopOpacity="0" />
              <stop offset=".51" stopColor="#E9C28D" stopOpacity=".38" />
              <stop offset=".66" stopColor="#C69C66" stopOpacity=".12" />
              <stop offset="1" stopColor="#A2B7BD" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vf-core" cx=".37" cy=".32" r=".77">
              <stop offset="0" stopColor="#03090E" />
              <stop offset=".64" stopColor="#02080D" />
              <stop offset=".9" stopColor="#08131C" />
              <stop offset="1" stopColor="#15262A" />
            </radialGradient>
            <linearGradient id="vf-ring-light" x1="0" y1=".1" x2="1" y2=".9">
              <stop offset="0" stopColor="#9BAFB4" stopOpacity=".18" />
              <stop offset=".29" stopColor="#EDC991" stopOpacity=".6" />
              <stop offset=".57" stopColor="#FFF1CF" stopOpacity=".98" />
              <stop offset=".81" stopColor="#D5AB72" stopOpacity=".5" />
              <stop offset="1" stopColor="#B6C9CC" stopOpacity=".17" />
            </linearGradient>
          </defs>
          <circle cx="480" cy="280" r="151" fill="url(#vf-core-glow)" />
          <circle cx="480" cy="280" r="80" fill="url(#vf-core)" />
          <circle cx="480" cy="280" r="81" fill="none" stroke="url(#vf-ring-light)" strokeWidth="3.2" />
          <circle cx="480" cy="280" r="86" fill="none" stroke="#E7CAA0" strokeOpacity=".13" strokeWidth="1" />
          <g transform="rotate(-21 480 280)" fill="none">
            <path d="M328 280 A152 51 0 0 0 632 280"
              stroke="url(#vf-ring-light)" strokeWidth="3.3" strokeLinecap="round" />
            <path d="M310 286 A170 57 0 0 0 650 286"
              stroke="#E0C193" strokeOpacity=".27" strokeWidth="1.1" />
          </g>
          <circle cx="540" cy="233" r="2.1" fill="#FFEBCA" opacity=".8" />
          <circle cx="427" cy="333" r="1.3" fill="#EFC58E" opacity=".65" />
        </svg>
      </div>
    </div>
  );
};
