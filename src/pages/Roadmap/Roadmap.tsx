import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Clock3, Layers3 } from 'lucide-react';
import { TOOLS_CATALOG } from '../../app/config/tools';
import '../../styles/portal-sections.css';

const PHASES = [
  { number: '01', name: 'Fundação', description: 'Ferramentas técnicas existentes, identidade visual, catálogo e documentação.', ids: ['vetor-forense', 'croqui-converter'] },
  { number: '02', name: 'Evidências digitais', description: 'Estruturas futuras para organização, integridade e documentação de evidências.', ids: ['vetor-evidence', 'vetor-reports'] },
  { number: '03', name: 'Especialização', description: 'Linhas de desenvolvimento para dispositivos, mídias, documentos e análise de incidentes.', ids: ['vetor-mobile', 'vetor-media', 'vetor-documents', 'vetor-fraud'] },
];

export const Roadmap = () => (
  <div className="vf-portal-page animate-fade-in">
    <header className="vf-portal-hero">
      <span className="vf-portal-kicker">EVOLUÇÃO DO PRODUTO</span>
      <h1>Roadmap. Do funcional ao planejado.</h1>
      <p>Transparência sobre o que existe, o que ainda precisa ser desenvolvido e como a plataforma pretende evoluir. As fases são prioridades, não prazos de entrega.</p>
    </header>
    <section className="vf-roadmap-list" aria-label="Fases de evolução">
      {PHASES.map(phase => (
        <article className="vf-roadmap-phase" key={phase.number}>
          <div className="vf-roadmap-phase-head">
            <span className="vf-roadmap-number">{phase.number}</span>
            <div><span className="vf-portal-kicker">ETAPA ESTRATÉGICA</span><h2>{phase.name}</h2><p>{phase.description}</p></div>
          </div>
          <div className="vf-roadmap-tags">
            {phase.ids.map(id => {
              const tool = TOOLS_CATALOG.find(item => item.id === id);
              if (!tool) return null;
              const available = tool.status === 'available';
              return <span key={tool.id} className={available ? 'is-ready' : ''}>
                {available ? <BadgeCheck size={16} /> : <Clock3 size={16} />}
                <strong>{tool.title}</strong>
                <small>{available ? 'Disponível' : 'Planejado'}</small>
              </span>;
            })}
          </div>
        </article>
      ))}
    </section>
    <section className="vf-portal-banner">
      <div><Layers3 size={24} /><h2>Explore todas as linhas de desenvolvimento.</h2><p>O catálogo diferencia recursos entregues, em desenvolvimento e planejados.</p></div>
      <Link to="/tools" className="btn btn-primary">Ver catálogo <ArrowRight size={17} /></Link>
    </section>
    <aside className="vf-portal-disclaimer">Nenhuma previsão de lançamento é garantida. Módulos não operacionais não executam exames ou certificações.</aside>
  </div>
);
