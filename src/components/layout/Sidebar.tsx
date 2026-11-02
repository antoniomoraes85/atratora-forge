import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen, CircleHelp, FolderGit2, Home, Info, LayoutGrid,
  Mail, Route, Target, Wrench, X, ArrowUpRight, ShieldCheck,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { NAV_SECTIONS, type NavIcon } from '../../app/config/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap = {
  Home, LayoutGrid, Wrench, BookOpen, CircleHelp,
  Target, Info, Mail, Route, FolderGit2,
} satisfies Record<NavIcon, typeof Home>;

/** Navegação seccionada; o catálogo distingue funções disponíveis de futuras. */
export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <button type="button" className="vf-shell-backdrop"
        aria-label="Fechar navegação" onClick={onClose} />}
      <aside className={`vf-shell-sidebar${isOpen ? ' is-open' : ''}`}
        aria-label="Navegação principal">
        <div className="vf-shell-logo-row">
          <NavLink to="/" onClick={onClose} aria-label="Vetor Forense — Home">
            <Logo size={46} />
          </NavLink>
          <button type="button" onClick={onClose} aria-label="Fechar menu"
            className="vf-shell-close"><X size={20} /></button>
        </div>

        <div className="vf-shell-sidebar-scroll">
          <nav className="vf-shell-nav" aria-label="Áreas do Vetor Forense">
            {NAV_SECTIONS.map(section => (
              <section className="vf-shell-nav-section" key={section.id}
                aria-labelledby={`vf-sidebar-${section.id}`}>
                <h2 className="vf-shell-nav-label" id={`vf-sidebar-${section.id}`}>
                  {section.title}
                </h2>
                <div className="vf-shell-nav-list">
                  {section.items.map(item => {
                    const Icon = iconMap[item.iconName];
                    return (
                      <NavLink key={item.path} to={item.path}
                        end={item.path === '/'} onClick={onClose}
                        title={item.description}
                        className={({ isActive }) =>
                          `vf-shell-nav-item${isActive ? ' is-active' : ''}`}>
                        <Icon size={18} strokeWidth={1.85} aria-hidden="true" />
                        <span className="vf-shell-nav-text">{item.label}</span>
                        {item.badge && <small>{item.badge}</small>}
                      </NavLink>
                    );
                  })}
                </div>
              </section>
            ))}
          </nav>
        </div>

        <div className="vf-shell-sidebar-note">
          <NavLink to="/tools" onClick={onClose} className="vf-shell-sidebar-cta">
            <ShieldCheck size={17} aria-hidden="true" />
            <span>Acessar ferramentas</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </NavLink>
          <span className="vf-shell-note-rule" />
          <strong>VETOR FORENSE / ATRATOR</strong>
          <p>Ciência aplicada, rigor técnico e desenvolvimento independente.</p>
          <span>Plataforma experimental · v0.3</span>
        </div>
      </aside>
    </>
  );
};
