import { useCallback, useEffect, useRef, useState } from 'react';
import './intro-splash.css';

// Separate key lets visitors see the redesigned introduction once.
const SESSION_KEY = 'vf-intro-seen-v2';
const DURATION_MS = 4100;

const shouldPlay = () => {
  if (typeof window === 'undefined') return false;
  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  } catch {
    // Storage failures must never leave an overlay blocking the application.
    return false;
  }
};

/**
 * Logo writing sequence: draw the original VT paths, type the product name,
 * then reveal a binary magnifier layered over the signature.
 * One entry per tab session; Escape, Tab and skip always work.
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
      <div className="vf-intro-stage">
        <div className="vf-intro-vt" aria-hidden="true">
          {/* Exact VT letter paths from the approved brand symbol SVG. */}
          <svg className="vf-intro-vt-glyph" viewBox="0 0 64 64"
            focusable="false" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vf-intro-letter-gold" x1="7" y1="8"
                x2="55" y2="59" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff2cb" />
                <stop offset=".38" stopColor="#e4b866" />
                <stop offset="1" stopColor="#966122" />
              </linearGradient>
            </defs>
            <path className="vf-intro-draw-v"
              d="M12 21 29 49 43 21" fill="none"
              stroke="#edf2f3" strokeWidth="6"
              strokeLinejoin="round" strokeLinecap="round"
              pathLength="100" />
            <path className="vf-intro-draw-t"
              d="M33 20H54M43 20 35 47" fill="none"
              stroke="url(#vf-intro-letter-gold)" strokeWidth="5.4"
              strokeLinejoin="round" strokeLinecap="round"
              pathLength="100" />
          </svg>
          <div className="vf-intro-loupe" aria-hidden="true">
            <span className="vf-intro-loupe-glass"
              style={{
                backgroundImage: `url("${import.meta.env.BASE_URL}hero/fingerprint-matrix.webp")`,
              }}>
              <span className="vf-intro-bits">01010110<br />10110011<br />00101101</span>
            </span>
            <span className="vf-intro-loupe-handle" />
          </div>
        </div>
        <div className="vf-intro-writing" aria-hidden="true">
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
