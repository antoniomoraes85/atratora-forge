import React, { useEffect, useState } from 'react';

interface TourOverlayProps {
  targetId?: string; // Valor de data-guide="..." a ser procurado
  isActive: boolean;
  onTargetMissing?: (targetId: string) => void;
}

export const TourOverlay: React.FC<TourOverlayProps> = ({ targetId, isActive, onTargetMissing }) => {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isActive || !targetId || targetId === 'none') {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(`[data-guide="${targetId}"]`);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
        onTargetMissing?.(targetId);
      }
    };

    updateRect();
    
    // Observar redimensionamento e scroll para manter o highlight no lugar
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { capture: true });

    // Pequeno debounce inicial caso renderize junto com componentes dinâmicos
    const timer = setTimeout(updateRect, 100);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, { capture: true });
      clearTimeout(timer);
    };
  }, [isActive, targetId, onTargetMissing]);

  if (!isActive) return null;

  // Anchors condicionais ausentes não escurecem a tela; onTargetMissing permite detecção futura.
  if (!targetRect) return null;

  // Cria o overlay com um buraco transparente no targetRect usando box-shadow
  // Expandimos um pouco a bounding box (padding de 8px)
  const padding = 8;
  const top = targetRect.top - padding;
  const left = targetRect.left - padding;
  const width = targetRect.width + padding * 2;
  const height = targetRect.height + padding * 2;
  const borderRadius = 8;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999, // Ficar acima de tudo, mas abaixo do modal de texto se houver
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top,
          left,
          width,
          height,
          borderRadius: `${borderRadius}px`,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65), 0 0 15px rgba(99, 102, 241, 0.5)',
          border: '2px solid var(--primary-500)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none', // Permite que os cliques cheguem à interface real
        }}
      />
      {/* Elemento de "pulso" didático no canto do target */}
      <div 
        style={{
          position: 'absolute',
          top: top - 4,
          right: left - 4,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-400)',
          animation: 'pulse 1.5s infinite',
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
