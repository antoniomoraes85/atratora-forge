import React from 'react';
import { PlusCircle, BookOpen, Clock, BarChart2, Database, FileText, List } from 'lucide-react';
import { loadAnalyses } from '../store/localStore';
import type { VFTab } from './VetorForense';

interface VFDashboardProps {
  onNavigate: (tab: VFTab, analysisId?: string) => void;
}

export const VFDashboard: React.FC<VFDashboardProps> = ({ onNavigate }) => {
  const analyses = loadAnalyses().filter(a => !a.isTutorial);
  const recent = analyses.slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* ── CARD TUTORIAL ── */}
      <div style={{
        padding: '28px', borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(99,102,241,0.08))',
        border: '1px solid rgba(168,85,247,0.25)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '20px',
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <BookOpen size={18} color="#c084fc" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Primeira vez no Vetor Forense?
            </span>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Tutorial guiado disponível
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '480px' }}>
            Aprenda a realizar uma estimativa técnica passo a passo utilizando um caso demonstrativo com dados fictícios.
          </p>
        </div>
        <button
          onClick={() => onNavigate('tutorial')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 22px',
            background: 'rgba(168,85,247,0.2)',
            border: '1px solid rgba(168,85,247,0.4)',
            borderRadius: 'var(--radius-md)',
            color: '#c084fc', fontWeight: 600, fontSize: '14px',
            cursor: 'pointer', transition: 'all var(--transition-fast)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(168,85,247,0.3)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(168,85,247,0.2)';
          }}
        >
          <BookOpen size={16} />
          Iniciar tutorial guiado
        </button>
      </div>

      {/* ── ACESSO RÁPIDO ── */}
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '14px', letterSpacing: '-0.01em' }}>
          Acesso rápido
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {[
            { id: 'nova-analise' as VFTab, label: 'Nova análise', icon: PlusCircle, color: '#38bdf8', bg: 'rgba(56,189,248,0.1)' },
            { id: 'analises' as VFTab, label: 'Análises', icon: List, color: 'var(--primary-400)', bg: 'rgba(99,102,241,0.1)' },
            { id: 'metodos' as VFTab, label: 'Métodos', icon: BarChart2, color: '#34d399', bg: 'rgba(16,185,129,0.1)' },
            { id: 'base-tecnica' as VFTab, label: 'Base técnica', icon: Database, color: '#fbbf24', bg: 'rgba(245,158,11,0.1)' },
            { id: 'tutorial' as VFTab, label: 'Tutorial', icon: BookOpen, color: '#c084fc', bg: 'rgba(168,85,247,0.1)' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  gap: '10px', padding: '16px',
                  background: item.bg, border: `1px solid ${item.color}30`,
                  borderRadius: 'var(--radius-md)', cursor: 'pointer',
                  transition: 'all var(--transition-fast)', textAlign: 'left',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = `${item.color}60`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = `${item.color}30`; }}
              >
                <Icon size={20} color={item.color} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: item.color }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ANÁLISES RECENTES ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
            Análises recentes
          </h2>
          {analyses.length > 0 && (
            <button
              onClick={() => onNavigate('analises')}
              style={{ fontSize: '13px', color: 'var(--primary-400)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Ver todas →
            </button>
          )}
        </div>

        {recent.length === 0 ? (
          <div style={{
            padding: '40px 20px', textAlign: 'center',
            background: 'var(--bg-surface)', border: '1px dashed var(--border-default)',
            borderRadius: 'var(--radius-md)',
          }}>
            <FileText size={32} style={{ color: 'var(--text-dim)', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Nenhuma análise salva ainda.
            </p>
            <button
              onClick={() => onNavigate('nova-analise')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px',
                background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)',
                borderRadius: 'var(--radius-md)', color: '#38bdf8',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              }}
            >
              <PlusCircle size={15} /> Nova análise
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recent.map(a => (
              <div
                key={a.id}
                style={{
                  padding: '16px 20px', background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '16px', flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px', marginBottom: '4px' }}>
                    {a.title}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-dim)' }}>
                    {a.caseNumber && <span>Caso: {a.caseNumber}</span>}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      {new Date(a.updatedAt).toLocaleDateString('pt-BR')}
                    </span>
                    {a.ift !== undefined && (
                      <span>IFT: {a.ift.toFixed(0)}%</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('nova-analise', a.id)}
                  style={{
                    padding: '8px 14px', fontSize: '12px', fontWeight: 600,
                    background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  Abrir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── AVISO LOCAL-FIRST ── */}
      <div style={{
        padding: '12px 16px', background: 'rgba(16,185,129,0.06)',
        border: '1px solid rgba(16,185,129,0.15)', borderRadius: 'var(--radius-md)',
        display: 'flex', alignItems: 'center', gap: '10px',
        fontSize: '12px', color: 'var(--text-dim)',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success-border)', flexShrink: 0 }} />
        Processamento 100% local. Nenhum dado é enviado a servidores externos.
      </div>
    </div>
  );
};
