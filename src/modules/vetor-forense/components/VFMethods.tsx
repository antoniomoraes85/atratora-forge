import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export const VFMethods: React.FC = () => {
  const methods = [
    {
      id: 'friction',
      name: 'Dissipação por atrito',
      category: 'quantitativo',
      independent: true,
      description: 'Estimativa de velocidade inicial pela dissipação de energia cinética em vestígios de frenagem, derrapagem, arrastamento, trilha ou fricção.',
      formula: 'v = √(2 × g × µ × d) — trecho único\nv = √(2 × Σ(µ_eff_i × g × d_i)) — múltiplos trechos',
      requires: ['Distância do vestígio (m)', 'Coeficiente de atrito (µ)', 'Inclinação (opcional)'],
      limitations: ['Assume desaceleração uniforme no trecho', 'Sensível à qualidade do parâmetro µ', 'Velocidade calculada é a do início do vestígio analisado'],
      source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    },
    {
      id: 'moto-tombada',
      name: 'Deslizamento — Motocicleta tombada',
      category: 'quantitativo',
      independent: true,
      description: 'Estimativa de velocidade pelo deslizamento da motocicleta tombada com contato chassi/motor na superfície.',
      formula: 'v = √(2 × µ_tombada × g × d)',
      requires: ['Distância de deslizamento (m)', 'Superfície e condição'],
      limitations: ['Parâmetro µ com variação maior que frenagem convencional', 'Influência de obstáculos e danos na trajetória'],
      source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    },
    {
      id: 'sobre-teto',
      name: 'Deslizamento — Veículo sobre teto',
      category: 'quantitativo',
      independent: true,
      description: 'Estimativa de velocidade pelo deslizamento do veículo invertido sobre o teto.',
      formula: 'v = √(2 × µ_teto × g × d)',
      requires: ['Distância de deslizamento (m)', 'Superfície e condição'],
      limitations: ['Parâmetro µ varia com danos ao teto', 'Pode ocorrer rotação'],
      source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    },
    {
      id: 'stopping-distance',
      name: 'Distância disponível para parada',
      category: 'auxiliar',
      independent: false,
      description: 'Analisa se a velocidade estimada é compatível com a distância disponível para parada antes do ponto crítico.',
      formula: 'd = v × t_r + v² / (2 × g × µ)',
      requires: ['Velocidade estimada (km/h)', 'Distância disponível (m)', 'Tempo de reação (s)', 'µ'],
      limitations: ['Indicador auxiliar — não estima velocidade diretamente'],
      source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    },
    {
      id: 'damages',
      name: 'Danos',
      category: 'auxiliar',
      independent: false,
      description: 'Avaliação qualitativa da compatibilidade dos danos com a faixa de velocidade estimada.',
      formula: 'Classificação qualitativa (leve / média / grave / gravíssima)',
      requires: ['Registro fotográfico dos danos', 'Classificação pericial'],
      limitations: ['NUNCA usar isoladamente como velocidade final', 'Alta variabilidade entre veículos e configurações de impacto'],
      source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    },
    {
      id: 'electronic',
      name: 'Registro eletrônico (EDR / Tacógrafo / GPS)',
      category: 'quantitativo',
      independent: true,
      description: 'Velocidade registrada por dispositivo eletrônico instalado no veículo no momento relevante.',
      formula: 'Leitura direta do dispositivo',
      requires: ['Registro íntegro', 'Identificação do momento em relação ao impacto'],
      limitations: ['Dependente da integridade e calibração do dispositivo', 'Necessita laudo de leitura quando disponível'],
      source: 'M_015 — Manual de Atendimento e Perícia de Acidentes de Trânsito',
    },
    {
      id: 'momentum',
      name: 'Quantidade de movimento',
      category: 'quantitativo',
      independent: true,
      description: 'Análise da dinâmica de colisão usando conservação do momentum linear. Módulo avançado — não implementado nesta versão.',
      formula: 'm₁v₁ + m₂v₂ = (m₁+m₂)v_final (colisão inelástica)',
      requires: ['Não disponível nesta versão'],
      limitations: ['Preencher dados adicionais não habilita este método nesta versão'],
      source: 'Dinâmica clássica newtoniana',
    },
  ];

  const categoryStyle = (cat: string, ind: boolean) => {
    if (cat === 'auxiliar') return { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', color: '#fbbf24' };
    if (ind) return { bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.3)', color: '#38bdf8' };
    return { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', color: 'var(--primary-400)' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Métodos disponíveis</h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '640px' }}>
          Documentação dos métodos implementados no Vetor Forense. Cada método indica os dados necessários, a fórmula utilizada e as limitações técnicas.
        </p>
      </div>

      {/* Legenda */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {[
          { label: 'Quantitativo independente', color: '#38bdf8' },
          { label: 'Auxiliar / qualitativo', color: '#fbbf24' },
          { label: 'Não disponível nesta versão', color: 'var(--text-dim)' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      {methods.map(m => {
        const cs = categoryStyle(m.category, m.independent);
        const isNotImplemented = m.id === 'momentum';
        return (
          <div
            key={m.id}
            style={{
              padding: '24px', borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
              opacity: isNotImplemented ? 0.55 : 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  {isNotImplemented
                    ? <XCircle size={18} color="var(--text-dim)" />
                    : m.category === 'auxiliar'
                    ? <AlertTriangle size={18} color="#fbbf24" />
                    : <CheckCircle size={18} color="#38bdf8" />
                  }
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</h3>
                  <span style={{
                    fontSize: '11px', fontWeight: 600, padding: '2px 8px',
                    background: cs.bg, border: `1px solid ${cs.border}`,
                    borderRadius: 'var(--radius-full)', color: cs.color,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>
                    {m.category === 'auxiliar' ? 'Auxiliar' : m.independent ? 'Independente' : 'Dependente'}
                  </span>
                  {isNotImplemented && (
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                      Não implementado nesta versão
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{m.description}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Fórmula</div>
                <code style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-line', display: 'block', lineHeight: 1.6 }}>
                  {m.formula}
                </code>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Dados necessários</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {m.requires.map(r => (
                    <li key={r} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#38bdf8', flexShrink: 0 }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Limitações</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {m.limitations.map(l => (
                    <li key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fbbf24', flexShrink: 0, marginTop: '5px' }} />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-dim)' }}>
              <Info size={12} />
              <span>Fonte técnica: {m.source}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
