import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, CheckCircle2, ChevronRight, FileImage, FileSearch,
  FileText, Fingerprint, LockKeyhole, ScanSearch, ShieldCheck, Smartphone,
  Zap, type LucideIcon,
} from 'lucide-react';
import { TOOLS_CATALOG, type ToolDefinition } from '../../app/config/tools';
import './home-forensics.css';

type FocusModule = {
  id: string;
  icon: LucideIcon;
  number: string;
  value: string;
  tone: 'gold' | 'cyan' | 'violet' | 'green';
};

const FOCUS_MODULES: FocusModule[] = [
  { id: 'vetor-evidence', icon: ShieldCheck, number: '01', value: 'Preservação e rastreabilidade', tone: 'gold' },
  { id: 'vetor-reports', icon: FileText, number: '02', value: 'Documentação técnica', tone: 'cyan' },
  { id: 'vetor-mobile', icon: Smartphone, number: '03', value: 'Segurança de dispositivos', tone: 'violet' },
  { id: 'vetor-media', icon: ScanSearch, number: '04', value: 'Análise de arquivos de mídia', tone: 'green' },
  { id: 'vetor-documents', icon: FileSearch, number: '05', value: 'Documentos eletrônicos', tone: 'gold' },
  { id: 'vetor-fraud', icon: Fingerprint, number: '06', value: 'Análise de incidentes', tone: 'cyan' },
];

const EXISTING_TOOLS: Array<{ id: string; icon: LucideIcon; detail: string }> = [
  {
    id: 'vetor-forense',
    icon: Zap,
    detail: 'Motor exploratório de cálculos físicos para dinâmica veicular, com parâmetros e premissas documentáveis.',
  },
  {
    id: 'croqui-converter',
    icon: FileImage,
    detail: 'Conversão de imagens para formato .croqui, diretamente no dispositivo, sem envio de arquivos a servidores.',
  },
];

const WORKFLOW = [
  {
    number: '01',
    title: 'Recebimento',
    description: 'Identificar material, responsável, origem e autorização de análise.',
  },
  {
    number: '02',
    title: 'Preservação',
    description: 'Planejar hashes, manifestos, cópias de trabalho e trilha de operações.',
  },
  {
    number: '03',
    title: 'Exame técnico',
    description: 'Documentar ferramentas, procedimentos, observações e limites dos resultados.',
  },
  {
    number: '04',
    title: 'Relatório',
    description: 'Organizar a conclusão para revisão e assinatura pelo profissional responsável.',
  },
];

const byId = (id: string): ToolDefinition | undefined =>
  TOOLS_CATALOG.find(tool => tool.id === id);

