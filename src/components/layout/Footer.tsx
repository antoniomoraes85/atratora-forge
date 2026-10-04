import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '24px 32px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--text-main)',
            letterSpacing: '0.01em',
          }}
        >
          Desenvolvido por José Antônio Coutinho de Moraes Filho
        </p>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.02em',
          }}
        >
          Atratora Labs • Atratora Forge
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '6px' }}>
           <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Versão 0.3.0</span>
           <span style={{ fontSize: '11px', color: 'var(--border-default)' }}>|</span>
           <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Processamento local</span>
        </div>
      </div>
    </footer>
  );
};
