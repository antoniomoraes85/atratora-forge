import { Link } from 'react-router-dom';
import { ArrowRight, CircleHelp } from 'lucide-react';
import '../../styles/portal-sections.css';

const QUESTIONS = [
  { question: 'Quais ferramentas estão disponíveis hoje?', answer: 'A análise exploratória de dinâmica veicular e o conversor local de imagens para .croqui. As demais funcionalidades estão em desenvolvimento ou planejamento, conforme o catálogo.' },
  { question: 'O Vetor Forense realiza perícia oficial?', answer: 'Não. A plataforma não confere habilitação profissional, não produz laudo oficial e não certifica autenticidade ou cadeia de custódia. A análise e a responsabilidade técnica permanecem com o profissional competente.' },
  { question: 'Os módulos digitais já examinam celulares ou arquivos?', answer: 'Não. Gestão de evidências, análise de dispositivos móveis, relatórios e os demais módulos digitais são propostas de evolução, ainda não operacionais.' },
  { question: 'Preciso criar uma conta para usar as ferramentas atuais?', answer: 'Não. As duas ferramentas operacionais existentes podem ser acessadas no navegador. Confira sempre os requisitos e limites próprios de cada recurso.' },
  { question: 'As informações são enviadas automaticamente para servidores?', answer: 'Os módulos operacionais atuais foram concebidos para executar suas funções localmente no navegador. Não interprete isso como certificação de segurança, sigilo ou cadeia de custódia; evite utilizar informações sensíveis sem avaliação adequada.' },
  { question: 'Como posso aprender a utilizar?', answer: 'A área de Guias separa tutoriais disponíveis, interfaces conceituais e fluxos planejados, indicando o estágio de cada material.' },
  { question: 'Como acompanhar novas funcionalidades?', answer: 'Consulte a página Roadmap e o catálogo. Módulos somente são indicados como disponíveis após implementação e validação.' },
];

export const FAQ = () => (
  <div className="vf-portal-page animate-fade-in">
    <header className="vf-portal-hero">
      <span className="vf-portal-kicker">CENTRAL DE AJUDA</span>
      <h1>Perguntas frequentes.</h1>
      <p>Esclarecimentos objetivos sobre operação, limitações, privacidade e evolução das ferramentas.</p>
    </header>
    <section className="vf-portal-section" aria-label="Perguntas e respostas">
      <div className="vf-faq-list">
        {QUESTIONS.map((item, index) => (
          <details key={item.question} className="vf-faq-item" open={index === 0}>
            <summary><CircleHelp size={20} aria-hidden="true" />{item.question}<span aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
    <section className="vf-portal-banner">
      <div><h2>Precisa conhecer uma ferramenta?</h2><p>Consulte as funcionalidades e os guias com exemplos de uso.</p></div>
      <Link className="btn btn-primary" to="/guides">Ver guias <ArrowRight size={17} /></Link>
    </section>
  </div>
);
