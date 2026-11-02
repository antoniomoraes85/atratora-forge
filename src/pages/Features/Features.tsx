import { Link } from 'react-router-dom';
import { ArrowRight, FileSearch, Layers3, ShieldCheck } from 'lucide-react';
import { FeatureShowcase } from '../../components/features/FeatureShowcase';
import '../../styles/portal-sections.css';

export const Features = () => (
  <div className="vf-portal-page animate-fade-in">
    <header className="vf-portal-hero">
      <span className="vf-portal-kicker">O QUE A PLATAFORMA OFERECE</span>
      <h1>Funcionalidades que transformam dados em análise técnica.</h1>
      <p>
        Conheça o propósito e o estágio real de cada recurso do Vetor Forense.
        Os módulos disponíveis já têm acesso direto; os demais fazem parte da evolução do produto.
      </p>
      <div className="vf-portal-actions">
        <Link className="btn btn-primary" to="/tools">Catálogo completo <ArrowRight size={17} /></Link>
        <Link className="btn btn-secondary" to="/guides">Guias e documentação</Link>
      </div>
    </header>

    <section className="vf-portal-section" aria-labelledby="vf-feature-section-title">
      <div className="vf-portal-section-top">
        <div>
          <span className="vf-portal-kicker">CAPACIDADES E EVOLUÇÃO</span>
          <h2 id="vf-feature-section-title">O que cada módulo faz</h2>
          <p>Imagens ilustrativas; não representam telas ou operações já implementadas.</p>
        </div>
        <span className="vf-portal-count">2 ferramentas operacionais</span>
      </div>
      <FeatureShowcase />
    </section>

    <section className="vf-portal-principles" aria-labelledby="vf-feature-principles">
      <h2 id="vf-feature-principles">Projetado para decisões técnicas fundamentadas</h2>
      <div className="vf-portal-principle-grid">
        <article><FileSearch size={23} /><h3>Examinar</h3><p>Formular perguntas e registrar os dados utilizados.</p></article>
        <article><Layers3 size={23} /><h3>Interpretar</h3><p>Relacionar modelos, premissas e limites de cada resultado.</p></article>
        <article><ShieldCheck size={23} /><h3>Documentar</h3><p>Priorizar rastreabilidade metodológica e revisão humana.</p></article>
      </div>
    </section>
    <aside className="vf-portal-disclaimer">
      Os recursos futuros são apresentações conceituais, não ferramentas forenses disponíveis.
      O Vetor Forense não certifica cadeia de custódia nem substitui profissionais habilitados.
    </aside>
  </div>
);
