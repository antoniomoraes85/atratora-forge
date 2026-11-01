import { useEffect, useState, type ElementType } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2, PlusCircle, BookOpen, Database, List, Home,
  ChevronRight, CarFront, ShieldCheck,
} from 'lucide-react';
import { VFDashboard } from './VFDashboard';
import { VFNewAnalysis } from './VFNewAnalysis';
import { VFAnalysesList } from './VFAnalysesList';
import { VFMethods } from './VFMethods';
import { VFTechnicalBase } from './VFTechnicalBase';
import { VFTutorial } from './VFTutorial';
import './vetor-module-ui.css';

export type VFTab = 'dashboard' | 'nova-analise' | 'analises' | 'metodos' | 'base-tecnica' | 'tutorial';

const TABS: { id: VFTab; label: string; icon: ElementType }[] = [
  { id: 'dashboard', label: 'Visão geral', icon: Home },
  { id: 'nova-analise', label: 'Nova análise', icon: PlusCircle },
  { id: 'analises', label: 'Análises', icon: List },
  { id: 'metodos', label: 'Métodos', icon: BarChart2 },
  { id: 'base-tecnica', label: 'Base técnica', icon: Database },
  { id: 'tutorial', label: 'Guia de uso', icon: BookOpen },
];

/** Estrutura e estado preservados: apenas a apresentação foi revista. */
export const VetorForense = () => {
  const [activeTab, setActiveTab] = useState<VFTab>('dashboard');
  const [editingAnalysisId, setEditingAnalysisId] = useState<string | null>(null);

  const navigate = (tab: VFTab, analysisId?: string) => {
    setActiveTab(tab);
    if (analysisId !== undefined) setEditingAnalysisId(analysisId);
    else if (tab !== 'nova-analise') setEditingAnalysisId(null);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    if (activeTab !== 'nova-analise') setEditingAnalysisId(null);
  }, [activeTab]);

  return (
    <div className="vf-module-page animate-fade-in">
      <nav className="vf-module-breadcrumb" aria-label="Caminho de navegação">
        <Link to="/tools">Catálogo de ferramentas</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page">Reconstrução de Dinâmica Veicular</span>
      </nav>

      <header className="vf-module-header">
        <div className="vf-module-header-main">
          <span className="vf-module-header-icon" aria-hidden="true"><CarFront size={27} strokeWidth={1.75} /></span>
          <div className="vf-module-header-text">
            <span className="vf-module-kicker">FERRAMENTA TÉCNICA · DINÂMICA VEICULAR</span>
            <h1>Reconstrução de Dinâmica Veicular</h1>
            <p>Estimativas físicas e reconstrução cinemática com parâmetros e premissas documentados.</p>
          </div>
        </div>
        <span className="vf-module-ready"><ShieldCheck size={15} /> Disponível</span>
      </header>

      <nav className="vf-subnav" aria-label="Funções da análise veicular">
        <div className="vf-subnav-items">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={selected}
                onClick={() => navigate(tab.id)}
                className={`vf-subnav-item${selected ? ' is-active' : ''}${tab.id === 'nova-analise' ? ' is-action' : ''}`}
              >
                <Icon size={17} strokeWidth={1.85} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="vf-module-content">
        {activeTab === 'dashboard' && <VFDashboard onNavigate={navigate} />}
        {activeTab === 'nova-analise' && (
          <VFNewAnalysis analysisId={editingAnalysisId} onNavigate={navigate} />
        )}
        {activeTab === 'analises' && <VFAnalysesList onNavigate={navigate} />}
        {activeTab === 'metodos' && <VFMethods />}
        {activeTab === 'base-tecnica' && <VFTechnicalBase />}
        {activeTab === 'tutorial' && <VFTutorial onNavigate={navigate} />}
      </div>
    </div>
  );
};
