// Sticky top navigation
import { FZ_LINKS } from '../data';

const NAV_ITEMS: [string, string][] = [
  ['HOME',     '#'],
  ['VIDEOS',   '#videos'],
  ['EN VIVO',  '#en-vivo'],
  ['FANTASY',  '#fantasy'],
  ['SOCIOS',   '#socios'],
  ['DISCORD',  FZ_LINKS.discord],
];

export function Nav() {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'rgba(10,9,8,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--fz-line)',
    }}>
      <div className="fz-container" style={{ display: 'flex', alignItems: 'center', height: 78, gap: 28 }}>
        <a href={FZ_LINKS.youtube} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="/logo.png" alt="Formula Zeta" style={{ width: 38, height: 38 }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span className="fz-display" style={{ fontSize: 28, letterSpacing: '0.03em' }}>FORMULA ZETA</span>
            <span className="fz-mono" style={{ fontSize: 9, color: 'var(--fz-muted)', letterSpacing: '0.24em', marginTop: 3 }}>
              COMUNIDAD F1 / EST. 2019
            </span>
          </div>
        </a>

        <nav style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          {NAV_ITEMS.map(([label, href], i) => (
            <a
              key={label}
              href={href}
              className="fz-mono fz-ucase"
              style={{
                fontSize: 11, padding: '8px 14px',
                background: i === 0 ? 'var(--fz-surface-2)' : 'transparent',
                border: i === 0 ? '1px solid var(--fz-line)' : '1px solid transparent',
                transition: 'background .15s, border-color .15s',
              }}
              onMouseEnter={(e) => { if (i !== 0) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={(e) => { if (i !== 0) e.currentTarget.style.background = 'transparent'; }}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={FZ_LINKS.youtubeJoin}
          className="fz-btn fz-btn-primary"
          style={{ padding: '12px 18px', fontSize: 11 }}
        >
          SER SOCIO
        </a>
      </div>
    </div>
  );
}
