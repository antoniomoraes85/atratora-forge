import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileImage,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Map,
  Layers,
  FileCheck2,
  FileText,
  Activity,
  Check,
} from 'lucide-react';
import {
  TOOLS_CATALOG,
  getAvailableTools,
  type ToolDefinition,
} from '../../app/config/tools';

// Mapeamento de iconName → Componente Lucide
const ICON_MAP: Record<ToolDefinition['iconName'], React.ElementType> = {
  FileImage,
  Layers,
  Map,
  Activity,
  FileCheck2,
  FileText,
};

// Cores accent para cards "Em Desenvolvimento" na Home
const DEV_CARD_ACCENT: Record<string, { bg: string; color: string }> = {
  'croqui-studio':  { bg: 'rgba(99, 102, 241, 0.1)',  color: 'var(--primary-400)' },
  'map-studio':     { bg: 'rgba(56, 189, 248, 0.1)',  color: 'var(--accent-cyan)' },
  dynamics:         { bg: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' },
  validator:        { bg: 'rgba(234, 179, 8, 0.1)',   color: '#facc15' },
  documents:        { bg: 'rgba(244, 63, 94, 0.1)',   color: '#fb7185' },
};

export const Home: React.FC = () => {
  const [featuredTool] = getAvailableTools();
  const devTools = TOOLS_CATALOG.filter((t) => t.status === 'development');

  const FeaturedIcon = featuredTool ? ICON_MAP[featuredTool.iconName] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }} className="animate-fade-in">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '48px 40px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Glow ambiental */}
        <div
          style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '-40px', left: '30%',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(129, 140, 248, 0.25)',
              color: 'var(--primary-300)', fontSize: '12px', fontWeight: 600, marginBottom: '20px',
            }}
          >
            <Sparkles size={15} />
            <span>Atratora Labs • Versão 0.1.0</span>
          </div>

          <h1
            style={{
              fontSize: '40px', fontWeight: 800, letterSpacing: '-0.03em',
              color: '#ffffff', lineHeight: 1.15,
            }}
          >
            Ferramentas inteligentes para transformar fluxos técnicos.
          </h1>

          <p
            style={{
              fontSize: '17px', color: 'var(--text-muted)',
              marginTop: '16px', lineHeight: 1.6, maxWidth: '720px',
            }}
          >
            Atratora Forge reúne aplicações independentes da Atratora Labs para conversão,
            criação, análise e automação de tarefas técnicas, priorizando máxima privacidade e
            processamento local.
          </p>

          <div style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
            <Link to="/tools" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
              <span>Explorar Ferramentas</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/about" className="btn btn-secondary" style={{ padding: '12px 20px', fontSize: '15px' }}>
              <span>Sobre a Plataforma</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Ferramenta Disponível em Destaque ─────────────── */}
      {featuredTool && FeaturedIcon && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>
                Ferramenta Disponível
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '2px' }}>
                Módulo operacional pronto para utilização imediata no navegador.
              </p>
            </div>
            <span className="badge badge-success">Operacional</span>
          </div>

          {/* Card principal */}
          <div
            className="card card-hover"
            style={{
              position: 'relative',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-highlight)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: '32px',
              padding: '32px',
              alignItems: 'center',
            }}
          >
            {/* Lado esquerdo: info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary-400)',
                  }}
                >
                  <FeaturedIcon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
                    {featuredTool.title}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--success-text)', fontWeight: 600 }}>
                    ● Disponível na {featuredTool.deliveryVersion}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {featuredTool.description}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-accent">
                  <ShieldCheck size={13} /> Local
                </span>
                <span className="badge badge-neutral">
                  <Check size={13} /> Privado
                </span>
                <span className="badge badge-neutral">
                  <Zap size={13} /> Sem instalação
                </span>
              </div>

              <div style={{ marginTop: '8px' }}>
                <Link
                  to={featuredTool.path!}
                  className="btn btn-primary"
                  style={{ padding: '12px 22px', fontSize: '14px' }}
                >
                  <span>Abrir Ferramenta</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Lado direito: diagrama de pipeline */}
            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px',
              }}
            >
              <div
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px',
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Pipeline de Conversão</span>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  JPG / PNG → .CROQUI
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-dim)' }}>
                {[
                  { dot: 'var(--primary-400)',  text: 'Upload de arquivos rasterizados (JPG, PNG, WEBP, BMP)' },
                  { dot: 'var(--accent-cyan)',  text: 'Renderização e redimensionamento via Canvas (1300 px)' },
                  { dot: 'var(--success-border)', text: 'Serialização em JSON estrito compatível com canvas Fabric' },
                ].map(({ dot, text }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span
                      style={{
                        flexShrink: 0, marginTop: '5px',
                        width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dot,
                      }}
                    />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '6px', padding: '10px 14px',
                  backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
                  fontSize: '11px', color: 'var(--text-dim)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                🔒 100% Client-Side: Seus arquivos nunca saem da sua máquina.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Próximos Módulos em Desenvolvimento ───────────── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>
            Próximos Módulos em Desenvolvimento
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '2px' }}>
            Arquitetura prevista para expansão contínua da plataforma Atratora Forge.
          </p>
        </div>

        <div className="grid-3">
          {devTools.map((tool) => {
            const IconComp = ICON_MAP[tool.iconName];
            const accent   = DEV_CARD_ACCENT[tool.id] ?? { bg: 'var(--bg-tertiary)', color: 'var(--text-dim)' };

            return (
              <div
                key={tool.id}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '38px', height: '38px', borderRadius: 'var(--radius-sm)',
                      backgroundColor: accent.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: accent.color,
                    }}
                  >
                    <IconComp size={20} />
                  </div>
                  <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                    Em desenvolvimento
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
