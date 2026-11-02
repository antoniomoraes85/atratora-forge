import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer = () => (
  <footer className="vf-shell-footer">
    <div className="vf-shell-footer-inner">
      <div className="vf-shell-footer-intro">
        <span className="vf-shell-footer-brand">VETOR FORENSE <span aria-hidden="true">·</span> ATRATOR</span>
        <p className="vf-shell-footer-copy">Método científico e tecnologia para apoio à análise técnica.</p>
        <p className="vf-shell-footer-meta"><ShieldCheck size={14} aria-hidden="true" /> Desenvolvimento independente · v0.3.0 experimental</p>
      </div>
      <nav className="vf-shell-footer-links" aria-label="Links institucionais">
        <Link to="/features">Funcionalidades</Link>
        <Link to="/tools">Catálogo</Link>
        <Link to="/guides">Guias</Link>
        <Link to="/institutional">Missão e valores</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contato <ArrowUpRight size={13} aria-hidden="true" /></Link>
      </nav>
    </div>
    <p className="vf-shell-footer-disclaimer">
      Não representa órgão público, não produz laudo oficial e não certifica cadeia de custódia.
      Módulos planejados não realizam exames.
    </p>
  </footer>
);
