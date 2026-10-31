import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, BookOpen, FileCheck2, FileText, ScanSearch, ShieldCheck, Smartphone, Workflow, Zap } from 'lucide-react';
import { TOOLS_CATALOG, type ToolDefinition } from '../../app/config/tools';
import { BlackHoleField } from '../../components/ui/BlackHoleField';
import './home-forensics.css';

const tool = (id: string): ToolDefinition => {
  const found = TOOLS_CATALOG.find(t => t.id === id);
  if (!found) throw new Error(`Ferramenta não encontrada: ${id}`);
  return found;
};

const PRIORITIES = [
  { id: 'vetor-evidence', name: 'Vetor Evidence', icon: ShieldCheck, step: '01', label: 'BASE DE EVIDÊNCIAS' },
  { id: 'vetor-reports', name: 'Vetor Reports', icon: FileText, step: '02', label: 'DOCUMENTAÇÃO TÉCNICA' },
  { id: 'vetor-mobile', name: 'Vetor Mobile', icon: Smartphone, step: '03', label: 'ANÁLISE DE DISPOSITIVOS' },
];

const EXTRAS = [
  { id: 'vetor-media', icon: ScanSearch },
  { id: 'vetor-documents', icon: FileCheck2 },
  { id: 'vetor-fraud', icon: Workflow },
];

