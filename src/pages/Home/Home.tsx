import { Link } from 'react-router-dom';
import {
  ArrowRight, BadgeCheck, BookOpen, ChevronRight, FileImage,
  FileText, LockKeyhole, ShieldCheck, Smartphone, Zap,
} from 'lucide-react';
import { TOOLS_CATALOG, type ToolDefinition } from '../../app/config/tools';
import { BlackHoleField } from '../../components/ui/BlackHoleField';
import './home-forensics.css';

const tool = (id: string): ToolDefinition => {
  const match = TOOLS_CATALOG.find(item => item.id === id);
  if (!match) throw new Error(`Ferramenta não encontrada: ${id}`);
  return match;
};

const NEXT_MODULES = [
  { id: 'vetor-evidence', code: 'Vetor Evidence', icon: LockKeyhole, index: '01', stage: 'Fundação' },
  { id: 'vetor-reports', code: 'Vetor Reports', icon: FileText, index: '02', stage: 'Documentação' },
  { id: 'vetor-mobile', code: 'Vetor Mobile', icon: Smartphone, index: '03', stage: 'Especialização' },
] as const;

export const Home = () => (
  <div className="vf-light-home animate-fade-in">
    <section className="vf-light-hero" aria-labelledby="vf-title">
      <div className="vf-light-hero-content">
        <span className="vf-light-eyebrow"><span className="vf-light-signal" /> TECNOLOGIA ATRATOR / VETOR FORENSE</span>
        <h1 id="vf-title">Análise técnica com <em>método e precisão.</em></h1>
        <p className="vf-light-hero-lead">
          Ferramentas objetivas para examinar, interpretar e documentar informações técnicas.
          Um ambiente em evolução para evidências digitais e perícia computacional.
        </p>
        <div className="vf-light-hero-actions">
          <Link to="/tools" className="btn btn-primary">
            Explorar ferramentas <ArrowRight size={16} />
          </Link>
          <a href="#vf-modules" className="vf-light-inline-link">
            Ver evolução da plataforma <ChevronRight size={16} />
          </a>
        </div>
        <div className="vf-light-hero-footnote" aria-label="Disponibilidade dos recursos">
          <span><span className="vf-light-hero-count">02</span> ferramentas disponíveis</span>
          <span className="vf-light-footnote-divider" aria-hidden="true" />
          <span><span className="vf-light-hero-count">06</span> módulos digitais planejados</span>
        </div>
      </div>
      <div className="vf-light-hero-visual" aria-label="Ilustração abstrata do campo gravitacional ATRATOR">
        <BlackHoleField />
        <div className="vf-light-visual-label" aria-hidden="true">
          <span className="vf-light-visual-dot" />
          <span>ATRATOR / CAMPO DE ATRAÇÃO</span>
          <span className="vf-light-visual-side">Visualização conceitual</span>
        </div>
      </div>
    </section>

    <section className="vf-light-active" aria-labelledby="vf-available">
      <div className="vf-light-heading">
        <div>
          <span className="vf-light-section-kicker">PRONTO PARA USAR</span>
          <h2 id="vf-available">Ferramentas disponíveis</h2>
          <p>Acesse diretamente os recursos técnicos já implementados.</p>
        </div>
        <span className="vf-light-status is-active"><BadgeCheck size={14} /> 2 disponíveis</span>
      </div>
      <div className="vf-light-active-grid">
        <Link className="vf-light-active-card" to="/tools/vetor-forense">
          <span className="vf-light-active-icon"><Zap size={22} strokeWidth={1.75} /></span>
          <div className="vf-light-active-content">
            <span className="vf-light-tool-eyebrow">DINÂMICA VEICULAR · EM OPERAÇÃO</span>
            <h3>{tool('vetor-forense').title}</h3>
            <p>Estimativas físicas baseadas em vestígios, medições e premissas documentadas.</p>
            <strong>Acessar análise <ArrowRight size={16} /></strong>
            <small className="vf-light-legacy-label">Análise de Dinâmica Veicular</small>
          </div>
        </Link>
        <Link className="vf-light-active-card" to="/tools/croqui-converter">
          <span className="vf-light-active-icon"><FileImage size={22} strokeWidth={1.75} /></span>
          <div className="vf-light-active-content">
            <span className="vf-light-tool-eyebrow">DOCUMENTAÇÃO VISUAL · EM OPERAÇÃO</span>
            <h3>{tool('croqui-converter').title}</h3>
            <p>Conversão local de imagens em arquivos técnicos no formato .croqui.</p>
            <strong>Acessar conversor <ArrowRight size={16} /></strong>
            <small className="vf-light-legacy-label">Conversor .CROQUI</small>
          </div>
        </Link>
      </div>
    </section>

    <section className="vf-light-roadmap" id="vf-modules" aria-labelledby="vf-modules-title">
      <div className="vf-light-heading">
        <div>
          <span className="vf-light-section-kicker">PRÓXIMAS ETAPAS</span>
          <h2 id="vf-modules-title">O próximo capítulo: evidências digitais.</h2>
          <p>Três prioridades, implementadas em sequência e verificadas antes de qualquer uso profissional.</p>
        </div>
        <span className="vf-light-roadmap-meta">Roadmap público · não operacional</span>
      </div>
      <div className="vf-light-roadmap-list">
        {NEXT_MODULES.map(({ id, code, icon: Icon, index, stage }) => {
          const item = tool(id);
          return (
            <article key={id} className="vf-light-roadmap-item">
              <span className="vf-light-roadmap-index">{index}</span>
              <span className="vf-light-roadmap-icon"><Icon size={21} strokeWidth={1.7} /></span>
              <div className="vf-light-roadmap-text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{code} · {stage}</small>
              </div>
              <span className="vf-light-status is-planned">Planejado</span>
            </article>
          );
        })}
      </div>
      <div className="vf-light-roadmap-after">
        <span>ETAPAS FUTURAS</span>
        <p>
          Análise de Mídia Digital <b>·</b> Verificação de Documentos Digitais
          <b>·</b> Análise de Incidentes e Fraudes Digitais
        </p>
        <Link to="/tools" className="vf-light-inline-link">Catálogo completo <ArrowRight size={15} /></Link>
      </div>
    </section>

    <section className="vf-light-process" aria-labelledby="vf-process-title">
      <div>
        <span className="vf-light-section-kicker">PRINCÍPIO DE PROJETO</span>
        <h2 id="vf-process-title">Rastreabilidade desde a origem.</h2>
        <p>Fluxo previsto para o núcleo digital, ainda sem cadeia de custódia certificada.</p>
      </div>
      <ol className="vf-light-process-steps">
        <li><span>01</span><strong>Identificar</strong><small>Origem e autorização</small></li>
        <li><span>02</span><strong>Preservar</strong><small>Integridade dos arquivos</small></li>
        <li><span>03</span><strong>Examinar</strong><small>Método e limitações</small></li>
        <li><span>04</span><strong>Documentar</strong><small>Conclusão revisável</small></li>
      </ol>
    </section>

    <section className="vf-light-legal">
      <ShieldCheck size={19} aria-hidden="true" />
      <div>
        <h2>Ferramenta técnica não é nomeação pericial</h2>
        <p>
          Os novos módulos digitais não realizam exames ou certificações nesta versão.
          Relatórios particulares, perícias judiciais e oficiais exigem requisitos próprios;
          o software não confere habilitação nem certifica autenticidade ou cadeia de custódia.
        </p>
      </div>
      <Link to="/about" className="vf-light-inline-link">Sobre o escopo <ChevronRight size={15} /></Link>
    </section>
    <nav className="vf-light-bottom-nav" aria-label="Links complementares">
      <Link to="/guides"><BookOpen size={15} /> Guias de utilização</Link>
      <Link to="/tools">Todas as ferramentas <ArrowRight size={15} /></Link>
    </nav>
  </div>
);
