import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock3 } from 'lucide-react';
import { TOOLS_CATALOG } from '../../app/config/tools';

interface FeatureView {
  id: string;
  image: string;
  summary: string;
  output: string;
  category: string;
}

const FEATURE_VIEWS: FeatureView[] = [
  {
    id: 'vetor-forense', image: 'dynamics-guide.png',
    summary: 'Reconstrua cenários de dinâmica veicular por meio de modelos físicos, medições e hipóteses explícitas.',
    output: 'Estimativas e resultados técnicos interpretáveis', category: 'FÍSICA APLICADA',
  },
  {
    id: 'croqui-converter', image: 'croqui-converter-guide.png',
    summary: 'Converta imagens de croquis para o formato estruturado .croqui diretamente no navegador.',
    output: 'Arquivo .croqui para uso técnico', category: 'CONVERSÃO',
  },
  {
    id: 'vetor-evidence', image: 'platform-guide.png',
    summary: 'Proposta de cadastro e organização de casos e arquivos, com registros de integridade e operações.',
    output: 'Módulo futuro, ainda não operacional', category: 'EVIDÊNCIAS DIGITAIS',
  },
  {
    id: 'vetor-reports', image: 'documents-guide.png',
    summary: 'Proposta de estruturação de achados, premissas e limites em documentos técnicos revisáveis.',
    output: 'Módulo futuro, ainda não operacional', category: 'DOCUMENTAÇÃO',
  },
  {
    id: 'vetor-mobile', image: 'field-toolkit-guide.png',
    summary: 'Linha de desenvolvimento para triagem autorizada de artefatos digitais de dispositivos móveis.',
    output: 'Módulo futuro, ainda não operacional', category: 'DISPOSITIVOS',
  },
  {
    id: 'map-studio', image: 'map-studio-guide.png',
    summary: 'Planejamento de mapas-base, referências geográficas e elementos de representação técnica.',
    output: 'Módulo em desenvolvimento, ainda não operacional', category: 'GEOREFERENCIAMENTO',
  },
];

interface FeatureShowcaseProps {
  limit?: number;
}

export const FeatureShowcase = ({ limit }: FeatureShowcaseProps) => {
  const views = typeof limit === 'number' ? FEATURE_VIEWS.slice(0, limit) : FEATURE_VIEWS;
  return (
    <div className="vf-feature-grid">
      {views.map((view, index) => {
        const feature = TOOLS_CATALOG.find(item => item.id === view.id);
        if (!feature) return null;
        const available = feature.status === 'available' && Boolean(feature.path);
        return (
          <article key={feature.id} className={`vf-feature-card${available ? ' is-operational' : ' is-planned'}`}>
            <div className="vf-feature-image">
              <img
                src={`${import.meta.env.BASE_URL}guides/${view.image}`}
                alt={`Ilustração conceitual: ${feature.title}`}
                loading="lazy" decoding="async" />
              <span className="vf-feature-image-index">0{index + 1}</span>
              <span className={`vf-feature-status${available ? ' is-ready' : ''}`}>
                {available ? <BadgeCheck size={14} /> : <Clock3 size={14} />}
                {available ? 'Disponível' : feature.status === 'development' ? 'Em desenvolvimento' : 'Planejado'}
              </span>
            </div>
            <div className="vf-feature-body">
              <span className="vf-feature-category">{view.category}</span>
              <h3>{feature.title}</h3>
              <p>{view.summary}</p>
              <div className="vf-feature-output">
                <strong>{available ? 'Entrega' : 'Situação atual'}</strong>
                <span>{view.output}</span>
              </div>
              {available && feature.path ? (
                <Link className="vf-feature-link" to={feature.path}>
                  Abrir ferramenta <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              ) : (
                <Link className="vf-feature-link is-quiet" to="/roadmap">
                  Consultar roadmap <ArrowRight size={17} aria-hidden="true" />
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
