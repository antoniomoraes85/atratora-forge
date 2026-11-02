import { useEffect, useRef, useState } from 'react';
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

/** Abertura curta, uma única vez por aba. Não interrompe navegação interna. */
export const IntroSplash = () => {
  const [visible, setVisible] = useState(shouldPlay);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!visible) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement : null;
    skipRef.current?.focus();

    const close = () => {
      try { window.sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* opcional */ }
      setVisible(false);
      previousFocus?.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') close();
    };
    const timer = window.setTimeout(close, DURATION_MS);
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [visible]);

  const skip = () => {
    try { window.sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* opcional */ }
    setVisible(false);
  };

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
        onClick={skip} aria-label="Pular apresentação">Pular apresentação <span aria-hidden="true">→</span></button>
    </div>
  );
};
