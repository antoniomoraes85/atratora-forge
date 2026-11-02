import { useCallback, useEffect, useRef, useState } from 'react';
import './intro-splash.css';

// New session key intentionally reveals this revised intro once to prior visitors.
const SESSION_KEY = 'vf-intro-seen-v3';
const DURATION_MS = 3700;

const shouldPlay = () => {
  if (typeof window === 'undefined') return false;
  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  } catch {
    // Storage failure must never block access to the product.
    return false;
  }
};

/**
 * Cinematic logo signature: metallic gold VT draws itself, steel wordmark
 * appears, then BOTH are rapidly absorbed into a black hole behind them.
 * The magnifier is intentionally absent from this introduction.
 *
 * Runs once per tab session. The skip button, Escape, focus management and
 * reduced-motion preference remain available.
 */
export const IntroSplash = () => {
  const [visible, setVisible] = useState(shouldPlay);
  const skipRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    try { window.sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* optional */ }
    setVisible(false);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (!previousFocusRef.current && document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }
    skipRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
      if (event.key === 'Tab') {
        event.preventDefault();
        skipRef.current?.focus();
      }
    };
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      if (reduced?.matches) dismiss();
    };
    const timer = window.setTimeout(dismiss, DURATION_MS);
    window.addEventListener('keydown', onKey);
    reduced?.addEventListener?.('change', onMotionChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      reduced?.removeEventListener?.('change', onMotionChange);
    };
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div className="vf-intro-splash" role="dialog" aria-modal="true"
      aria-label="Apresentação do Vetor Forense">
      <div className="vf-intro-gravity" aria-hidden="true">
        <span className="vf-intro-horizon">
          <span className="vf-intro-horizon-orbit" />
          <span className="vf-intro-horizon-sheen" />
          <span className="vf-intro-horizon-shadow" />
        </span>
        <span className="vf-intro-accretion-plane" />
      </div>

      <div className="vf-intro-stage">
        <svg className="vf-intro-vt-glyph" viewBox="0 0 64 64"
          focusable="false" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vf-intro-letter-gold" x1="6" y1="8"
              x2="53" y2="59" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff5d6" />
              <stop offset=".20" stopColor="#f0cf8c" />
              <stop offset=".42" stopColor="#a97028" />
              <stop offset=".58" stopColor="#ffe7a9" />
              <stop offset=".81" stopColor="#d19b47" />
              <stop offset="1" stopColor="#794918" />
            </linearGradient>
          </defs>
          <path className="vf-intro-draw-v"
            d="M12 21 29 49 43 21" fill="none"
            stroke="url(#vf-intro-letter-gold)" strokeWidth="6"
            strokeLinejoin="round" strokeLinecap="round"
            pathLength="100" />
          <path className="vf-intro-draw-t"
            d="M33 20H54M43 20 35 47" fill="none"
            stroke="url(#vf-intro-letter-gold)" strokeWidth="5.4"
            strokeLinejoin="round" strokeLinecap="round"
            pathLength="100" />
        </svg>
        <div className="vf-intro-writing">
          <span className="vf-intro-typewriter">Vetor Forense</span>
        </div>
      </div>
      <button type="button" ref={skipRef} className="vf-intro-skip"
        onClick={dismiss} aria-label="Pular apresentação">
        Pular apresentação <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};
