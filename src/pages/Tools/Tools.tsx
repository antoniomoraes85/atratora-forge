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
  Briefcase,
  Settings2,
  Search,
  Filter,
  Zap,
} from 'lucide-react';
import {
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
  Briefcase,
  Settings2,
  Zap,
};

// Cores accent por categoria (Premium Palette)
const CATEGORY_ACCENT: Record<ToolCategory, { bg: string; color: string; border: string }> = {
  Conversores:         { bg: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary-400)', border: 'rgba(99, 102, 241, 0.25)' },
  Geoprocessamento:    { bg: 'rgba(34, 211, 238, 0.12)', color: 'var(--accent-cyan)', border: 'rgba(34, 211, 238, 0.25)' },
  Croquis:             { bg: 'rgba(168, 85, 247, 0.12)', color: '#c084fc', border: 'rgba(168, 85, 247, 0.25)' },
  Análise:             { bg: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: 'rgba(56, 189, 248, 0.25)' },
  Validação:           { bg: 'rgba(234, 179, 8, 0.12)',  color: '#facc15', border: 'rgba(234, 179, 8, 0.25)' },
  Documentos:          { bg: 'rgba(244, 63, 94, 0.12)',  color: '#fb7185', border: 'rgba(244, 63, 94, 0.25)' },
  'Operações de Campo':{ bg: 'rgba(16, 185, 129, 0.12)', color: '#34d399', border: 'rgba(16, 185, 129, 0.25)' },
  Automação:           { bg: 'rgba(249, 115, 22, 0.12)', color: '#fb923c', border: 'rgba(249, 115, 22, 0.25)' },
};

type StatusFilter = 'all' | 'available' | 'development';

export const Tools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'Todas'>('Todas');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredTools = useMemo(() => {
    let results = searchTools(searchQuery);

    if (selectedCategory !== 'Todas') {
      results = results.filter((t) => t.category === selectedCategory);
    }

    if (statusFilter !== 'all') {
      results = results.filter((t) => t.status === statusFilter);
    }

    return results;
  }, [searchQuery, selectedCategory, statusFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-fade-in">
      
      {/* Header Diretorio */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Diretório de Ferramentas
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
          Explore o catálogo de ferramentas desenvolvidas pela Atratora Labs para automatizar, converter e validar fluxos técnicos complexos.
        </p>
      </div>

      <div className="divider" style={{ margin: '8px 0' }} />

      {/* Toolbar - Busca e Filtros */}
      <div 
        className="card" 
        style={{ 
          padding: '20px',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          
          {/* Search Box */}
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} 
            />
            <input
              type="search"
              placeholder="Buscar ferramentas, palavras-chave, categorias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Filter size={16} color="var(--text-dim)" />
             <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  minWidth: '160px',
                }}
             >
                <option value="all">Todos os Status</option>
                <option value="available">Disponíveis (v0.1)</option>
                <option value="development">Em Desenvolvimento</option>
             </select>
          </div>
        </div>

        {/* Categories Pill Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
             onClick={() => setSelectedCategory('Todas')}
             style={{
               padding: '6px 14px',
               borderRadius: 'var(--radius-full)',
               fontSize: '12px',
               fontWeight: 600,
               border: '1px solid',
               backgroundColor: selectedCategory === 'Todas' ? 'rgba(255,255,255,0.1)' : 'transparent',
               borderColor: selectedCategory === 'Todas' ? 'var(--border-active)' : 'var(--border-default)',
               color: selectedCategory === 'Todas' ? '#fff' : 'var(--text-muted)',
               cursor: 'pointer',
               transition: 'all 0.2s',
             }}
          >
            Todas
          </button>

          {TOOL_CATEGORIES.map((cat) => {
             const isSelected = selectedCategory === cat;
             const colors = CATEGORY_ACCENT[cat];
             return (
               <button
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 style={{
                   padding: '6px 14px',
                   borderRadius: 'var(--radius-full)',
                   fontSize: '12px',
                   fontWeight: 600,
                   border: '1px solid',
                   backgroundColor: isSelected ? colors.bg : 'transparent',
                   borderColor: isSelected ? colors.border : 'var(--border-default)',
                   color: isSelected ? colors.color : 'var(--text-muted)',
                   cursor: 'pointer',
                   transition: 'all 0.2s',
                 }}
               >
                 {cat}
               </button>
             );
          })}
        </div>
      </div>

      {/* Grid de Ferramentas */}
      {filteredTools.length > 0 ? (
        <div className="grid-2">
          {filteredTools.map((tool, idx) => {
            const Icon = ICON_MAP[tool.iconName];
            const isAvailable = tool.status === 'available';
            const colors = CATEGORY_ACCENT[tool.category];
            
            const cardContent = (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: colors.bg,
                      color: colors.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  {isAvailable ? (
                    <span className="badge badge-success">Disponível</span>
                  ) : (
                    <span className="badge badge-neutral">Planejado {tool.deliveryVersion}</span>
                  )}
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {tool.title}
                </h3>
                
                <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', lineHeight: 1.5, flex: 1 }}>
                  {tool.description}
                </p>

                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <span 
                     style={{ 
                       fontSize: '11px', 
                       fontWeight: 600, 
                       textTransform: 'uppercase', 
                       letterSpacing: '0.04em',
                       color: colors.color 
                     }}
                   >
                     {tool.category}
                   </span>

                   {isAvailable && (
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-400)', fontSize: '13px', fontWeight: 600 }}>
                        Acessar <ArrowRight size={16} />
                     </div>
                   )}
                </div>
              </>
            );

            const cardStyle = {
               display: 'flex',
               flexDirection: 'column' as const,
               height: '100%',
               opacity: isAvailable ? 1 : 0.65,
               animationDelay: `${idx * 40}ms`
            };

            if (isAvailable && tool.path) {
               return (
                  <Link 
                    key={tool.id} 
                    to={tool.path} 
                    className="card card-hover animate-fade-in"
                    style={{ ...cardStyle, textDecoration: 'none' }}
                  >
                     {cardContent}
                  </Link>
               );
            }

            return (
               <div key={tool.id} className="card animate-fade-in" style={cardStyle}>
                 {cardContent}
               </div>
            );
          })}
        </div>
      ) : (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-default)' }}>
           <Search size={40} style={{ color: 'var(--border-default)', margin: '0 auto 16px' }} />
           <h3 style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '8px' }}>Nenhuma ferramenta encontrada</h3>
           <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>
             Tente ajustar os filtros ou os termos da busca.
           </p>
        </div>
      )}

    </div>
  );
};
