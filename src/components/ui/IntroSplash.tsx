import { useCallback, useEffect, useRef, useState } from 'react';
import './intro-splash.css';

const SESSION_KEY = 'vf-intro-seen-v1';
const DURATION_MS = 1850;

const shouldPlay = () => {
  if (typeof window === 'undefined') return false;
  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  } catch {
    // Sem armazenamento disponível, não bloqueia o acesso ao produto.
    return false;
  }
};

/** Abertura curta, uma única vez por aba, com acesso imediato ao conteúdo. */
export const IntroSplash = () => {
  const [visible, setVisible] = useState(shouldPlay);
  const skipRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    try { window.sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* armazenamento opcional */ }
    setVisible(false);
    // Restore keyboard location after the overlay unmounts.
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
      <div className="vf-intro-radiance" aria-hidden="true" />
      <div className="vf-intro-center">
        <img src={`${import.meta.env.BASE_URL}brand/vt-emblem.webp`}
          alt="Vetor Forense — emblema VT" width="118" height="118" />
        <span className="vf-intro-rule" aria-hidden="true" />
        <strong>VETOR FORENSE</strong>
        <span className="vf-intro-subtitle">CIÊNCIA · INVESTIGAÇÃO · TECNOLOGIA ATRATOR</span>
      </div>
      <button type="button" ref={skipRef} className="vf-intro-skip"
        onClick={dismiss} aria-label="Pular apresentação">
        Pular apresentação <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};
