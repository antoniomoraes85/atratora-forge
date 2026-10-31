import { useMemo, useState, type ElementType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Activity, BriefcaseBusiness, FileCheck2, FileImage, FileSearch,
  FileText, Filter, Fingerprint, Layers3, MapPinned, Search, Settings2,
  ShieldCheck, Smartphone, ScanSearch, Zap,
} from 'lucide-react';
import { PRODUCT_GROUPS, type ProductGroupId } from '../../app/config/productGroups';
import { searchTools, TOOLS_CATALOG, type ToolDefinition, type ToolStatus } from '../../app/config/tools';
import './tools-clean.css';

const ICONS: Record<ToolDefinition['iconName'], ElementType> = {
  FileImage, Layers: Layers3, Map: MapPinned, Activity,
  FileCheck2, FileText, Briefcase: BriefcaseBusiness,
  Settings2, Zap, ShieldCheck, Smartphone, ScanSearch,
  Fingerprint, FileSearch,
};

type ToolFilter = 'all' | ToolStatus;
type GroupFilter = 'all' | ProductGroupId;

export const Tools = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ToolFilter>('all');
  const [group, setGroup] = useState<GroupFilter>('all');

  const filtered = useMemo(() => {
    const groupDef = PRODUCT_GROUPS.find(item => item.id === group);
    return searchTools(query)
      .filter(item => status === 'all' || item.status === status)
      .filter(item => !groupDef || groupDef.toolIds.includes(item.id));
  }, [query, status, group]);

  const availableCount = TOOLS_CATALOG.filter(item => item.status === 'available').length;
  const plannedCount = TOOLS_CATALOG.filter(item => item.status === 'planned').length;

  return (
    <div className="vf-tools-page animate-fade-in">
      <header className="vf-tools-heading">
        <span className="vf-tools-kicker">DIRETÓRIO DE FERRAMENTAS</span>
        <div className="vf-tools-title-row">
          <div>
            <h1>Todas as ferramentas, sem complicação.</h1>
            <p>Encontre o recurso adequado e veja imediatamente o que está disponível ou ainda está no roadmap.</p>
          </div>
          <div className="vf-tools-summary" aria-label="Maturidade da plataforma">
            <span><strong>{availableCount}</strong> ativas</span>
            <span><strong>{plannedCount}</strong> planejadas</span>
          </div>
        </div>
      </header>

      <section className="vf-tools-filter-panel" aria-label="Filtros de ferramentas">
        <div className="vf-tools-filter-row">
          <label className="vf-tools-search">
            <Search size={18} />
            <span className="sr-only">Pesquisar ferramenta</span>
            <input type="search" value={query} onChange={event => setQuery(event.target.value)}
              placeholder="Buscar por função: celular, laudo, croqui…" />
          </label>
          <label className="vf-tools-select">
            <Filter size={16} aria-hidden="true" />
            <span className="sr-only">Filtrar pelo status</span>
            <select value={status} onChange={event => setStatus(event.target.value as ToolFilter)}>
              <option value="all">Todos os estágios</option>
              <option value="available">Disponíveis</option>
              <option value="development">Em desenvolvimento</option>
              <option value="planned">Planejados</option>
            </select>
          </label>
        </div>
        <div className="vf-tools-groups" role="group" aria-label="Grupos de ferramentas">
          <button className={group === 'all' ? 'is-selected' : ''} onClick={() => setGroup('all')} type="button">Todas</button>
          {PRODUCT_GROUPS.map(item => (
            <button key={item.id} className={group === item.id ? 'is-selected' : ''}
              onClick={() => setGroup(item.id)} type="button">{item.label}</button>
          ))}
        </div>
      </section>

      <div className="vf-tools-results">
        <div className="vf-tools-result-title">
          <span>{filtered.length} {filtered.length === 1 ? 'ferramenta encontrada' : 'ferramentas encontradas'}</span>
          <span>O status indica a disponibilidade real na versão atual.</span>
        </div>
        {filtered.length ? (
          <div className="vf-tools-grid">
            {filtered.map(tool => {
              const Icon = ICONS[tool.iconName];
              const available = tool.status === 'available' && Boolean(tool.path);
              const body = (
                <>
                  <div className="vf-tools-card-top">
                    <span className="vf-tools-icon"><Icon size={22} strokeWidth={1.7} /></span>
                    <span className={`vf-tools-badge ${available ? 'is-available' : 'is-future'}`}>
                      {available ? 'Disponível' : tool.status === 'development' ? 'Em desenvolvimento' : 'Planejado'}
                    </span>
                  </div>
                  <h2>{tool.title}</h2>
                  <p>{tool.description}</p>
                  <div className="vf-tools-card-bottom">
                    <span>{PRODUCT_GROUPS.find(x => x.toolIds.includes(tool.id))?.label ?? tool.category}</span>
                    {available && <strong>Acessar <ArrowRight size={15} /></strong>}
                  </div>
                </>
              );
              return available && tool.path ? (
                <Link key={tool.id} to={tool.path} className="vf-tools-card is-clickable">
                  {body}
                </Link>
              ) : (
                <article key={tool.id} className="vf-tools-card is-future">
                  {body}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="vf-tools-empty">
            <Search size={27} />
            <h2>Nenhum resultado encontrado</h2>
            <p>Experimente outra palavra-chave ou selecione todas as categorias.</p>
            <button type="button" className="btn btn-secondary" onClick={() => { setQuery(''); setStatus('all'); setGroup('all'); }}>
              Limpar filtros
            </button>
          </div>
        )}
      </div>
      <aside className="vf-tools-boundary">
        <ShieldCheck size={18} aria-hidden="true" />
        <p>Ferramentas planejadas não executam exames nem emitem laudos nesta versão. Resultados técnicos exigem análise e responsabilidade profissional.</p>
      </aside>
    </div>
  );
};
