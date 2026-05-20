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
    <section style={{ paddingTop: 60, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Decorative bg accents */}
      <div className="fz-stripe" style={{
        position: 'absolute', right: -200, top: 40,
        width: 700, height: 700, opacity: 0.6, transform: 'rotate(-12deg)',
      }} />
      <div className="fz-checker" style={{
        position: 'absolute', right: 100, top: 60, width: 480, height: 320,
      }} />

      <div className="fz-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="fz-reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
          <span className="fz-mono" style={{
            fontSize: 11, padding: '6px 12px',
            background: 'var(--fz-red)', color: '#fff', letterSpacing: '0.22em',
          }}>● EN VIVO PRONTO</span>
          <span className="fz-mono" style={{
            fontSize: 11, color: 'var(--fz-muted)', letterSpacing: '0.22em',
          }}>TEMPORADA 2026 · ES / LATAM</span>
        </div>

        <h1 className="fz-h1 fz-reveal">
          <span style={{ display: 'block' }}>VELOCIDAD</span>
          <span style={{ display: 'block', color: 'var(--fz-red)' }}>SIN FILTRO.</span>
        </h1>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 480px',
          gap: 80, marginTop: 64, alignItems: 'start',
        }}>
          <div className="fz-reveal fz-reveal-d2">
            <p style={{
              fontSize: 22, lineHeight: 1.45,
              color: 'rgba(244,241,235,0.85)', maxWidth: 580,
            }}>
              El canal de Fórmula 1 en español hecho por un fan, para los fans.
              Análisis, reacciones en vivo, podcasts y la comunidad más bestia
              de hispanohablantes hablando del mejor deporte motor del mundo.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <a href={FZ_LINKS.youtube} className="fz-btn fz-btn-primary fz-btn-lg">▶ IR AL CANAL</a>
              <a href={FZ_LINKS.discord} className="fz-btn fz-btn-ghost fz-btn-lg">UNIRSE AL DISCORD</a>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16, marginTop: 72,
            }}>
              {FZ_STATS.map(([n, l], i) => (
                <div key={l} style={{
                  borderLeft: i === 0 ? '2px solid var(--fz-red)' : '1px solid var(--fz-line)',
                  paddingLeft: 14,
                }}>
                  <div className="fz-display fz-tnum" style={{ fontSize: 44 }}>{n}</div>
                  <div className="fz-mono" style={{
                    fontSize: 10, color: 'var(--fz-muted)',
                    letterSpacing: '0.22em', marginTop: 6,
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Countdown card */}
          <div className="fz-card fz-reveal fz-reveal-d3" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              background: 'var(--fz-red)', padding: '14px 22px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff',
            }}>
              <span className="fz-mono" style={{ fontSize: 11, letterSpacing: '0.24em' }}>● PRÓXIMO GP</span>
              {!raceLoading && (
                <span className="fz-mono" style={{ fontSize: 11, letterSpacing: '0.18em' }}>
                  {race.flag} {race.countryCode}
                </span>
              )}
            </div>
            <div style={{ padding: '28px 26px' }}>
              {raceLoading ? (
                <RaceCardSkeleton />
              ) : (
                <>
                  <div className="fz-display" style={{ fontSize: 64, lineHeight: 0.9 }}>{race.city}</div>
                  <div className="fz-mono fz-ucase" style={{
                    fontSize: 11, color: 'var(--fz-muted)', marginTop: 8, letterSpacing: '0.22em',
                  }}>{race.circuit}</div>

                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 4, marginTop: 28,
                  }}>
                    {units.map(([lab, val], i) => (
                      <div key={lab} style={{
                        background: 'var(--fz-bg)', padding: '14px 8px',
                        textAlign: 'center', border: '1px solid var(--fz-line)',
                      }}>
                        <div className="fz-display fz-tnum" style={{
                          fontSize: 48,
                          color: i === 0 ? 'var(--fz-red)' : 'var(--fz-text)',
                        }}>{pad2(val)}</div>
                        <div className="fz-mono" style={{
                          fontSize: 9, color: 'var(--fz-muted)',
                          letterSpacing: '0.22em', marginTop: 4,
                        }}>{lab}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={FZ_LINKS.youtube}
                    className="fz-btn fz-btn-primary"
                    style={{
                      marginTop: 24, width: '100%', justifyContent: 'center',
                      padding: '14px 16px', fontSize: 11,
                    }}
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
      <div style={{ ...SKEL, height: 56, width: '70%', marginBottom: 10 }} />
      <div style={{ ...SKEL, height: 12, width: '90%' }} />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 4, marginTop: 28,
      }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            background: 'var(--fz-bg)', padding: '14px 8px',
            border: '1px solid var(--fz-line)', textAlign: 'center',
          }}>
            <div style={{ ...SKEL, height: 48, animationDelay: `${i * 0.1}s` }} />
            <div style={{ ...SKEL, height: 9, width: '60%', margin: '6px auto 0', animationDelay: `${i * 0.1}s` }} />
          </div>
        ))}
      </div>
      <div style={{ ...SKEL, height: 44, marginTop: 24 }} />
    </>
  );
}
