import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Eye, Scale, ShieldCheck, SearchCheck, Workflow } from 'lucide-react';
import '../../styles/portal-sections.css';

const VALUES = [
  { title: 'Rigor técnico', description: 'Premissas explícitas, métodos verificáveis e resultados passíveis de revisão.', icon: SearchCheck },
  { title: 'Transparência', description: 'Distinguir funções disponíveis, projetos e limites técnicos, sem promessas indevidas.', icon: Eye },
  { title: 'Independência', description: 'Desenvolvimento autônomo, sem vínculo, homologação ou chancela de órgão público.', icon: ShieldCheck },
  { title: 'Responsabilidade', description: 'Respeito à privacidade, às autorizações legítimas e à interpretação profissional.', icon: Scale },
  { title: 'Evolução contínua', description: 'Aprender com testes, documentação e melhoria incremental das ferramentas.', icon: Workflow },
];

export const Institutional = () => (
  <div className="vf-portal-page animate-fade-in">
    <header className="vf-portal-hero">
      <span className="vf-portal-kicker">IDENTIDADE INSTITUCIONAL</span>
      <h1>Ciência, investigação e tecnologia com responsabilidade.</h1>
      <p>
        O Vetor Forense é uma plataforma técnica independente do ecossistema ATRATOR.
        Seu compromisso é apoiar análise, interpretação e documentação, com rigor
        metodológico e limites de uso claramente apresentados.
      </p>
    </header>
    <section className="vf-portal-mvv" aria-label="Missão e visão">
      <article id="missao">
        <span className="vf-portal-icon"><Compass size={25} /></span>
        <span className="vf-portal-kicker">NOSSA MISSÃO</span>
        <h2>Democratizar o rigor técnico.</h2>
        <p>Desenvolver ferramentas para examinar, interpretar e documentar informações técnicas, aproximando método científico e necessidades investigativas de forma transparente e independente.</p>
      </article>
      <article id="visao">
        <span className="vf-portal-icon"><Eye size={25} /></span>
        <span className="vf-portal-kicker">NOSSA VISÃO</span>
        <h2>Uma plataforma de referência em evolução.</h2>
        <p>Consolidar um ecossistema modular de apoio à análise técnica e à documentação, reconhecido pela clareza, rastreabilidade metodológica e responsabilidade no uso de tecnologias.</p>
      </article>
    </section>
    <section id="valores" className="vf-portal-section" aria-labelledby="vf-values-title">
      <div className="vf-portal-section-top">
        <div><span className="vf-portal-kicker">BASE DO PROJETO</span><h2 id="vf-values-title">Valores que orientam cada entrega</h2></div>
      </div>
      <div className="vf-values-grid">
        {VALUES.map(value => {
          const Icon = value.icon;
          return (
            <article key={value.title}>
              <span className="vf-portal-icon"><Icon size={23} /></span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          );
        })}
      </div>
    </section>
    <section className="vf-portal-banner">
      <div><span className="vf-portal-kicker">CONHEÇA O PRODUTO</span><h2>Compromissos traduzidos em ferramentas.</h2><p>Veja o que está disponível agora e o que ainda está planejado.</p></div>
      <Link className="btn btn-primary" to="/features">Explorar funcionalidades <ArrowRight size={18} /></Link>
    </section>
  </div>
);