export const Home = () => {
  return (
    <div className="vf-light-home animate-fade-in">
      <section className="vf-light-hero" aria-labelledby="vf-title">
        <BlackHoleField />
        <div className="vf-light-hero-content">
          <span className="vf-light-eyebrow"><span className="vf-light-signal" /> VETOR FORENSE · ECOSSISTEMA ATRATOR</span>
          <h1 id="vf-title">Método e precisão <span>para a análise técnica.</span></h1>
          <p className="vf-light-hero-lead">
            Ferramentas para organizar, analisar e documentar informações técnicas.
            Uma plataforma independente que evolui para evidências digitais,
            relatórios e análise de dispositivos.
          </p>
          <div className="vf-light-hero-actions">
            <Link to="/tools" className="btn btn-primary">Explorar ferramentas <ArrowRight size={16} /></Link>
            <a href="#vf-modules" className="vf-light-inline-link">Conhecer o roadmap <ArrowRight size={15} /></a>
          </div>
          <div className="vf-light-hero-footnote">
            <ShieldCheck size={15} />
            <span>Plataforma em evolução. Funcionalidades futuras identificadas claramente.</span>
          </div>
        </div>
        <div className="vf-light-hero-caption" aria-hidden="true">
          <span>ATRATOR / CAMPO GRAVITACIONAL</span>
          <span>VISUALIZAÇÃO CONCEITUAL</span>
        </div>
      </section>

      <section className="vf-light-intro" id="vf-modules">
        <div className="vf-light-heading">
          <div>
            <span className="vf-light-section-kicker">DIREÇÃO DO PRODUTO</span>
            <h2>Uma plataforma. Um método consistente.</h2>
            <p>
              A expansão digital será construída por etapas: primeiro integridade e rastreabilidade,
              depois relatórios e investigação técnica especializada.
            </p>
          </div>
          <span className="vf-light-summary">3 frentes prioritárias · em planejamento</span>
        </div>

        <div className="vf-light-priority-grid">
          {PRIORITIES.map(({ id, name, icon: Icon, step, label }) => {
            const item = tool(id);
            return (
              <article className="vf-light-priority-card" key={id}>
                <div className="vf-light-card-head">
                  <span className="vf-light-card-step">{step} <span>/ {label}</span></span>
                  <span className="vf-light-status is-planned">Planejado</span>
                </div>
                <div className="vf-light-card-icon"><Icon size={22} strokeWidth={1.7} /></div>
                <h3>{item.title}</h3>
                <small className="vf-light-product-code">{name}</small>
                <p>{item.description}</p>
                <div className="vf-light-card-bottom">Em definição funcional <span>↗</span></div>
              </article>
            );
          })}
        </div>

        <div className="vf-light-extras">
          <div className="vf-light-extras-text">
            <span className="vf-light-section-kicker">EXPANSÃO FUTURA</span>
            <h3>Outras especialidades digitais</h3>
          </div>
          <div className="vf-light-extras-list">
            {EXTRAS.map(({ id, icon: Icon }) => {
              const item = tool(id);
              return (
                <div key={id} className="vf-light-extra-item">
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{item.title}</span>
                  <span className="vf-light-status is-planned">Previsto</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="vf-light-active" aria-labelledby="vf-available">
        <div className="vf-light-heading">
          <div>
            <span className="vf-light-section-kicker">EM OPERAÇÃO</span>
            <h2 id="vf-available">Ferramentas já disponíveis</h2>
            <p>Recursos existentes preservados durante a evolução da plataforma.</p>
          </div>
          <span className="vf-light-status is-active"><BadgeCheck size={14} /> 2 disponíveis</span>
        </div>
        <div className="vf-light-active-grid">
          <Link className="vf-light-active-card" to="/tools/vetor-forense">
            <div className="vf-light-active-icon"><Zap size={23} /></div>
            <div>
              <span className="vf-light-status is-active">Disponível</span>
              <h3>{tool('vetor-forense').title}</h3>
              <small>Análise de Dinâmica Veicular</small>
              <p>Estimativas físicas baseadas em vestígios, medições e premissas documentadas.</p>
              <strong>Abrir ferramenta <ArrowRight size={15} /></strong>
            </div>
          </Link>
          <Link className="vf-light-active-card" to="/tools/croqui-converter">
            <div className="vf-light-active-icon"><ScanSearch size={23} /></div>
            <div>
              <span className="vf-light-status is-active">Disponível</span>
              <h3>{tool('croqui-converter').title}</h3>
              <small>Conversor .CROQUI</small>
              <p>Transformação local de imagens em arquivos técnicos no formato .croqui.</p>
              <strong>Abrir ferramenta <ArrowRight size={15} /></strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="vf-light-process" aria-labelledby="vf-process-title">
        <div>
          <span className="vf-light-section-kicker">PRINCÍPIOS DE DESENVOLVIMENTO</span>
          <h2 id="vf-process-title">Rastreabilidade antes de automação.</h2>
          <p>Fluxo-alvo para os próximos módulos, ainda não implementado como cadeia de custódia certificada.</p>
        </div>
        <ol className="vf-light-process-steps">
          <li><span>01</span><strong>Identificar</strong><small>Origem e autorização</small></li>
          <li><span>02</span><strong>Preservar</strong><small>Integridade e histórico</small></li>
          <li><span>03</span><strong>Examinar</strong><small>Método e limitações</small></li>
          <li><span>04</span><strong>Documentar</strong><small>Conclusão revisável</small></li>
        </ol>
      </section>

      <section className="vf-light-legal">
        <ShieldCheck size={21} aria-hidden="true" />
        <div>
          <h2>Ferramenta técnica não é nomeação pericial</h2>
          <p>
            Os novos módulos digitais não realizam exames ou certificações nesta versão.
            Relatórios particulares, perícias judiciais e perícias oficiais seguem requisitos próprios.
            O software não confere habilitação nem atesta, sozinho, autenticidade ou cadeia de custódia.
          </p>
        </div>
        <Link to="/about" className="vf-light-inline-link">Entenda o escopo <ArrowRight size={16} /></Link>
      </section>

      <nav className="vf-light-bottom-nav" aria-label="Links complementares">
        <Link to="/guides"><BookOpen size={15} /> Guias de utilização</Link>
        <Link to="/tools">Catálogo completo <ArrowRight size={15} /></Link>
      </nav>
    </div>
  );
};
