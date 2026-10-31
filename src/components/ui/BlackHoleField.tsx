import { useEffect, useRef } from 'react';
import './black-hole-field.css';

/**
 * Arte visual produzida para o ecossistema ATRATOR.
 * A imagem é original, otimizada em AVIF e servida localmente pelo GitHub Pages.
 * Os efeitos complementares são ilustrações conceituais, não uma simulação relativística.
 */
const PHOTO = `${import.meta.env.BASE_URL}hero/atrator-black-hole.avif`;

const STREAMS = Array.from({ length: 24 }, (_, index) => {
  const side = index % 2 === 0 ? -1 : 1;
  const row = Math.floor(index / 2);
  const y0 = 20 + row * 45;
  const x0 = side < 0 ? -90 : 1050;
  const x1 = side < 0 ? 570 : 710;
  const y1 = 260 + (row - 6) * 2;
  const d = `M ${x0} ${y0} C ${side < 0 ? 110 : 920} ${y0 + (row - 6) * 8}, ${x1} ${y1 - 75}, 645 ${y1}`;
  return { d, delay: -((index * .83) % 11), strength: index % 4 === 0 ? .26 : .11 };
});

const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

/**
 * Três planos: fotografia, linhas luminosas e pontos próximos.
 * RequestAnimationFrame + CSS custom properties evitam re-render por movimento.
 * Respeita redução de movimento e não intercepta eventos de clique.
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
      if (reduced.matches) {
        node.style.setProperty('--pointer-x', '0px');
        node.style.setProperty('--pointer-y', '0px');
        node.style.setProperty('--scroll-shift', '0px');
        return;
      }
      node.style.setProperty('--pointer-x', `${x.toFixed(2)}px`);
      node.style.setProperty('--pointer-y', `${y.toFixed(2)}px`);
      node.style.setProperty('--scroll-shift', `${scroll.toFixed(2)}px`);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const pointer = (event: PointerEvent) => {
      if (reduced.matches || !fine.matches) return;
      const rect = node.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      x = clamp(((event.clientX - rect.left) / rect.width - .5) * 38, 19);
      y = clamp(((event.clientY - rect.top) / rect.height - .5) * 26, 13);
      schedule();
    };

    const onScroll = () => {
      if (reduced.matches) return;
      const rect = node.getBoundingClientRect();
      scroll = clamp(-rect.top * .048, 29);
      schedule();
    };

    const onLeave = () => {
      x = 0;
      y = 0;
      schedule();
    };

    const motionChange = () => {
      if (reduced.matches) { x = 0; y = 0; scroll = 0; }
      schedule();
    };

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
    <div className="atrator-event-horizon" aria-hidden="true" data-parallax="enabled" ref={root}>
      <div className="atrator-depth-back">
        <img className="atrator-photo" src={PHOTO} alt="" width="1672" height="941" decoding="async" />
      </div>
      <div className="atrator-depth-streams">
        <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" focusable="false">
          <defs>
            <linearGradient id="vf-light-trails" x1="0" x2="1" y1=".45" y2=".55">
              <stop offset="0" stopColor="#6BB0DA" stopOpacity="0" />
              <stop offset=".5" stopColor="#A5D9EE" stopOpacity=".45" />
              <stop offset=".8" stopColor="#F1CE9A" stopOpacity=".63" />
              <stop offset="1" stopColor="#F1CE9A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="atrator-flow-field" fill="none">
            {STREAMS.map((stream, index) => (
              <g key={index}>
                <path d={stream.d} stroke="url(#vf-light-trails)"
                  strokeWidth={index % 5 === 0 ? 1.2 : .65}
                  opacity={stream.strength} />
                <path d={stream.d} stroke="#ECD3A6" strokeWidth="1.5"
                  className="atrator-infall-particles"
                  strokeDasharray="1 55"
                  strokeLinecap="round"
                  style={{ animationDelay: `${stream.delay}s`, opacity: stream.strength * .48 }} />
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="atrator-depth-core">
        <div className="atrator-light-haze" />
      </div>
    </div>
  );
};
