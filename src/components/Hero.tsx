// Hero — headline + intro + countdown card
import type React from 'react';
import { FZ_LINKS, FZ_STATS } from '../data';
import { pad2, type NextRace } from '../hooks';

interface HeroProps {
  countdown: { d: number; h: number; m: number; s: number };
  race: NextRace;
  raceLoading: boolean;
}

export function Hero({ countdown, race, raceLoading }: HeroProps) {
  const { d, h, m, s } = countdown;
  const units: [string, number][] = [
    ['DÍAS', d], ['HRS', h], ['MIN', m], ['SEG', s],
  ];

  return (
    <section style={{ paddingTop: 36, paddingBottom: 48, position: 'relative', overflow: 'hidden' }}>
      {/* Decorative bg accents */}
      <div className="fz-stripe" style={{
        position: 'absolute', right: -120, top: 20,
        width: 320, height: 320, opacity: 0.55, transform: 'rotate(-12deg)',
      }} />
      <div className="fz-checker" style={{
        position: 'absolute', right: 40, top: 40, width: 220, height: 160,
      }} />

      <div className="fz-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="fz-reveal" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
          <span className="fz-mono" style={{
            fontSize: 9, padding: '5px 10px',
            background: 'var(--fz-red)', color: '#fff', letterSpacing: '0.2em',
          }}>● EN VIVO PRONTO</span>
          <span className="fz-mono" style={{
            fontSize: 9, color: 'var(--fz-muted)', letterSpacing: '0.2em',
          }}>TEMPORADA 2026 · ES / LATAM</span>
        </div>

        <h1 className="fz-h1 fz-reveal">
          <span style={{ display: 'block' }}>VELOCIDAD</span>
          <span style={{ display: 'block', color: 'var(--fz-red)' }}>SIN FILTRO.</span>
        </h1>

        <div className="fz-hero-grid">
          <div className="fz-reveal fz-reveal-d2">
            <p className="fz-hero-body" style={{ color: 'rgba(244,241,235,0.85)', maxWidth: 580 }}>
              El canal de Fórmula 1 en español hecho por un fan, para los fans.
              Análisis, reacciones en vivo, podcasts y la comunidad más bestia
              de hispanohablantes hablando del mejor deporte motor del mundo.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 26 }}>
              <a href={FZ_LINKS.youtube} className="fz-btn fz-btn-primary" style={{ justifyContent: 'center' }}>▶ IR AL CANAL</a>
              <a href={FZ_LINKS.discord} className="fz-btn fz-btn-ghost"   style={{ justifyContent: 'center' }}>UNIRSE AL DISCORD</a>
            </div>

            <div className="fz-hero-stats">
              {FZ_STATS.map(([n, l], i) => (
                <div key={l} style={{
                  borderLeft: i === 0 ? '2px solid var(--fz-red)' : '1px solid var(--fz-line)',
                  paddingLeft: 8,
                }}>
                  <div className="fz-display fz-tnum fz-hero-stat-num">{n}</div>
                  <div className="fz-mono" style={{
                    fontSize: 7, color: 'var(--fz-muted)',
                    letterSpacing: '0.22em', marginTop: 4,
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Countdown card */}
          <div className="fz-card fz-reveal fz-reveal-d3" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              background: 'var(--fz-red)', padding: '10px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff',
            }}>
              <span className="fz-mono" style={{ fontSize: 10, letterSpacing: '0.24em' }}>● PRÓXIMO GP</span>
              {!raceLoading && (
                <span className="fz-mono" style={{ fontSize: 10, letterSpacing: '0.18em' }}>
                  {race.flag} {race.countryCode}
                </span>
              )}
            </div>
            <div style={{ padding: '20px 18px' }}>
              {raceLoading ? (
                <RaceCardSkeleton />
              ) : (
                <>
                  <div className="fz-display fz-countdown-city">{race.city}</div>
                  <div className="fz-mono fz-ucase" style={{
                    fontSize: 9, color: 'var(--fz-muted)', marginTop: 6, letterSpacing: '0.22em',
                  }}>{race.circuit}</div>

                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 4, marginTop: 18,
                  }}>
                    {units.map(([lab, val], i) => (
                      <div key={lab} style={{
                        background: 'var(--fz-bg)', padding: '10px 4px',
                        textAlign: 'center', border: '1px solid var(--fz-line)',
                      }}>
                        <div className="fz-display fz-tnum fz-countdown-digit" style={{
                          color: i === 0 ? 'var(--fz-red)' : 'var(--fz-text)',
                        }}>{pad2(val)}</div>
                        <div className="fz-mono" style={{
                          fontSize: 7, color: 'var(--fz-muted)',
                          letterSpacing: '0.22em', marginTop: 4,
                        }}>{lab}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={FZ_LINKS.youtube}
                    className="fz-btn fz-btn-primary"
                    style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
                  >COBERTURA EN EL CANAL</a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SKEL: React.CSSProperties = {
  background: 'var(--fz-surface-2)',
  borderRadius: 2,
  animation: 'fzPulse 1.8s ease-in-out infinite',
};

function RaceCardSkeleton() {
  return (
    <>
      <div style={{ ...SKEL, height: 44, width: '70%', marginBottom: 10 }} />
      <div style={{ ...SKEL, height: 10, width: '90%' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginTop: 18 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ background: 'var(--fz-bg)', padding: '10px 4px', border: '1px solid var(--fz-line)', textAlign: 'center' }}>
            <div style={{ ...SKEL, height: 32, animationDelay: `${i * 0.1}s` }} />
            <div style={{ ...SKEL, height: 7, width: '60%', margin: '4px auto 0', animationDelay: `${i * 0.1}s` }} />
          </div>
        ))}
      </div>
      <div style={{ ...SKEL, height: 44, marginTop: 16 }} />
    </>
  );
}
