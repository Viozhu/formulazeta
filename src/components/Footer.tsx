// Footer — brand + socials + columns
import { FZ_LINKS } from '../data';

const SOCIALS: [string, string][] = [
  ['YT', FZ_LINKS.youtube],
  ['KI', FZ_LINKS.kick],
  ['DC', FZ_LINKS.discord],
  ['IG', FZ_LINKS.instagram],
  ['TW', FZ_LINKS.twitter],
  ['TT', FZ_LINKS.tiktok],
];

const COLUMNS: [string, [string, string][]][] = [
  ['CONTENIDO', [
    ['VIDEOS', FZ_LINKS.youtube],
    ['STREAMS EN KICK', FZ_LINKS.kick],
    ['F1 FANTASY', FZ_LINKS.fantasy],
  ]],
  ['COMUNIDAD', [
    ['DISCORD', FZ_LINKS.discord],
    ['INSTAGRAM @formulazeta.ok', FZ_LINKS.instagram],
    ['TIKTOK /formulazeta', FZ_LINKS.tiktok],
    ['TWITTER @zetazalazar', FZ_LINKS.twitter],
  ]],
  ['CANAL', [
    ['SER SOCIO', FZ_LINKS.youtubeJoin],
    ['CONTACTO', `mailto:${FZ_LINKS.email}`],
  ]],
];

export function Footer() {
  return (
    <footer style={{ background: 'var(--fz-surface)', borderTop: '1px solid var(--fz-line)' }}>
      <div className="fz-container" style={{ paddingTop: 36, paddingBottom: 24 }}>
        <div className="fz-footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="/logo.png" alt="" style={{ width: 30, height: 30 }} />
              <span className="fz-display" style={{ fontSize: 22, letterSpacing: '0.03em' }}>
                FORMULA ZETA
              </span>
            </div>
            <p style={{
              marginTop: 18, fontSize: 14, lineHeight: 1.55,
              color: 'var(--fz-muted)', maxWidth: 420,
            }}>
              Comunidad independiente de fans hispanohablantes de Fórmula 1.
              No afiliada con Formula One Group ni la FIA.
            </p>
            <div style={{ marginTop: 22, display: 'flex', gap: 8 }}>
              {SOCIALS.map(([s, href]) => (
                <a
                  key={s}
                  href={href}
                  className="fz-mono"
                  style={{
                    width: 36, height: 36,
                    border: '1px solid var(--fz-line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, letterSpacing: '0.05em',
                    transition: 'background .15s, border-color .15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--fz-red)';
                    e.currentTarget.style.borderColor = 'var(--fz-red)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >{s}</a>
              ))}
            </div>
          </div>

          {COLUMNS.map(([title, items]) => (
            <div key={title}>
              <div className="fz-mono fz-ucase" style={{
                fontSize: 11, color: 'var(--fz-text)',
                marginBottom: 18, letterSpacing: '0.22em',
              }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="fz-mono"
                    style={{
                      fontSize: 12, color: 'var(--fz-muted)',
                      letterSpacing: '0.05em', transition: 'color .15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fz-text)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                  >{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="fz-footer-bottom fz-mono fz-ucase"
          style={{
            borderTop: '1px solid var(--fz-line)', paddingTop: 24,
            fontSize: 11, color: 'var(--fz-muted)',
          }}
        >
          <span>© 2026 FORMULA ZETA · HECHO POR FANS, PARA FANS</span>
        </div>
      </div>
    </footer>
  );
}
