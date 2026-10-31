import { BadgeCheck, Database, Layers3, ShieldCheck } from 'lucide-react';
import { Logo } from '../../components/ui/Logo';
import './about-clean.css';

const PRINCIPLES = [
  { icon: Database, title: 'Processamento local', description: 'Os módulos atuais processam informações no dispositivo. A plataforma ainda não possui repositório forense certificado.' },
  { icon: Layers3, title: 'Arquitetura modular', description: 'Funções distintas, evolução incremental e separação entre ferramentas entregues e recursos planejados.' },
  { icon: BadgeCheck, title: 'Transparência metodológica', description: 'O objetivo é documentar métodos, premissas e limitações antes de qualquer conclusão técnica.' },
  { icon: ShieldCheck, title: 'Independência', description: 'Produto independente, sem vínculo institucional, homologação ou chancela de órgãos públicos.' },
];

export const About = () => (
  <div className="vf-about-page animate-fade-in">
    <section className="vf-about-hero">
      <span className="vf-about-overline">SOBRE A PLATAFORMA</span>
      <Logo size={64} />
      <h1>Precisão técnica, com clareza.</h1>
      <p>
        Vetor Forense é um produto de tecnologia do ecossistema ATRATOR.
        Reúne ferramentas de análise técnica e está evoluindo para fluxos de
        organização de evidências digitais, documentação e investigação autorizada de dispositivos.
      </p>
      <div className="vf-about-meta">
        <span>Desenvolvimento independente</span>
        <span>Produto em evolução</span>
        <span>ATRATOR</span>
      </div>
    </section>

    <section className="vf-about-block">
      <span className="vf-about-overline">COMPROMISSOS DE PROJETO</span>
      <h2>Um sistema simples para tarefas complexas.</h2>
      <div className="vf-about-grid">
        {PRINCIPLES.map(item => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <div className="vf-about-icon"><Icon size={21} /></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>

    <section className="vf-about-boundary">
      <ShieldCheck size={23} />
      <div>
        <h2>Limites de atuação e responsabilidade técnica</h2>
        <p>
          Atualmente estão disponíveis a ferramenta exploratória de dinâmica veicular e a
          conversão de croquis. Os módulos digitais de Evidence, Reports, Mobile, Media,
          Documents e Fraud são planejados e não fazem perícia digital nesta versão.
          Software e assinatura digital não conferem habilitação profissional, não
          produzem laudo oficial e não certificam cadeia de custódia. Exames dependem
          de autorização legítima, metodologias adequadas e profissional competente.
        </p>
        <p>Compatibilidade de formatos de terceiros não implica parceria nem homologação. O produto não representa a PRF.</p>
      </div>
    </section>

    <footer className="vf-about-credit">
      <strong>Desenvolvimento</strong>
      <span>José Antônio Coutinho de Moraes Filho</span>
      <span>Vetor Forense · Ecossistema ATRATOR</span>
    </footer>
  </div>
);
