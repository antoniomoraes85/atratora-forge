import React, { useState } from 'react';
import { Trash2, Copy, Download, PlusCircle, FileText, Clock, Search } from 'lucide-react';
import { loadAnalyses, deleteAnalysis, duplicateAnalysis, exportAnalysisJSON } from '../store/localStore';
import type { VFTab } from './VetorForense';

interface VFAnalysesListProps {
  onNavigate: (tab: VFTab, analysisId?: string) => void;
}

export const VFAnalysesList: React.FC<VFAnalysesListProps> = ({ onNavigate }) => {
  const [analyses, setAnalyses] = useState(() => loadAnalyses().filter(a => !a.isTutorial));
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = analyses.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.caseNumber ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteAnalysis(id);
    setAnalyses(loadAnalyses().filter(a => !a.isTutorial));
    setConfirmDelete(null);
  };

  const handleDuplicate = (id: string) => {
    duplicateAnalysis(id);
    setAnalyses(loadAnalyses().filter(a => !a.isTutorial));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Análises salvas</h2>
        <button
          onClick={() => onNavigate('nova-analise')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 18px',
            background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)',
            borderRadius: 'var(--radius-md)', color: '#38bdf8',
            fontWeight: 600, fontSize: '13px', cursor: 'pointer',
          }}
        >
          <PlusCircle size={15} /> Nova análise
        </button>
      </div>

      {/* Search */}
      {analyses.length > 0 && (
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="search"
            placeholder="Buscar por título ou nº do caso..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 36px', fontSize: '13px' }}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{
          padding: '60px 20px', textAlign: 'center',
          background: 'var(--bg-surface)', border: '1px dashed var(--border-default)',
          borderRadius: 'var(--radius-md)',
        }}>
          <FileText size={40} style={{ color: 'var(--text-dim)', margin: '0 auto 16px' }} />
          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
            {analyses.length === 0 ? 'Nenhuma análise salva' : 'Nenhum resultado'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
            {analyses.length === 0 ? 'Crie uma nova análise para começar.' : 'Tente outro termo de busca.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(a => (
            <div
              key={a.id}
              style={{
                padding: '18px 20px', background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
              }}
            >
              {confirmDelete === a.id ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', color: 'var(--danger-text)', flex: 1 }}>
                    Excluir "{a.title}"? Esta ação não pode ser desfeita.
                  </span>
                  <button
                    onClick={() => handleDelete(a.id)}
                    style={{ padding: '8px 14px', background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 'var(--radius-sm)', color: 'var(--danger-text)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Confirmar exclusão
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    style={{ padding: '8px 14px', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px', marginBottom: '6px' }}>
                      {a.title}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
                      {a.caseNumber && <span>Caso: {a.caseNumber}</span>}
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        {new Date(a.updatedAt).toLocaleString('pt-BR')}
                      </span>
                      <span>{a.vehicles.length} veículo(s)</span>
                      <span>{a.tracks.length} vestígio(s)</span>
                      {a.ift !== undefined && (
                        <span style={{ color: 'var(--primary-400)' }}>IFT: {a.ift.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      title="Abrir"
                      onClick={() => onNavigate('nova-analise', a.id)}
                      style={{ padding: '8px 14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 'var(--radius-sm)', color: '#38bdf8', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Abrir
                    </button>
                    <button
                      title="Duplicar"
                      onClick={() => handleDuplicate(a.id)}
                      style={{ padding: '8px', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', color: 'var(--text-dim)', cursor: 'pointer' }}
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      title="Exportar JSON"
                      onClick={() => exportAnalysisJSON(a)}
                      style={{ padding: '8px', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', color: 'var(--text-dim)', cursor: 'pointer' }}
                    >
                      <Download size={14} />
                    </button>
                    <button
                      title="Excluir"
                      onClick={() => setConfirmDelete(a.id)}
                      style={{ padding: '8px', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', color: 'var(--danger-text)', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
