import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Wrench, BookOpen, FolderGit2, Info, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { NAV_ITEMS, NavItem } from '../../app/config/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap = {
  Home,
  Wrench,
  BookOpen,
  FolderGit2,
  Info,
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`sidebar-container ${isOpen ? 'open' : ''}`}
        style={{
          width: '270px',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 100,
          transition: 'transform var(--transition-normal)',
        }}
      >
        {/* Top: Logo & Close for mobile */}
        <div>
          <div
            style={{
              padding: '24px 20px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <NavLink to="/" onClick={onClose} style={{ textDecoration: 'none' }}>
              <Logo size={36} />
            </NavLink>
            <button
              onClick={onClose}
              className="mobile-close-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                padding: '4px',
                display: 'none',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                padding: '4px 12px 8px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--text-dim)',
              }}
            >
              Plataforma
            </div>

            {NAV_ITEMS.map((item: NavItem) => {
              const IconComponent = iconMap[item.iconName];
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                    border: isActive ? '1px solid var(--border-highlight)' : '1px solid transparent',
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                  })}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <IconComponent size={19} style={{ opacity: 0.9 }} />
                    <span style={{ fontSize: '14px' }}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`badge badge-${item.badgeType || 'neutral'}`}
                      style={{ fontSize: '10px', padding: '2px 8px' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Platform Info Box */}
        <div style={{ padding: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--success-border)',
                  boxShadow: '0 0 10px var(--success-border)',
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Processamento local
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.45 }}>
              Seus arquivos são processados neste dispositivo.
            </p>
          </div>
        </div>
      </aside>

      <style>{`
        .sidebar-container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
        }
        @media (max-width: 900px) {
          .sidebar-container {
            transform: translateX(-100%);
          }
          .sidebar-container.open {
            transform: translateX(0);
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
