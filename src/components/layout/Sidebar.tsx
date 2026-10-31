import { NavLink } from 'react-router-dom';
import { BookOpen, FolderGit2, Home, Info, Wrench, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { NAV_ITEMS, type NavItem } from '../../app/config/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap = { Home, Wrench, BookOpen, FolderGit2, Info };

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => (
  <>
    {isOpen && <button type="button" className="vf-shell-backdrop" aria-label="Fechar navegação" onClick={onClose} />}
    <aside className={`vf-shell-sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
      <div className="vf-shell-logo-row">
        <NavLink to="/" onClick={onClose} aria-label="Vetor Forense — início"><Logo size={46} /></NavLink>
        <button type="button" onClick={onClose} aria-label="Fechar menu" className="vf-shell-close"><X size={19} /></button>
      </div>

      <nav className="vf-shell-nav">
        <div className="vf-shell-nav-label">PLATAFORMA</div>
        {NAV_ITEMS.map((item: NavItem) => {
          const Icon = iconMap[item.iconName];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) => `vf-shell-nav-item ${isActive ? 'is-active' : ''}`}
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{item.label}</span>
              {item.badge && <small>{item.badge}</small>}
            </NavLink>
          );
        })}
      </nav>

      <div className="vf-shell-sidebar-note">
        <span className="vf-shell-note-rule" />
        <strong>TECNOLOGIA ATRATOR</strong>
        <p>Precisão técnica, transparência e desenvolvimento independente.</p>
        <span>Versão experimental · v0.3</span>
      </div>
    </aside>
  </>
);
