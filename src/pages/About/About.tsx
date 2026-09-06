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
            “Atratora Forge é uma plataforma independente desenvolvida pela Atratora Labs para criação de ferramentas voltadas à automação de fluxos técnicos.”
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
              Engenharia & Automação Técnica
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
              Atratora Labs
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
              Todas as manipulações de arquivos, renderização em canvas e serialização operam estritamente no seu computador. Não há telemetria, não há cookies rastreadores e nenhum byte é transmitido para nuvens externas.
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
