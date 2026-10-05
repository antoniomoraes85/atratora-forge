import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, PlusCircle, BookOpen, Database, List, Home, ChevronRight, CarFront, Waves, Ruler, Sparkles } from 'lucide-react';
import { VFDashboard } from './VFDashboard';
import { VFNewAnalysis } from './VFNewAnalysis';
import { VFAnalysesList } from './VFAnalysesList';
import { VFMethods } from './VFMethods';
import { VFTechnicalBase } from './VFTechnicalBase';
import { VFTutorial } from './VFTutorial';

export type VFTab = 'dashboard' | 'nova-analise' | 'analises' | 'metodos' | 'base-tecnica' | 'tutorial';

const TABS: { id: VFTab; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Visão geral', icon: Home },
  { id: 'nova-analise', label: 'Nova análise', icon: PlusCircle },
  { id: 'analises', label: 'Análises', icon: List },
  { id: 'metodos', label: 'Métodos', icon: BarChart2 },
  { id: 'base-tecnica', label: 'Base técnica', icon: Database },
  { id: 'tutorial', label: 'Tutorial', icon: BookOpen },
];

export const VetorForense: React.FC = () => {
  const [activeTab, setActiveTab] = useState<VFTab>('dashboard');
  const [editingAnalysisId, setEditingAnalysisId] = useState<string | null>(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallax(Math.min(24, window.scrollY * 0.08));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Permite que sub-componentes naveguem entre abas
  const navigate = (tab: VFTab, analysisId?: string) => {
    setActiveTab(tab);
    if (analysisId !== undefined) setEditingAnalysisId(analysisId);
    else if (tab !== 'nova-analise') setEditingAnalysisId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Limpa o ID de edição ao sair da aba de nova análise
    if (activeTab !== 'nova-analise') {
      setEditingAnalysisId(null);
    }
  }, [activeTab]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }} className="animate-fade-in">

      {/* ── BREADCRUMB ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '13px', color: 'var(--text-dim)' }}>
        <Link to="/tools" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Ferramentas</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-muted)' }}>Vetor Forense</span>
      </div>

      {/* ── HEADER DO MÓDULO ── */}
      <div style={{
        padding: '28px 32px',
        background: 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(99,102,241,0.06) 100%)',
        border: '1px solid rgba(56,189,248,0.15)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow de fundo */}
        <div style={{
          position: 'absolute', top: '-20px', right: '-20px', width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          transform: `translate3d(0, ${parallax}px, 0)`, transition: 'transform 120ms linear',
        }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: 30, bottom: 18, display: 'flex', alignItems: 'center', gap: 8, opacity: .8, transform: `translate3d(0, ${parallax * -0.5}px, 0)` }}>
          {[CarFront, Waves, Ruler].map((Icon, i) => <span key={i} style={{ width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', background: 'rgba(15,23,42,.55)', border: '1px solid rgba(125,211,252,.25)', color: i === 1 ? '#a78bfa' : '#7dd3fc' }}><Icon size={16} /></span>)}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#38bdf8',
            }}>
              <BarChart2 size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                Vetor Forense
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{
                  fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                  padding: '2px 8px', background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-full)',
                  color: 'var(--success-text)',
                }}>ATIVO</span>
                <span style={{
                  fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                  padding: '2px 8px', background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.3)', borderRadius: 'var(--radius-full)',
                  color: 'var(--primary-400)',
                }}>NOVO</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '600px' }}>
            Análise Técnica de Velocidade e Dinâmica em Sinistros de Trânsito
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '6px', fontStyle: 'italic' }}>
            Reconstrução baseada em vestígios, cinemática e dinâmica.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            {['Dados locais', 'Cálculo rastreável', 'Intervalos explicados'].map(label => <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 9px', borderRadius: 8, background: 'rgba(15,23,42,.38)', color: 'var(--text-muted)', fontSize: 11 }}><Sparkles size={12} color="#a78bfa" />{label}</span>)}
          </div>
        </div>
      </div>

      {/* ── SUBNAVEGAÇÃO ── */}
      <div style={{
        display: 'flex', gap: '4px', flexWrap: 'wrap',
        padding: '6px', background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
        marginBottom: '28px',
      }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: 'var(--radius-sm)',
                fontSize: '13px', fontWeight: isActive ? 600 : 500,
                border: '1px solid',
                borderColor: isActive ? 'rgba(56,189,248,0.35)' : 'transparent',
                background: isActive ? 'rgba(56,189,248,0.12)' : 'transparent',
                color: isActive ? '#38bdf8' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                // Destaque extra para Tutorial
                ...(tab.id === 'tutorial' && !isActive ? {
                  borderColor: 'rgba(168,85,247,0.2)',
                  background: 'rgba(168,85,247,0.06)',
                  color: '#c084fc',
                } : {}),
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── CONTEÚDO ── */}
      {activeTab === 'dashboard' && (
        <VFDashboard onNavigate={navigate} />
      )}
      {activeTab === 'nova-analise' && (
        <VFNewAnalysis
          analysisId={editingAnalysisId}
          onNavigate={navigate}
        />
      )}
      {activeTab === 'analises' && (
        <VFAnalysesList onNavigate={navigate} />
      )}
      {activeTab === 'metodos' && (
        <VFMethods />
      )}
      {activeTab === 'base-tecnica' && (
        <VFTechnicalBase />
      )}
      {activeTab === 'tutorial' && (
        <VFTutorial onNavigate={navigate} />
      )}
    </div>
  );
};
