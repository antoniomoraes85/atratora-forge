import React from 'react';
import { Logo } from '../../components/ui/Logo';
import { ShieldCheck, UserCheck, Globe, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', maxWidth: '880px', margin: '0 auto' }} className="animate-fade-in">
      {/* Brand presentation */}
      <div
        className="card"
        style={{
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-highlight)',
        }}
      >
        <Logo size={48} />

        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Sobre a Plataforma
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-main)', marginTop: '12px', lineHeight: 1.6 }}>
            Vetor Forense é uma plataforma independente do ecossistema ATRATOR. Atualmente dispõe de análise exploratória de dinâmica veicular e conversão de croquis. Seu roadmap prioriza organização de evidências digitais, relatórios técnicos, análise de artefatos mobile e de mídias. Esses novos módulos ainda não realizam exames.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginTop: '8px',
          }}
          className="about-meta-grid"
        >
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-400)' }}>
              <UserCheck size={18} />
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Desenvolvedor Responsável
              </span>
            </div>
            <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginTop: '6px' }}>
              José Antônio Coutinho de Moraes Filho
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '2px' }}>
              Desenvolvimento de Software e Ferramentas Técnicas
            </p>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
              <Globe size={18} />
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Organização Mantenedora
              </span>
            </div>
            <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginTop: '6px' }}>
              ATRATOR — ecossistema de tecnologia
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '2px' }}>
              Soluções independentes de alta performance
            </p>
          </div>
        </div>
      </div>

      {/* Princípios de Engenharia e Privacidade */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>
          Princípios de Engenharia
        </h2>

        <div className="grid-2">
          <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success-border)' }}>
              <ShieldCheck size={20} />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                Arquitetura Local-First
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Nas ferramentas locais atualmente implementadas, o processamento principal ocorre no dispositivo do usuário. Essa arquitetura, isoladamente, não constitui cadeia de custódia, armazenamento forense seguro ou garantia de autenticidade.
            </p>
          </div>

          <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-400)' }}>
              <Cpu size={20} />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                Desacoplamento e Interoperabilidade
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Os módulos são isolados através do padrão Domain / Adapter / Exporter. O formato .croqui é tratado como adaptador de exportação secundário, permitindo integração transparente com formatos neutros e universais.
            </p>
          </div>
        </div>
      </section>

      <section className="card" aria-labelledby="scope-digital-title" style={{ padding: '24px', border: '1px solid var(--border-highlight)' }}>
        <h2 id="scope-digital-title" style={{ fontSize: '20px', marginBottom: '12px' }}>Escopo digital e limites profissionais</h2>
        <p style={{ fontSize: '13px', lineHeight: 1.7 }}>
          Vetor Evidence, Reports, Mobile, Media, Documents e Fraud são módulos planejados,
          sem coleta de celulares, validação forense de evidências, geração de laudos oficiais
          ou análise de comprometimento disponíveis nesta versão.
        </p>
        <p style={{ fontSize: '13px', lineHeight: 1.7, marginTop: '10px' }}>
          Relatórios técnicos particulares, pareceres de assistentes técnicos, laudos de
          peritos judiciais e laudos de perícia oficial possuem enquadramentos distintos.
          Software, hash e assinatura digital não substituem habilitação profissional,
          preservação adequada e avaliação metodológica do caso concreto.
        </p>
        <p style={{ fontSize: '13px', lineHeight: 1.7, marginTop: '10px' }}>
          Qualquer futura análise de dispositivos deverá ocorrer somente com autorização
          legítima e controles de privacidade e confidencialidade apropriados.
          O sistema não representa atividade, endosso ou parceria com a PRF.
        </p>
      </section>

      {/* Declaração Formal de Independência (Disclaimer) */}
      <section
        style={{
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'rgba(239, 68, 68, 0.04)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f87171' }}>
          Declaração Formal de Independência e Interoperabilidade
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.6 }}>
          “A compatibilidade de determinados módulos com formatos ou sistemas de terceiros não implica vínculo, homologação, parceria ou chancela dessas instituições.”
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
          O suporte ao formato de arquivo .croqui (estruturado para bibliotecas de canvas vetorial como Fabric.js e sistemas correlatos) é implementado com finalidade estritamente técnica de interoperabilidade de dados e conversão gráfica.
        </p>
      </section>

      <style>{`
        @media (max-width: 680px) {
          .about-meta-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
