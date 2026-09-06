import React from 'react';
import { ShieldCheck, Menu, Cpu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  title = 'Atratora Forge',
  subtitle = 'Automação técnica em uma única plataforma.',
}) => {
  return (
    <header
      style={{
        height: '70px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          aria-label="Alternar Menu"
          className="mobile-menu-btn"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '6px',
            display: 'none',
          }}
        >
          <Menu size={24} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
              {title}
            </h2>
            <span className="badge badge-primary" style={{ fontSize: '10px' }}>
              v0.1.0
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '1px' }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Local Processing Privacy Indicator */}
        <div
          title="A imagem e os dados são processados inteiramente no navegador local. Nenhum arquivo é enviado a servidores remotos."
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--success-text)',
            cursor: 'default',
          }}
        >
          <ShieldCheck size={16} />
          <span className="hide-mobile">Processamento 100% Local</span>
        </div>

        {/* Engine status indicator */}
        <div
          title="Motor de serialização Fabric.js/Canvas pronto"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            color: 'var(--primary-300)',
          }}
        >
          <Cpu size={15} />
          <span className="hide-mobile">Engine v0.1</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
