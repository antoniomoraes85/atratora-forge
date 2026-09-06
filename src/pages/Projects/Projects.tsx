import React from 'react';
import { FolderGit2, HardDrive, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-fade-in">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Gerenciador de Projetos Locais
          </h1>
          <span className="badge badge-neutral">Em Desenvolvimento (v0.2)</span>
        </div>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Armazenamento persistente no navegador sem envio a servidores remotos.
        </p>
      </div>

      <div
        className="card"
        style={{
          padding: '48px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '720px',
          margin: '20px auto',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-400)',
            marginBottom: '20px',
          }}
        >
          <FolderGit2 size={32} />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>
          Workspace Local em Preparação
        </h3>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            marginTop: '10px',
            lineHeight: 1.6,
            maxWidth: '520px',
          }}
        >
          Na versão <strong>v0.2</strong>, a plataforma permitirá criar, catalogar, exportar e versionar projetos técnicos diretamente no armazenamento IndexedDB do navegador.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '32px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <HardDrive size={18} color="var(--primary-400)" />
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '8px' }}>
              IndexedDB
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
              Projetos gravados na sua máquina sem necessidade de login.
            </p>
          </div>

          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Clock size={18} color="var(--accent-cyan)" />
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '8px' }}>
              Histórico de Casos
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
              Reutilização de mapas, ortofotos e croquis anteriores.
            </p>
          </div>

          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <ShieldCheck size={18} color="var(--success-border)" />
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '8px' }}>
              Zero Upload
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
              Nenhum dado é compartilhado na nuvem.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '36px' }}>
          <Link to="/tools/croqui-converter" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
            Ir para o Conversor .CROQUI
          </Link>
        </div>
      </div>
    </div>
  );
};