export const Home: React.FC = () => {
  const availableCount = TOOLS_CATALOG.filter(tool => tool.status === 'available').length;
  const futureCount = TOOLS_CATALOG.filter(tool => tool.status !== 'available').length;

  return (
    <div className="vf-new-home animate-fade-in">
      <section className="vf-new-hero" aria-labelledby="vf-home-title">
        <div className="vf-new-hero-grid" aria-hidden="true" />
        <div className="vf-new-hero-glow" aria-hidden="true" />
        <div className="vf-new-hero-content">
          <span className="vf-new-kicker"><span className="vf-new-dot" /> ATRATOR / VETOR FORENSE</span>
          <h1 id="vf-home-title">
            Ciência e tecnologia para
            <span> analisar evidências com método.</span>
          </h1>
          <p className="vf-new-hero-lead">
            Plataforma modular para análises técnicas, documentação e, em seu roadmap,
            organização de evidências digitais e investigação de dispositivos móveis.
          </p>
          <p className="vf-new-hero-note">
            A evolução começa pela rastreabilidade e pelos relatórios. Novos módulos digitais
            estão planejados; não realizam exames ou certificações nesta versão.
          </p>
          <div className="vf-new-hero-actions">
            <Link className="btn btn-primary" to="/tools">Explorar módulos <ArrowRight size={17} /></Link>
            <a className="btn btn-secondary" href="#vf-roadmap">Conhecer o roadmap <ChevronRight size={17} /></a>
          </div>
          <div className="vf-new-hero-tags" aria-label="Características da plataforma">
            <span><LockKeyhole size={14} /> Ferramentas atuais local-first</span>
            <span><ShieldCheck size={14} /> Metodologia rastreável como objetivo</span>
            <span><CheckCircle2 size={14} /> Independência institucional</span>
          </div>
        </div>
        <aside className="vf-new-hero-aside" aria-label="Situação dos módulos">
          <div className="vf-new-aside-label">PANORAMA DO PRODUTO <span>v0.3.0</span></div>
          <div className="vf-new-aside-metric">
            <strong>{availableCount.toString().padStart(2, '0')}</strong>
            <div><b>Ferramentas existentes</b><small>Disponíveis para uso no catálogo</small></div>
          </div>
          <div className="vf-new-aside-metric">
            <strong>{futureCount.toString().padStart(2, '0')}</strong>
            <div><b>Módulos em evolução</b><small>Em desenvolvimento ou planejados</small></div>
          </div>
          <div className="vf-new-aside-rule" />
          <span className="vf-new-aside-subtitle">PRÓXIMA LINHA DE PRODUTO</span>
          <div className="vf-new-aside-roadmap">
            <span>Vetor Evidence</span><span className="vf-new-status vf-new-status-plan">Planejado</span>
          </div>
          <p>Registro de casos e integridade de arquivos: desenvolvimento previsto, ainda sem cadeia de custódia implementada.</p>
        </aside>
      </section>

      <section className="vf-new-intro" id="vf-roadmap" aria-labelledby="vf-product-title">
        <div>
          <span className="vf-new-overline">EVOLUÇÃO DO VETOR FORENSE</span>
          <h2 id="vf-product-title">Uma base técnica. Múltiplas especialidades.</h2>
          <p>
            O núcleo existente de análise veicular e conversão de croquis será preservado.
            A expansão prioriza evidências eletrônicas, relatórios e investigação mobile,
            sempre separando funcionalidades entregues de capacidades futuras.
          </p>
        </div>
        <Link className="vf-new-text-link" to="/tools">Ver catálogo completo <ArrowRight size={16} /></Link>
      </section>

      <section className="vf-new-focus-grid" aria-label="Módulos digitais planejados">
        {FOCUS_MODULES.map(module => {
          const tool = byId(module.id);
          if (!tool) return null;
          const Icon = module.icon;
          return (
            <article key={module.id} className={`vf-new-module vf-tone-${module.tone}`}>
              <div className="vf-new-module-top">
                <span className="vf-new-module-number">{module.number} / DIGITAL</span>
                <span className="vf-new-status vf-new-status-plan">Planejado</span>
              </div>
              <div className="vf-new-module-icon" aria-hidden="true"><Icon size={24} /></div>
              <h3>{tool.title}</h3>
              <span className="vf-new-module-value">{module.value}</span>
              <p>{tool.description}</p>
              <div className="vf-new-module-bottom">
                <span>{tool.deliveryVersion}</span>
                <span>Sem acesso operacional nesta versão</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="vf-new-operational" aria-labelledby="vf-active-title">
        <div className="vf-new-section-header">
          <div>
            <span className="vf-new-overline">DISPONÍVEIS HOJE</span>
            <h2 id="vf-active-title">Ferramentas que você já pode utilizar</h2>
            <p>O reposicionamento estratégico não remove recursos existentes.</p>
          </div>
          <span className="vf-new-status vf-new-status-active"><CheckCircle2 size={14} /> {availableCount} ativas</span>
        </div>
        <div className="vf-new-active-grid">
          {EXISTING_TOOLS.map(item => {
            const tool = byId(item.id);
            if (!tool || !tool.path || tool.status !== 'available') return null;
            const Icon = item.icon;
            return (
              <Link key={item.id} className="vf-new-active-card" to={tool.path}>
                <div className="vf-new-active-icon" aria-hidden="true"><Icon size={25} /></div>
                <div>
                  <span className="vf-new-status vf-new-status-active">Ferramenta ativa</span>
                  <h3>{tool.title}</h3>
                  <p>{item.detail}</p>
                  <strong>Acessar ferramenta <ArrowRight size={15} /></strong>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="vf-new-method" aria-labelledby="vf-method-title">
        <div className="vf-new-section-header">
          <div>
            <span className="vf-new-overline">PROCESSO PROPOSTO</span>
            <h2 id="vf-method-title">Da evidência ao documento técnico</h2>
            <p>Fluxo-alvo para o futuro núcleo digital; não representa cadeia de custódia já certificada.</p>
          </div>
        </div>
        <div className="vf-new-method-grid">
          {WORKFLOW.map(step => (
            <div key={step.number} className="vf-new-method-step">
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vf-new-boundaries" aria-labelledby="vf-scope-title">
        <div className="vf-new-boundaries-icon" aria-hidden="true"><ShieldCheck size={23} /></div>
        <div>
          <h2 id="vf-scope-title">Ferramenta técnica não é nomeação pericial</h2>
          <p>
            O Vetor Forense é independente de órgãos públicos. Relatórios particulares,
            pareceres técnicos, laudos judiciais e perícias oficiais possuem requisitos
            diferentes. O software não atribui habilitação profissional, não comprova sozinho
            autenticidade nem substitui a avaliação de um profissional competente.
            Exames em dispositivos exigem autorização e metodologia apropriada.
          </p>
        </div>
        <Link to="/about" className="vf-new-text-link">Sobre a plataforma <ArrowRight size={16} /></Link>
      </section>

      <div className="vf-new-footer-links">
        <Link to="/guides"><BookOpen size={16} /> Guias das ferramentas existentes</Link>
        <Link to="/tools">Diretório completo <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
};
