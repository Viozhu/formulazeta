// Discord community section
import { FZ_DISCORD_CHANNELS, FZ_LINKS } from '../data';

export function Discord() {
  return (
    <section id="discord" style={{
      paddingTop: 56, paddingBottom: 56,
      background: 'var(--fz-surface)',
      borderTop: '1px solid var(--fz-line)',
      borderBottom: '1px solid var(--fz-line)',
    }}>
      <div className="fz-container">
        <div className="fz-secthead fz-reveal" style={{ marginBottom: 28 }}>
          <span className="fz-secthead-num">05</span>
          <span>COMUNIDAD DE DISCORD / SERVIDOR OFICIAL</span>
          <span className="fz-secthead-rule" />
          <span className="fz-mono" style={{ color: 'var(--fz-muted)' }}>8.4K MIEMBROS</span>
        </div>

        <div className="fz-grid-discord">
          <div className="fz-reveal">
            <h2 className="fz-h2">
              ¿VISTE UN<br />
              <span className="fz-stroke">MEME BUENO?</span>
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.5, marginTop: 28, maxWidth: 580, color: 'rgba(244,241,235,0.85)' }}>
              ¿Armaste un compilado de adelantos de Colapinto? ¿Querés pasarme un reel
              que viste sobre Ferrari? Hacelo en el servidor de Discord oficial.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 16, maxWidth: 580, color: 'rgba(244,241,235,0.7)' }}>
              Charlá con la comunidad, recibí alertas del F1 Fantasy y sugerí ideas
              para los próximos videos.
            </p>

            <div style={{ marginTop: 36 }}>
              <a
                href={FZ_LINKS.discord}
                className="fz-btn fz-btn-lg fz-discord-cta"
                style={{ background: '#5865F2', color: '#fff' }}
              >UNIRME AL SERVIDOR →</a>
            </div>
          </div>

          <div className="fz-card fz-reveal fz-reveal-d2" style={{ padding: 36, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#5865F2' }} />
            <div className="fz-mono" style={{
              fontSize: 10, color: '#5865F2',
              letterSpacing: '0.32em', marginTop: 6,
            }}>● DISCORD.GG/QBNGBWZQK</div>
            <div className="fz-display" style={{ fontSize: 'clamp(36px, 7vw, 64px)', marginTop: 12, lineHeight: 0.9 }}>
              FORMULA<br />ZETA
            </div>

            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {FZ_DISCORD_CHANNELS.map(([ch, desc]) => (
                <div
                  key={ch}
                  style={{
                    display: 'flex', gap: 14, alignItems: 'baseline',
                    paddingBottom: 12, borderBottom: '1px solid var(--fz-line)',
                  }}
                >
                  <span className="fz-mono" style={{ fontSize: 14, color: '#5865F2', whiteSpace: 'nowrap' }}>{ch}</span>
                  <span style={{ fontSize: 13, color: 'var(--fz-muted)' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
