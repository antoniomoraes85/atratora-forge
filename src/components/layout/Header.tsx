import React from 'react';
import { ShieldCheck, Menu, Database } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  title = 'Atratora Forge',
  subtitle = 'Soluções avançadas para fluxos técnicos.',
}) => {
  return (
    <header
      style={{
        height: '70px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
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
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {title}
            </h2>
            <span className="badge badge-primary" style={{ fontSize: '10px' }}>
              v0.3.0
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Local Processing Privacy Indicator */}
        <div
          title="Os dados são processados inteiramente no seu dispositivo. Nenhum dado é enviado a servidores remotos."
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            background: 'var(--success-bg)',
            border: '1px solid var(--success-border)',
            borderRadius: 'var(--radius-full)',
            fontSize: '11.5px',
            fontWeight: 600,
            color: 'var(--success-text)',
            cursor: 'default',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <ShieldCheck size={15} />
          <span className="hide-mobile">Processamento 100% Local</span>
        </div>
        
        {/* Storage Indicator */}
        <div
           title="Armazenamento Local Ativo"
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '6px',
             padding: '6px 14px',
             background: 'var(--info-bg)',
             border: '1px solid var(--info-border)',
             borderRadius: 'var(--radius-full)',
             fontSize: '11.5px',
             fontWeight: 600,
             color: 'var(--info-text)',
             cursor: 'default',
             boxShadow: 'var(--shadow-xs)'
           }}
        >
           <Database size={14} />
           <span className="hide-mobile">Privado</span>
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
