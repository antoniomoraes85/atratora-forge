import { Menu, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  subtitle?: string;
}

export const Header = ({
  onToggleSidebar,
  title = 'Vetor Forense',
  subtitle = 'Ferramentas técnicas e evolução em evidências digitais',
}: HeaderProps) => (
  <header className="vf-shell-header">
    <div className="vf-shell-header-left">
      <button type="button" className="vf-shell-menu" onClick={onToggleSidebar} aria-label="Abrir menu de navegação">
        <Menu size={23} />
      </button>
      <div>
        <div className="vf-shell-header-title">{title}<span className="vf-shell-version">v0.3.0</span></div>
        <p>{subtitle}</p>
      </div>
    </div>
    <div className="vf-shell-header-right">
      <span className="vf-shell-local-badge" title="Ferramentas operacionais atuais utilizam processamento local. Módulos de evidências digitais ainda estão planejados.">
        <ShieldCheck size={15} />
        <span>Ferramentas locais</span>
      </span>
      <span className="vf-shell-product-tag">ATRATOR</span>
    </div>
  </header>
);
