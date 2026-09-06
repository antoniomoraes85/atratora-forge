import React from 'react';
import { BookOpen } from 'lucide-react';
import { GUIDES_CATALOG, GuideDefinition } from '../../app/config/guides';
import { GuideCard } from '../../components/guides/GuideCard';

export const Guides: React.FC = () => {
  const availableGuides = GUIDES_CATALOG.filter(g => g.status === 'available');
  const conceptGuides = GUIDES_CATALOG.filter(g => g.status === 'conceptual');
  const plannedGuides = GUIDES_CATALOG.filter(g => g.status === 'planned');

  const renderSection = (title: string, guides: GuideDefinition[]) => {
    if (guides.length === 0) return null;
    return (
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>
          {title}
        </h2>
        <div className="grid-3">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
            }}
          >
            <BookOpen size={20} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Tutoriais Visuais
          </h1>
        </div>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
          Guias passo a passo e fluxos operacionais (disponíveis e planejados) para a plataforma Atratora Forge.
        </p>
      </div>

      <div className="divider" style={{ margin: '0' }} />

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {renderSection('GUIAS DISPONÍVEIS', availableGuides)}
        {renderSection('INTERFACES CONCEITUAIS', conceptGuides)}
        {renderSection('FLUXOS PLANEJADOS', plannedGuides)}
      </div>
    </div>
  );
};
