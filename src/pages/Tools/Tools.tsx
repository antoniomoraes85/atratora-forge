import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileImage,
  ArrowRight,
  Map,
  Layers,
  FileCheck2,
  FileText,
  Activity,
  Search,
  Filter,
} from 'lucide-react';
import {
  TOOLS_CATALOG,
  TOOL_CATEGORIES,
  searchTools,
  type ToolDefinition,
  type ToolCategory,
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

// Cores accent por categoria
const CATEGORY_ACCENT: Record<ToolCategory, { bg: string; color: string }> = {
  Conversores:      { bg: 'rgba(99, 102, 241, 0.12)',  color: 'var(--primary-400)' },
  Geoprocessamento: { bg: 'rgba(56, 189, 248, 0.12)',  color: 'var(--accent-cyan)' },
  Croquis:          { bg: 'rgba(168, 85, 247, 0.12)',  color: '#c084fc' },
  Análise:          { bg: 'rgba(168, 85, 247, 0.12)',  color: '#c084fc' },
  Validação:        { bg: 'rgba(234, 179, 8, 0.12)',   color: '#facc15' },
  Documentos:       { bg: 'rgba(244, 63, 94, 0.12)',   color: '#fb7185' },
};

type StatusFilter = 'all' | 'available' | 'development';

export const Tools: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<ToolCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const availableCount  = TOOLS_CATALOG.filter((t) => t.status === 'available').length;
  const devCount        = TOOLS_CATALOG.filter((t) => t.status === 'development').length;

  const filteredTools = useMemo(() => {
    let tools = searchTools(search);

    if (statusFilter !== 'all') {
      tools = tools.filter((t) => t.status === statusFilter);
    }
    if (categoryFilter !== 'all') {
      tools = tools.filter((t) => t.category === categoryFilter);
    }

    return tools;
  }, [search, statusFilter, categoryFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-fade-in">

      {/* ── Cabeçalho ─────────────────────────────────────── */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Diretório de Ferramentas
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '4px' }}>
          {TOOLS_CATALOG.length} aplicações modulares da Atratora Labs para automação de fluxos técnicos.
        </p>
      </div>

      {/* ── Busca + Filtros ────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Barra de busca */}
        <div style={{ position: 'relative', maxWidth: '480px' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--text-dim)' }}
          />
          <input
            id="tools-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, categoria ou tag…"
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              color: 'var(--text-main)',
            }}
          />
        </div>

        {/* Filtros de status e categoria */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Status */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Filter size={14} style={{ color: 'var(--text-dim)' }} />
            {([
              ['all',          `Todas (${TOOLS_CATALOG.length})`],
              ['available',    `Disponíveis (${availableCount})`],
              ['development',  `Em desenvolvimento (${devCount})`],
            ] as [StatusFilter, string][]).map(([val, label]) => (
              <button
                key={val}
                id={`filter-status-${val}`}
                onClick={() => setStatusFilter(val)}
                className={`btn ${statusFilter === val ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '7px 14px', fontSize: '12px' }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Categoria */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              id="filter-cat-all"
              onClick={() => setCategoryFilter('all')}
              className={`btn ${categoryFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              Todas as áreas
            </button>
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat}`}
                onClick={() => setCategoryFilter(cat)}
                className={`btn ${categoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '11px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Resultado de busca ─────────────────────────────── */}
      {search && (
        <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '-8px' }}>
          {filteredTools.length === 0
            ? 'Nenhuma ferramenta corresponde à sua busca.'
            : `${filteredTools.length} ferramenta${filteredTools.length > 1 ? 's' : ''} encontrada${filteredTools.length > 1 ? 's' : ''}.`}
        </p>
      )}

      {/* ── Grid de Ferramentas ────────────────────────────── */}
      <div className="grid-2">
        {filteredTools.map((tool) => {
          const IconComp   = ICON_MAP[tool.iconName];
          const isAvail    = tool.status === 'available';
          const accent     = CATEGORY_ACCENT[tool.category];

          return (
            <div
              key={tool.id}
              id={`tool-card-${tool.id}`}
              className={`card ${isAvail ? 'card-hover' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                borderColor: isAvail ? 'var(--border-highlight)' : 'var(--border-subtle)',
                backgroundColor: isAvail ? 'var(--bg-secondary)' : 'rgba(15, 19, 28, 0.5)',
              }}
            >
              {/* Topo do card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isAvail ? accent.bg : 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isAvail ? accent.color : 'var(--text-dim)',
                    }}
                  >
                    <IconComp size={22} />
                  </div>

                  {isAvail
                    ? <span className="badge badge-success">Disponível</span>
                    : <span className="badge badge-neutral">Em desenvolvimento</span>}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {tool.title}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-dim)',
                        backgroundColor: 'var(--bg-tertiary)',
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {tool.category}
                    </span>
                    {tool.deliveryVersion && (
                      <span
                        style={{
                          fontSize: '10px',
                          color: 'var(--text-dim)',
                          fontFamily: 'var(--font-mono)',
                          opacity: 0.7,
                        }}
                      >
                        {tool.deliveryVersion}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.55 }}>
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Rodapé do card */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                {isAvail && tool.path ? (
                  <Link
                    to={tool.path}
                    id={`open-tool-${tool.id}`}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '10px 18px', fontSize: '13px' }}
                  >
                    <span>Abrir Ferramenta</span>
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-dim)',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      padding: '6px',
                    }}
                  >
                    Planejado para as próximas versões do Roadmap
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
