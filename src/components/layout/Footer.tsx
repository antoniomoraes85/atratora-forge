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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-main)',
            letterSpacing: '0.01em',
          }}
        >
          Desenvolvido por José Antônio Coutinho de Moraes Filho • Atratora Labs
        </p>
        <p
          style={{
            fontSize: '11px',
            color: 'var(--text-dim)',
            marginTop: '6px',
            letterSpacing: '0.02em',
          }}
        >
          Ferramenta independente, sem vínculo ou chancela institucional.
        </p>
      </div>
    </footer>
  );
};
