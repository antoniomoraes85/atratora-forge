import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileImage } from 'lucide-react';
import { TOOLS_CATALOG } from '../../app/config/tools';
import { GUIDES_CATALOG } from '../../app/config/guides';

export const Home: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Effet Parallax do circuito (mouse tracking com clamp para performance)
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20; // range -10 a 10
          const y = (e.clientY / window.innerHeight - 0.5) * 20;
          setMousePos({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Respeitar prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
       window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const availableToolsCount = TOOLS_CATALOG.filter(t => t.status === 'available').length;
  const devToolsCount = TOOLS_CATALOG.filter(t => t.status !== 'available').length;
  const totalGuides = GUIDES_CATALOG.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }} className="animate-fade-in">
      
      {/* ── HERO SECTION COM CIRCUITO PARALLAX ── */}
      <section 
        style={{
          position: 'relative',
          padding: '100px 40px 120px',
          margin: '-40px -40px 0', // compensa o padding do main content para preencher a tela
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-primary)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Background grid */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.5,
            zIndex: 0
          }}
        />

        {/* SVG Circuito Background (Parallax) */}
        <div 
           className="circuit-bg"
           style={{
             position: 'absolute',
             inset: '-50px',
             zIndex: 1,
             opacity: 0.8,
             pointerEvents: 'none',
             transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
             transition: 'transform 0.1s ease-out'
           }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary-600)" stopOpacity="0.05" />
                <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--primary-600)" stopOpacity="0.05" />
              </linearGradient>
              <pattern id="circuitPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                {/* Trilhas de PCB / Circuitos abstratos */}
                <path d="M 20 100 L 80 100 L 100 80 L 100 20" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" />
                <circle cx="20" cy="100" r="2" fill="var(--accent-cyan)" opacity="0.3" />
                <circle cx="100" cy="20" r="3" fill="var(--primary-500)" opacity="0.4" />
                
                <path d="M 120 150 L 150 150 L 170 170 L 200 170" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" />
                <rect x="118" y="148" width="4" height="4" fill="var(--primary-400)" opacity="0.2" />

                <path d="M 50 180 L 50 140 L 80 110" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" strokeDasharray="4,4" />
                <circle cx="50" cy="180" r="2" fill="var(--accent-cyan)" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuitPattern)" />
          </svg>
        </div>

        {/* Glow center */}
        <div 
          style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             width: '60vw',
             height: '60vw',
             background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 60%)',
             opacity: 0.5,
             zIndex: 1,
             pointerEvents: 'none'
          }}
        />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }} className="animate-fade-in">
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'var(--bg-glass-card)', border: '1px solid var(--border-highlight)', borderRadius: 'var(--radius-full)', marginBottom: '32px', boxShadow: 'var(--shadow-md)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-400)', boxShadow: '0 0 10px var(--primary-400)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Atratora Forge v0.2.0
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
             Tecnologia aplicada a <br/>
             <span style={{ 
               background: 'linear-gradient(135deg, var(--accent-cyan), var(--primary-400))', 
               WebkitBackgroundClip: 'text', 
               WebkitTextFillColor: 'transparent',
               display: 'inline-block'
             }}>
                fluxos técnicos
             </span>
             , operacionais e analíticos.
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px', maxWidth: '720px', margin: '0 auto 16px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            A Atratora Forge reúne soluções desenvolvidas pela Atratora Labs para converter, estruturar, analisar e automatizar tarefas técnicas em uma plataforma modular, privada e orientada à produtividade.
          </p>

          <p style={{ fontSize: '15px', color: 'var(--text-dim)', marginBottom: '40px', fontWeight: 500 }}>
            Da informação bruta ao resultado técnico, com mais precisão e menos trabalho manual.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
             <Link to="/tools" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '15px', borderRadius: 'var(--radius-full)' }}>
                Explorar ferramentas
             </Link>
             <Link to="/guides" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '15px', borderRadius: 'var(--radius-full)', background: 'var(--bg-glass-card)' }}>
                Conhecer a plataforma
             </Link>
          </div>

        </div>
      </section>


      {/* ── ESTATÍSTICAS E POSICIONAMENTO ── */}
      <section style={{ padding: '60px 0' }}>
         <div className="grid-3">
            <div className="card card-glass" style={{ textAlign: 'center', padding: '32px 20px' }}>
               <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--primary-400)', marginBottom: '8px', lineHeight: 1 }}>
                 {availableToolsCount}
               </div>
               <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)', marginBottom: '4px' }}>
                 Disponíveis
               </div>
               <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>Motor central funcional e rodando 100% localmente.</p>
            </div>

            <div className="card card-glass" style={{ textAlign: 'center', padding: '32px 20px' }}>
               <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '8px', lineHeight: 1 }}>
                 {devToolsCount}
               </div>
               <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)', marginBottom: '4px' }}>
                 Planejadas
               </div>
               <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>Ferramentas geográficas, documentais e operacionais.</p>
            </div>

            <div className="card card-glass" style={{ textAlign: 'center', padding: '32px 20px' }}>
               <div style={{ fontSize: '48px', fontWeight: 800, color: '#c084fc', marginBottom: '8px', lineHeight: 1 }}>
                 {totalGuides}
               </div>
               <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)', marginBottom: '4px' }}>
                 Guias Visuais
               </div>
               <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>Interfaces conceituais e documentação de fluxos operacionais.</p>
            </div>
         </div>
      </section>

      {/* ── HIGHLIGHT DA PRIMEIRA FERRAMENTA ── */}
      <section style={{ padding: '0 0 80px' }}>
         <div className="card" style={{ padding: '40px', background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-primary))', position: 'relative', overflow: 'hidden' }}>
            
            <div style={{ position: 'absolute', right: '-40px', top: '-40px', opacity: 0.05, transform: 'scale(2)' }}>
               <FileImage size={300} />
            </div>

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
               <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
                 <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success-border)', boxShadow: '0 0 8px var(--success-border)' }} />
                 <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Módulo Ativo</span>
               </div>
               
               <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                 Conversor .CROQUI 
               </h2>
               <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
                 A primeira ferramenta da suíte Atratora Forge já está disponível. Converta imagens rasterizadas para a especificação formal <code>.croqui</code> em JSON usando nosso adaptador nativo, estruturando dados sem depender de servidores remotos. A plataforma será progressivamente expandida para cobrir operações espaciais, documentos e automação.
               </p>
               
               <div style={{ display: 'flex', gap: '16px' }}>
                 <Link to="/tools/croqui-converter" className="btn btn-primary">
                    Abrir Conversor <ArrowRight size={16} />
                 </Link>
                 <Link to="/guides" className="btn btn-secondary">
                    Ver guia de uso
                 </Link>
               </div>
            </div>
         </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .circuit-bg {
            transform: translate(0, 0) !important;
            transition: none !important;
          }
        }
      `}</style>

    </div>
  );
};
