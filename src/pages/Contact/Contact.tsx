import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ExternalLink, Github, MessageSquareText, ShieldAlert } from 'lucide-react';
import '../../styles/portal-sections.css';

const ISSUE_URL = 'https://github.com/antoniomoraes85/atratora-forge/issues/new';

export const Contact = () => (
  <div className="vf-portal-page animate-fade-in">
    <header className="vf-portal-hero">
      <span className="vf-portal-kicker">CONTATO E COLABORAÇÃO</span>
      <h1>Ajude a tornar o Vetor Forense melhor.</h1>
      <p>Dúvidas sobre funcionalidades, sugestões e relatos técnicos podem ser encaminhados pelo repositório público de desenvolvimento.</p>
    </header>
    <section className="vf-portal-contact-grid">
      <article>
        <span className="vf-portal-icon"><Github size={24} /></span>
        <h2>Relatar problema ou sugerir melhoria</h2>
        <p>Registre feedback de interface, documentação, compatibilidade ou comportamento das ferramentas no GitHub Issues.</p>
        <a className="btn btn-primary" href={ISSUE_URL} target="_blank" rel="noopener noreferrer">
          Abrir solicitação no GitHub <ExternalLink size={17} />
        </a>
      </article>
      <article>
        <span className="vf-portal-icon"><BookOpen size={24} /></span>
        <h2>Conhecer os recursos primeiro</h2>
        <p>Veja a descrição das funcionalidades e os guias antes de encaminhar uma solicitação.</p>
        <Link className="btn btn-secondary" to="/guides">Consultar guias <ArrowRight size={17} /></Link>
      </article>
    </section>
    <div className="vf-portal-guidance">
      <MessageSquareText size={20} aria-hidden="true" />
      <p>Inclua versão, passos para reproduzir e resultado esperado, sem anexar documentos sigilosos, dados pessoais ou evidências de investigações.</p>
    </div>
    <div className="vf-portal-guidance is-warning">
      <ShieldAlert size={20} aria-hidden="true" />
      <p>Este canal não é atendimento emergencial, serviço público, órgão pericial ou suporte oficial de segurança. Não encaminhe denúncias ou materiais confidenciais por esse meio.</p>
    </div>
  </div>
);
