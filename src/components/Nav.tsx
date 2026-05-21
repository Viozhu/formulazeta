// Sticky top navigation — responsive with mobile hamburger overlay
import { useState, useEffect } from 'react';
import { FZ_LINKS } from '../data';

const NAV_ITEMS: [string, string][] = [
  ['HOME',    '#'],
  ['VIDEOS',  '#videos'],
  ['EN VIVO', '#en-vivo'],
  ['FANTASY', '#fantasy'],
  ['SOCIOS',  '#socios'],
  ['DISCORD', FZ_LINKS.discord],
];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close overlay on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(10,9,8,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--fz-line)',
      }}>
        {/* ── Main bar ── */}
        <div className="fz-container fz-nav-bar" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {/* Logo */}
          <a href={FZ_LINKS.youtube} style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <img src="/logo.png" alt="Formula Zeta" style={{ width: 38, height: 38 }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span className="fz-display" style={{ fontSize: 'clamp(18px, 3vw, 28px)', letterSpacing: '0.03em' }}>FORMULA ZETA</span>
              <span className="fz-mono" style={{ fontSize: 9, color: 'var(--fz-muted)', letterSpacing: '0.24em', marginTop: 3 }}>
                COMUNIDAD F1 / EST. 2019
              </span>
            </div>
          </a>

          {/* Desktop nav links */}
          <nav className="fz-nav-desktop-items">
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

          {/* Desktop CTA */}
          <a
            href={FZ_LINKS.youtubeJoin}
            className="fz-btn fz-btn-primary fz-nav-desktop-cta"
            style={{ padding: '12px 18px', fontSize: 11, flexShrink: 0, marginLeft: 'auto' }}
          >
            SER SOCIO
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="fz-nav-hamburger"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            style={{
              marginLeft: 'auto',
              background: open ? 'var(--fz-red)' : 'transparent',
              borderColor: open ? 'var(--fz-red)' : undefined,
            }}
          >
            <span style={{ transform: open ? 'rotate(45deg) translate(0, 6.5px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(0, -6.5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* ── Mobile fullscreen overlay ── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(10,9,8,0.96)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex', flexDirection: 'column',
            padding: '80px 28px 40px',
            gap: 0,
            overflowY: 'auto',
          }}>
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Cerrar menú"
            className="fz-mono"
            style={{
              position: 'absolute', top: 18, right: 20,
              width: 40, height: 40,
              border: '1px solid var(--fz-line-2)',
              color: 'var(--fz-text)', fontSize: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent',
            }}
          >✕</button>

          {/* Nav items */}
          {NAV_ITEMS.map(([label, href], i) => (
            <a
              key={label}
              href={href}
              onClick={close}
              className="fz-display"
              style={{
                fontSize: 56, padding: '8px 0',
                borderBottom: '1px solid var(--fz-line)',
                color: i === 0 ? 'var(--fz-red)' : 'var(--fz-text)',
                lineHeight: 0.9,
              }}
            >
              {label}
            </a>
          ))}

          {/* CTA */}
          <a
            href={FZ_LINKS.youtubeJoin}
            onClick={close}
            className="fz-btn fz-btn-primary"
            style={{ marginTop: 24, justifyContent: 'center', width: '100%' }}
          >
            SER SOCIO →
          </a>
        </div>
      )}
    </>
  );
}
