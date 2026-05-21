// F1 Fantasy League — explanation + featured code chip with copy-to-clipboard
import { useState } from 'react';
import { FZ_FANTASY_CODE, FZ_LINKS } from '../data';

const STATS: [string, string][] = [
  ['100 M', 'PRESUPUESTO'],
  ['5 + 2', 'PILOTOS + EQUIPOS'],
  ['24',    'GPs A JUGAR'],
];

export function Fantasy() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText(FZ_FANTASY_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <section id="fantasy" style={{
      paddingTop: 56, paddingBottom: 56, position: 'relative', overflow: 'hidden',
      background: 'var(--fz-surface)',
      borderTop: '1px solid var(--fz-line)',
      borderBottom: '1px solid var(--fz-line)',
    }}>
      <div className="fz-stripe fz-fantasy-stripe" style={{
        position: 'absolute', top: 60,
        width: 520, height: 520, opacity: 0.32, transform: 'rotate(8deg)',
      }} />
      <div className="fz-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="fz-secthead fz-reveal" style={{ marginBottom: 28 }}>
          <span className="fz-secthead-num">03</span>
          <span>F1 FANTASY LEAGUE / EL GRAN DT DE LA F1</span>
          <span className="fz-secthead-rule" />
          <span className="fz-mono" style={{ color: 'var(--fz-muted)' }}>GRATIS</span>
        </div>

        <div className="fz-grid-fantasy">
          <div className="fz-reveal">
            <h2 className="fz-h2">
              ARMÁ TU EQUIPO.<br />
              <span style={{ color: 'var(--fz-red)' }}>SUMATE A LA LIGA.</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, marginTop: 24, color: 'rgba(244,241,235,0.85)', maxWidth: 580 }}>
              Tenés <strong style={{ color: 'var(--fz-text)' }}>100 M</strong> para armar un equipo con
              <strong style={{ color: 'var(--fz-text)' }}> 5 pilotos y 2 constructores</strong>.
              En cada fin de semana de GP sumás puntos por clasificaciones, adelantamientos, podios,
              victorias y vueltas rápidas. Y perdés puntos si chocan, retroceden o son penalizados por la FIA.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 20, color: 'rgba(244,241,235,0.7)', maxWidth: 580 }}>
              Es <strong>completamente gratis</strong>. No hay apuestas. Las ligas oficiales suelen dar
              premios increíbles — la liga oficial de McLaren 2026, por ejemplo, regala un viaje pago
              a la fábrica en Inglaterra para el ganador.
            </p>

            <div className="fz-fantasy-btns">
              <a href={FZ_LINKS.fantasy} className="fz-btn fz-btn-primary fz-btn-lg">CREAR MI EQUIPO →</a>
              <a href={FZ_LINKS.youtube} className="fz-btn fz-btn-ghost fz-btn-lg">VER TUTORIAL</a>
            </div>
          </div>

          <div className="fz-reveal fz-reveal-d2">
            <div style={{ background: 'var(--fz-bg)', border: '1px solid var(--fz-line)', padding: 40, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'var(--fz-red)' }} />
              <div className="fz-mono" style={{
                fontSize: 10, color: 'var(--fz-red)',
                letterSpacing: '0.32em', marginTop: 8,
              }}>● LIGA OFICIAL DE FORMULA ZETA</div>
              <div className="fz-display" style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 0.92, marginTop: 18 }}>
                SUMATE CON<br />EL CÓDIGO:
              </div>

              <div style={{ marginTop: 32, position: 'relative' }}>
                <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 18px', background: 'var(--fz-bg)',
                border: '2px dashed var(--fz-red)',
                letterSpacing: '0.12em', color: 'var(--fz-text)', position: 'relative',
                justifyContent: 'space-between', width: '100%', boxSizing: 'border-box',
              }}>
                  <span style={{
                    position: 'absolute', top: -10, left: 18,
                    background: 'var(--fz-bg)', padding: '2px 8px',
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                    color: 'var(--fz-red)', letterSpacing: '0.22em',
                  }}>CÓDIGO</span>
                  <span className="fz-mono fz-fantasy-code-value">{FZ_FANTASY_CODE}</span>
                  <button
                    onClick={copyCode}
                    className="fz-mono"
                    style={{
                      marginLeft: 8, padding: '8px 12px',
                      background: 'var(--fz-red)', color: '#fff',
                      fontSize: 11, letterSpacing: '0.18em', cursor: 'pointer',
                    }}
                  >{copied ? '✓ COPIADO' : 'COPIAR'}</button>
                </div>
              </div>

              <div
                className="fz-fantasy-stats"
                style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--fz-line)' }}
              >
                {STATS.map(([n, l]) => (
                  <div key={l}>
                    <div className="fz-display fz-tnum fz-fantasy-stat-num">{n}</div>
                    <div className="fz-mono" style={{
                      fontSize: 9, color: 'var(--fz-muted)',
                      letterSpacing: '0.22em', marginTop: 4,
                    }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
