# Mobile-First Responsive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor Formula Zeta's CSS from desktop-first (max-width queries) to mobile-first (min-width queries) and patch components to achieve pixel-faithful 390px mobile layout per `design_handoff_mobile/README.md`.

**Architecture:** Default CSS = mobile styles (390px); `@media (min-width: 768px)` = tablet; `@media (min-width: 1024px)` = desktop. New utility classes in `index.css` handle all size overrides; components reference those classes. Nav gets a fixed fullscreen overlay replacing the current dropdown.

**Tech Stack:** React 18, TypeScript, Vite, plain CSS (no Tailwind), pnpm

---

## File Map

| File | Change |
|------|--------|
| `src/index.css` | Full restructure — invert to mobile-first, add utility classes |
| `src/components/Nav.tsx` | Fullscreen overlay menu + scroll lock + nav height class |
| `src/components/Ticker.tsx` | Add CSS classes, remove inline sizing |
| `src/components/Hero.tsx` | Add CSS classes for countdown/stats sizing |
| `src/components/Videos.tsx` | Thumb heights, VideoCardLarge reflow, CTA button |
| `src/components/Streams.tsx` | Add `fz-stream-hero` class |
| `src/components/Fantasy.tsx` | Add code-chip and stats size classes |
| `src/components/Members.tsx` | Add perk number and card padding classes |
| `src/components/CTA.tsx` | Add button wrapper class |
| `src/components/Discord.tsx` | Add CTA width class |
| `src/components/Footer.tsx` | Minor class additions |

---

## Task 1: Restructure `src/index.css` — mobile-first

**Files:**
- Modify: `src/index.css`

This is the largest single change. We invert the cascade: mobile values become defaults, desktop values go inside `@media (min-width: 1024px)`. The two existing `max-width` blocks are deleted and their values promoted or absorbed.

- [ ] **Step 1.1: Open `src/index.css` and replace the entire file with the mobile-first version below**

```css
/* Formula Zeta — base styles + design tokens */

:root {
  --fz-bg:        #0a0908;
  --fz-surface:   #131110;
  --fz-surface-2: #1c1916;

  --fz-line:   rgba(255, 255, 255, 0.08);
  --fz-line-2: rgba(255, 255, 255, 0.14);

  --fz-text:    #f4f1eb;
  --fz-muted:   #8a847a;
  --fz-muted-2: #5a544c;

  --fz-red:   #d9382c;
  --fz-red-2: #ff5247;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--fz-bg);
  color: var(--fz-text);
  font-family: 'Space Grotesk', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
img { display: block; max-width: 100%; }

.fz-root, .fz-root * { box-sizing: border-box; }

/* Type helpers */
.fz-display { font-family: 'Bebas Neue', 'Archivo Black', sans-serif; font-weight: 400; letter-spacing: 0.005em; line-height: 0.88; }
.fz-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.fz-ucase   { text-transform: uppercase; letter-spacing: 0.16em; }
.fz-tnum    { font-variant-numeric: tabular-nums; }

/* Layout — mobile default: 20px padding */
.fz-container { max-width: 1320px; margin: 0 auto; padding: 0 20px; }

/* Section head — mobile default */
.fz-secthead {
  display: flex; align-items: center; gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; text-transform: uppercase; letter-spacing: 0.18em;
}
.fz-secthead-num {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  background: var(--fz-red); color: #fff; font-weight: 600; font-size: 10px;
}
.fz-secthead-rule { flex: 1; height: 1px; background: var(--fz-line-2); }

/* Type scale — mobile defaults */
.fz-h1 { font-family: 'Bebas Neue', sans-serif; font-size: 96px;  line-height: 0.84; letter-spacing: 0; }
.fz-h2 { font-family: 'Bebas Neue', sans-serif; font-size: 64px;  line-height: 0.88; }
.fz-h3 { font-family: 'Bebas Neue', sans-serif; font-size: 40px;  line-height: 0.92; }
.fz-h4 { font-family: 'Bebas Neue', sans-serif; font-size: 28px;  line-height: 1; }

/* Buttons */
.fz-btn {
  display: inline-flex; align-items: center; gap: 14px;
  padding: 18px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; text-transform: uppercase; letter-spacing: 0.22em;
  background: var(--fz-text); color: var(--fz-bg);
  transition: transform .15s, box-shadow .15s;
}
.fz-btn:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--fz-red); }
.fz-btn-primary { background: var(--fz-red); color: #fff; }
.fz-btn-primary:hover { box-shadow: 4px 4px 0 var(--fz-text); }
.fz-btn-ghost { background: transparent; color: var(--fz-text); border: 1px solid var(--fz-line-2); }
.fz-btn-ghost:hover { background: var(--fz-text); color: var(--fz-bg); box-shadow: 4px 4px 0 var(--fz-red); }
.fz-btn-lg { padding: 22px 32px; font-size: 14px; }

/* Cards */
.fz-card { background: var(--fz-surface); border: 1px solid var(--fz-line); transition: border-color .25s, transform .25s; }
.fz-card-hover:hover { border-color: var(--fz-red); }

/* Decorative patterns */
.fz-checker {
  background-image:
    linear-gradient(45deg, rgba(255, 255, 255, 0.06) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255, 255, 255, 0.06) 25%, transparent 25%);
  background-size: 14px 14px;
}
.fz-stripe { background: repeating-linear-gradient(-78deg, var(--fz-red) 0 12px, transparent 12px 24px); }

/* Tag pill */
.fz-tag {
  display: inline-block; padding: 5px 10px;
  background: var(--fz-bg); color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
}
.fz-tag-primary { background: var(--fz-red); }

/* Stencil stroke */
.fz-stroke { -webkit-text-stroke: 1.5px var(--fz-text); color: transparent; }

/* Reveal on scroll */
.fz-reveal { opacity: 0; transform: translateY(24px); transition: opacity .9s cubic-bezier(.2,.7,.3,1), transform .9s cubic-bezier(.2,.7,.3,1); }
.fz-reveal.fz-in { opacity: 1; transform: none; }
.fz-reveal-d1 { transition-delay: .08s; }
.fz-reveal-d2 { transition-delay: .16s; }
.fz-reveal-d3 { transition-delay: .24s; }
.fz-reveal-d4 { transition-delay: .32s; }

/* Marquee */
@keyframes fzTick  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes fzPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.4); } }

/* ====================================================================
   TICKER — mobile default
   ==================================================================== */
.fz-ticker       { height: 30px; }
.fz-ticker-track { font-size: 10px; animation: fzTick 40s linear infinite; }

/* ====================================================================
   NAV — mobile default
   ==================================================================== */
.fz-nav-bar          { height: 60px; }
.fz-nav-hamburger    { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; width: 44px; height: 44px; flex-shrink: 0; cursor: pointer; border: 1px solid var(--fz-line); padding: 0; }
.fz-nav-hamburger span { display: block; width: 20px; height: 1.5px; background: var(--fz-text); transition: transform .2s, opacity .2s; }
.fz-nav-desktop-items { display: none; }
.fz-nav-desktop-cta  { display: none; }

/* ====================================================================
   HERO — mobile defaults
   ==================================================================== */
.fz-hero-grid  { display: grid; grid-template-columns: 1fr; gap: 36px; margin-top: 32px; align-items: start; }
.fz-hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 36px; }
.fz-hero-body      { font-size: 16px; line-height: 1.45; }
.fz-hero-stat-num  { font-size: 26px; }
.fz-countdown-city  { font-size: 44px; line-height: 0.9; }
.fz-countdown-digit { font-size: 32px; }

/* ====================================================================
   VIDEOS — mobile defaults
   ==================================================================== */
.fz-videos-lg       { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 16px; }
.fz-videos-sm       { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.fz-video-thumb-lg  { height: 200px; }
.fz-video-thumb-sm  { height: 100px; }
.fz-video-title-lg  { font-size: 24px; line-height: 1; }
.fz-video-title-sm  { font-size: 16px; line-height: 1; }
.fz-video-lg-meta   { display: flex; flex-direction: column; gap: 8px; padding: 14px 2px 2px; }
.fz-videos-cta      { display: block; margin-top: 24px; padding: 14px; border: 1px solid var(--fz-line-2); font-family: 'JetBrains Mono', monospace; font-size: 11px; text-align: center; letter-spacing: 0.2em; text-transform: uppercase; }

/* ====================================================================
   STREAMS — mobile defaults
   ==================================================================== */
.fz-grid-2          { display: grid; grid-template-columns: 1fr; gap: 16px; }
.fz-streams-header  { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 36px; }
.fz-stream-hero     { height: 140px; }

/* ====================================================================
   FANTASY — mobile defaults
   ==================================================================== */
.fz-grid-fantasy       { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: start; }
.fz-fantasy-code-value { font-size: 22px; letter-spacing: 0.1em; }
.fz-fantasy-stats      { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.fz-fantasy-stat-num   { font-size: 26px; }

/* ====================================================================
   MEMBERS — mobile defaults
   ==================================================================== */
.fz-grid-3          { display: grid; grid-template-columns: 1fr; gap: 16px; }
.fz-members-header  { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 28px; }
.fz-members-cta     { display: flex; flex-direction: column; align-items: stretch; gap: 24px; }
.fz-members-cta .fz-btn { width: 100%; justify-content: center; }
.fz-perk-number     { font-family: 'Bebas Neue', sans-serif; font-size: 60px; line-height: 0.85; color: var(--fz-red); }
.fz-perk-card       { padding: 24px 22px; }

/* ====================================================================
   DISCORD — mobile defaults
   ==================================================================== */
.fz-grid-discord    { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: start; }
.fz-discord-cta     { width: 100%; justify-content: center; }

/* ====================================================================
   CTA — mobile defaults
   ==================================================================== */
.fz-cta-btns { display: flex; flex-direction: column; gap: 10px; margin-top: 28px; }
.fz-cta-btns .fz-btn { width: 100%; justify-content: center; }

/* ====================================================================
   FOOTER — mobile defaults
   ==================================================================== */
.fz-footer-grid   { display: grid; grid-template-columns: 1fr; gap: 28px; margin-bottom: 40px; }
.fz-footer-bottom { display: flex; flex-direction: column; gap: 8px; }

/* ====================================================================
   TABLET  min-width: 768px
   ==================================================================== */
@media (min-width: 768px) {
  .fz-container { padding: 0 32px; }

  .fz-videos-lg     { grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
  .fz-video-thumb-lg { height: 280px; }

  .fz-grid-3        { grid-template-columns: repeat(2, 1fr); gap: 18px; }
  .fz-footer-grid   { grid-template-columns: 1fr 1fr; gap: 32px; }

  .fz-hero-grid     { gap: 48px; margin-top: 48px; }
}

/* ====================================================================
   DESKTOP  min-width: 1024px
   ==================================================================== */
@media (min-width: 1024px) {
  .fz-container { padding: 0 48px; }

  /* Section head */
  .fz-secthead     { font-size: 12px; letter-spacing: 0.22em; gap: 18px; }
  .fz-secthead-num { width: 36px; height: 36px; font-size: inherit; }

  /* Type scale */
  .fz-h1 { font-size: clamp(52px, 14vw, 240px); }
  .fz-h2 { font-size: clamp(38px,  8vw, 132px); }
  .fz-h3 { font-size: clamp(30px,  5vw,  72px); }
  .fz-h4 { font-size: clamp(26px,  4vw,  40px); }

  /* Ticker */
  .fz-ticker       { height: 36px; }
  .fz-ticker-track { font-size: 12px; animation-duration: 50s; }

  /* Nav */
  .fz-nav-bar          { height: 78px; }
  .fz-nav-hamburger    { display: none; }
  .fz-nav-desktop-items { display: flex; gap: 6px; margin-left: auto; }
  .fz-nav-desktop-cta  { display: inline-flex; }

  /* Hero */
  .fz-hero-grid  { grid-template-columns: 1fr 480px; gap: 80px; margin-top: 64px; }
  .fz-hero-stats { grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 72px; }
  .fz-hero-body      { font-size: 22px; }
  .fz-hero-stat-num  { font-size: 44px; }
  .fz-countdown-city  { font-size: 64px; }
  .fz-countdown-digit { font-size: 48px; }

  /* Videos */
  .fz-videos-lg       { grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
  .fz-videos-sm       { grid-template-columns: repeat(4, 1fr); gap: 18px; }
  .fz-video-thumb-lg  { height: 360px; }
  .fz-video-thumb-sm  { height: 170px; }
  .fz-video-title-lg  { font-size: 36px; }
  .fz-video-title-sm  { font-size: 24px; }
  .fz-video-lg-meta   { flex-direction: row; justify-content: space-between; align-items: flex-start; }

  /* Streams */
  .fz-grid-2          { grid-template-columns: 1fr 1fr; gap: 22px; }
  .fz-streams-header  { flex-direction: row; align-items: baseline; justify-content: space-between; gap: 40px; margin-bottom: 56px; }
  .fz-stream-hero     { height: 220px; }

  /* Fantasy */
  .fz-grid-fantasy       { grid-template-columns: 1.1fr 0.9fr; gap: 80px; }
  .fz-fantasy-code-value { font-size: 38px; }
  .fz-fantasy-stat-num   { font-size: 36px; }

  /* Members */
  .fz-grid-3          { grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .fz-members-header  { flex-direction: row; align-items: center; gap: 40px; }
  .fz-members-cta     { flex-direction: row; align-items: center; justify-content: space-between; }
  .fz-members-cta .fz-btn { width: auto; }
  .fz-perk-number     { font-size: 88px; }
  .fz-perk-card       { padding: 36px 32px; }

  /* Discord */
  .fz-grid-discord    { grid-template-columns: 1.2fr 0.8fr; gap: 80px; }
  .fz-discord-cta     { width: auto; }

  /* CTA */
  .fz-cta-btns { flex-direction: row; flex-wrap: wrap; justify-content: center; margin-top: 48px; }
  .fz-cta-btns .fz-btn { width: auto; }

  /* Footer */
  .fz-footer-grid   { grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 56px; }
  .fz-footer-bottom { flex-direction: row; justify-content: space-between; }
}
```

- [ ] **Step 1.2: Verify the dev server still compiles with no errors**

```bash
cd /Users/jorgeignaciogaray/Workspace/Projects/formulazeta
pnpm dev
```

Expected: server starts at `http://localhost:5173`, no CSS parse errors in terminal.

- [ ] **Step 1.3: Check desktop layout at 1280px in DevTools — should look identical to before**

Open `http://localhost:5173`, DevTools → Responsive, set to 1280px wide. Nav, Hero, Videos, etc. should be unchanged from the current desktop design.

- [ ] **Step 1.4: Commit**

```bash
git add src/index.css
git commit -m "refactor(css): mobile-first restructure with min-width breakpoints"
```

---

## Task 2: `Nav.tsx` — Fullscreen overlay menu

**Files:**
- Modify: `src/components/Nav.tsx`

Replace the current `fz-nav-mobile-menu` dropdown with a `position: fixed` fullscreen overlay. Add scroll lock via `useEffect`. Add `fz-nav-bar` class for height control.

- [ ] **Step 2.1: Replace `src/components/Nav.tsx` with the following**

```tsx
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
        <div style={{
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
            className="fz-mono"
            style={{
              position: 'absolute', top: 18, right: 20,
              width: 40, height: 40,
              border: '1px solid var(--fz-line-2)',
              color: 'var(--fz-text)', fontSize: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
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
            style={{ marginTop: 24, justifyContent: 'center' }}
          >
            SER SOCIO →
          </a>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2.2: Verify at 390px in DevTools**

- Hamburger visible, desktop links hidden
- Tap hamburger → fullscreen overlay with 6 items in Bebas Neue
- Hamburger button turns red when overlay is open
- Body does not scroll while overlay is open
- Tap ✕ or any link → overlay closes, scroll restored

- [ ] **Step 2.3: Verify at 1280px in DevTools**

- Hamburger hidden, desktop links visible
- "SER SOCIO" CTA visible on the right

- [ ] **Step 2.4: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat(nav): fullscreen mobile overlay with scroll lock"
```

---

## Task 3: `Ticker.tsx` — CSS-controlled sizing

**Files:**
- Modify: `src/components/Ticker.tsx`

Replace inline `height`, `font-size`, and `animation` duration with CSS classes `fz-ticker` and `fz-ticker-track`. The classes are already defined in `index.css` from Task 1.

- [ ] **Step 3.1: Replace `src/components/Ticker.tsx` with the following**

```tsx
// Top red ticker — endless marquee with channel news
import { FZ_FANTASY_CODE } from '../data';
import { pad2, type NextRace } from '../hooks';

interface TickerProps {
  countdown: { d: number; h: number; m: number };
  race: NextRace;
  raceLoading: boolean;
}

export function Ticker({ countdown, race, raceLoading }: TickerProps) {
  const round = String(race.round).padStart(2, '0');
  const raceItem = raceLoading
    ? null
    : `R${round} ${race.city} · ${pad2(countdown.d)}D ${pad2(countdown.h)}H`;
  const items = [
    'NUEVO VIDEO: ANÁLISIS DEL FIN DE SEMANA',
    'EN VIVO PRONTO EN KICK · KICK.COM/FORMULAZETA',
    `F1 FANTASY LEAGUE · CÓDIGO ${FZ_FANTASY_CODE}`,
    ...(raceItem ? [raceItem] : []),
    'SUMATE A LA COMUNIDAD DE DISCORD',
  ];
  return (
    <div
      className="fz-ticker"
      style={{
        background: 'var(--fz-red)', color: '#fff', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
      }}
    >
      <div
        className="fz-ticker-track fz-mono fz-ucase"
        style={{
          display: 'flex', gap: 56,
          willChange: 'transform', whiteSpace: 'nowrap',
          letterSpacing: '0.12em',
        }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i}>
            ■ {t}
            <span style={{
              display: 'inline-block', width: 6, height: 6,
              background: '#fff', borderRadius: '50%',
              margin: '0 14px', verticalAlign: 'middle',
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}
```

Note: ticker message for mobile is shortened to `R${round} ${race.city} · Xd Xh` (drops minutes) — matches the mobile mock.

- [ ] **Step 3.2: Verify**

At 390px: ticker height 30px, font tiny. At 1280px: ticker height 36px, font 12px.

- [ ] **Step 3.3: Commit**

```bash
git add src/components/Ticker.tsx
git commit -m "feat(ticker): css-controlled height and font-size for mobile"
```

---

## Task 4: `Hero.tsx` — CSS classes for mobile sizing

**Files:**
- Modify: `src/components/Hero.tsx`

Add CSS classes to elements that need different sizing on mobile vs desktop. No structural change.

- [ ] **Step 4.1: Replace `src/components/Hero.tsx` with the following**

```tsx
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
                    style={{ marginTop: 16, width: '100%', justifyContent: 'center', fontSize: 10 }}
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
```

- [ ] **Step 4.2: Verify at 390px**

- Hero h1: ~96px tall
- Body text: 16px
- Stats numbers: 26px in 2-col grid
- Countdown below the text block (fz-hero-grid is 1-col)
- Countdown city: 44px, digits: 32px
- Both CTA buttons stacked full-width

- [ ] **Step 4.3: Verify at 1280px**

- Hero grid: text left, countdown card right (2-col)
- Stats: 4-col row
- Body text: 22px
- Countdown city: 64px, digits: 48px

- [ ] **Step 4.4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): mobile-responsive sizing with css classes"
```

---

## Task 5: `Videos.tsx` — Thumb heights, large card reflow, CTA

**Files:**
- Modify: `src/components/Videos.tsx`

Three changes: (1) add CSS classes for thumb heights and titles, (2) restructure `VideoCardLarge` so stats go below the title on mobile (using `fz-video-lg-meta`), (3) add CTA link at bottom.

- [ ] **Step 5.1: Replace `src/components/Videos.tsx` with the following**

```tsx
import { FZ_LINKS, FZ_VIDEOS, type FZVideo } from '../data';
import { useYTVideos } from '../yt';

export function Videos() {
  const yt = useYTVideos();
  const videos = yt.status === 'ok' ? yt.videos : FZ_VIDEOS;
  const loading = yt.status === 'loading';

  return (
    <section id="videos" style={{
      paddingTop: 52, paddingBottom: 60,
      background: 'var(--fz-surface)',
      borderTop: '1px solid var(--fz-line)',
      borderBottom: '1px solid var(--fz-line)',
    }}>
      <div className="fz-container">
        <div className="fz-secthead fz-reveal" style={{ marginBottom: 18 }}>
          <span className="fz-secthead-num">01</span>
          <span>VIDEOS / @FORMULAZETA</span>
          <span className="fz-secthead-rule" />
          <a href={FZ_LINKS.youtube} className="fz-mono" style={{ color: 'var(--fz-text)', whiteSpace: 'nowrap' }}>VER TODOS →</a>
        </div>

        <h2 className="fz-h2 fz-reveal" style={{ marginBottom: 28 }}>EL CANAL.</h2>

        {loading ? (
          <VideoSkeleton />
        ) : (
          <>
            <div className="fz-videos-lg">
              {videos.slice(0, 2).map((v, i) => <VideoCardLarge key={v.id} v={v} delay={i + 1} />)}
            </div>
            <div className="fz-videos-sm">
              {videos.slice(2, 6).map((v, i) => <VideoCardSmall key={v.id} v={v} delay={i + 1} />)}
            </div>
          </>
        )}

        <a href={FZ_LINKS.youtube} className="fz-videos-cta fz-mono fz-reveal">
          VER TODOS LOS VIDEOS →
        </a>
      </div>
    </section>
  );
}

function VideoSkeleton() {
  return (
    <>
      <div className="fz-videos-lg">
        {[0, 1].map((i) => (
          <div key={i} className="fz-card">
            <div className="fz-video-thumb-lg" style={{ background: 'var(--fz-surface-2)', animation: 'fzPulse 1.8s ease-in-out infinite' }} />
            <div style={{ padding: '14px 4px', height: 28, background: 'var(--fz-surface-2)', margin: '0 4px', opacity: 0.5 }} />
          </div>
        ))}
      </div>
      <div className="fz-videos-sm">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="fz-card">
            <div className="fz-video-thumb-sm" style={{ background: 'var(--fz-surface-2)', animation: 'fzPulse 1.8s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
            <div style={{ padding: '10px 12px', height: 36, background: 'var(--fz-surface-2)', margin: '0 12px', opacity: 0.4 }} />
          </div>
        ))}
      </div>
    </>
  );
}

function VideoCardLarge({ v, delay }: { v: FZVideo; delay: number }) {
  return (
    <a
      href={`https://youtube.com/watch?v=${v.id}`}
      className={`fz-card fz-card-hover fz-reveal fz-reveal-d${delay}`}
      style={{ display: 'block', position: 'relative' }}
    >
      <div className="fz-video-thumb-lg" style={{ position: 'relative', overflow: 'hidden', background: 'var(--fz-surface-2)' }}>
        <VideoThumb v={v} />
        <PlayArc />
        <div style={{ position: 'absolute', left: 14, top: 14, zIndex: 2 }}>
          <span className="fz-tag">{v.tag}</span>
        </div>
        <Duration value={v.duration} />
      </div>
      {/* fz-video-lg-meta: column on mobile, row on desktop */}
      <div className="fz-video-lg-meta">
        <h3 className="fz-display fz-video-title-lg">{v.title.toUpperCase()}</h3>
        <div className="fz-mono" style={{ fontSize: 10, color: 'var(--fz-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <div>{v.views} VIEWS</div>
          <div style={{ marginTop: 4 }}>{v.age.toUpperCase()}</div>
        </div>
      </div>
    </a>
  );
}

function VideoCardSmall({ v, delay }: { v: FZVideo; delay: number }) {
  return (
    <a
      href={`https://youtube.com/watch?v=${v.id}`}
      className={`fz-card fz-card-hover fz-reveal fz-reveal-d${delay}`}
      style={{ display: 'block' }}
    >
      <div className="fz-video-thumb-sm" style={{ position: 'relative', overflow: 'hidden', background: 'var(--fz-surface-2)' }}>
        <VideoThumb v={v} small />
        <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 2 }}>
          <span className="fz-tag" style={{ fontSize: 9, padding: '3px 8px' }}>{v.tag}</span>
        </div>
        <Duration value={v.duration} small />
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <h4 className="fz-display fz-video-title-sm">{v.title.toUpperCase()}</h4>
        <div className="fz-mono" style={{ fontSize: 9, color: 'var(--fz-muted)', marginTop: 6, display: 'flex', gap: 6 }}>
          <span>{v.views}</span><span>·</span><span>{v.age.toUpperCase()}</span>
        </div>
      </div>
    </a>
  );
}

function VideoThumb({ v, small = false }: { v: FZVideo; small?: boolean }) {
  if (v.thumb) {
    return (
      <img
        src={v.thumb}
        alt={v.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s cubic-bezier(.2,.7,.3,1)' }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
    );
  }
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: `repeating-linear-gradient(90deg, oklch(0.30 0.06 ${v.hue}) 0 24px, oklch(0.26 0.06 ${v.hue}) 24px 48px), oklch(0.32 0.08 ${v.hue})`,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />
      <div className="fz-mono" style={{
        position: 'absolute', left: 12, bottom: 12, zIndex: 2,
        fontSize: small ? 8 : 9, letterSpacing: '0.32em',
        color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
      }}>
        [{v.title.slice(0, small ? 18 : 32)}…]
      </div>
    </div>
  );
}

function PlayArc() {
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%,-50%)',
      width: 56, height: 56, background: 'var(--fz-red)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
    }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M4 3l11 6-11 6V3z"/></svg>
    </div>
  );
}

function Duration({ value, small = false }: { value: string; small?: boolean }) {
  return (
    <span className="fz-mono" style={{
      position: 'absolute', right: 10, bottom: 10, zIndex: 2,
      background: 'rgba(10,9,8,0.9)', color: '#fff',
      padding: small ? '2px 5px' : '4px 8px',
      fontSize: small ? 9 : 11,
    }}>
      {value}
    </span>
  );
}
```

- [ ] **Step 5.2: Verify at 390px**

- 2 hero videos stacked vertically, each thumbnail 200px tall
- Title 24px, stats (views + age) below the title in a column
- 4 small videos in 2×2 grid, each thumbnail 100px tall, title 16px
- "VER TODOS LOS VIDEOS →" CTA link at the bottom

- [ ] **Step 5.3: Verify at 1280px**

- 2 hero videos side by side, thumbnail 360px tall
- Stats (views + age) right-aligned next to title
- 4 small videos in a 4-col row, thumbnail 170px tall, title 24px
- CTA still visible at bottom (desktop also shows it)

- [ ] **Step 5.4: Commit**

```bash
git add src/components/Videos.tsx
git commit -m "feat(videos): mobile thumb heights, card reflow, ver-todos cta"
```

---

## Task 6: `Streams.tsx` — Stream hero height class

**Files:**
- Modify: `src/components/Streams.tsx`

One-line change: add `fz-stream-hero` class to the `height: 220px` div inside `StreamCard`.

- [ ] **Step 6.1: In `src/components/Streams.tsx`, find the `StreamCard` function and replace the hero div**

Find this line in `StreamCard`:
```tsx
      <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
```

Replace with:
```tsx
      <div className="fz-stream-hero" style={{ position: 'relative', overflow: 'hidden' }}>
```

- [ ] **Step 6.2: Verify**

At 390px: YouTube and Kick cards stacked, each hero area 140px tall.  
At 1280px: side by side, each hero area 220px tall.

- [ ] **Step 6.3: Commit**

```bash
git add src/components/Streams.tsx
git commit -m "feat(streams): css-controlled stream card hero height"
```

---

## Task 7: `Fantasy.tsx` — Code chip and stats classes

**Files:**
- Modify: `src/components/Fantasy.tsx`

Add `fz-fantasy-code-value` class to the code text span and `fz-fantasy-stat-num` to stat numbers. Replace inline `fontSize: 'clamp(22px, 5vw, 38px)'` with the class. Also add section padding override for mobile.

- [ ] **Step 7.1: In `src/components/Fantasy.tsx`, replace the code chip div**

Find:
```tsx
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 26px', background: 'var(--fz-bg)',
                border: '2px dashed var(--fz-red)',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 'clamp(22px, 5vw, 38px)',
                letterSpacing: '0.12em', color: 'var(--fz-text)', position: 'relative',
                justifyContent: 'space-between',
              }}>
```

Replace with:
```tsx
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 18px', background: 'var(--fz-bg)',
                border: '2px dashed var(--fz-red)',
                letterSpacing: '0.12em', color: 'var(--fz-text)', position: 'relative',
                justifyContent: 'space-between', width: '100%', boxSizing: 'border-box',
              }}>
```

- [ ] **Step 7.2: Add `fz-fantasy-code-value` class to the code span**

Find:
```tsx
                  <span>{FZ_FANTASY_CODE}</span>
```

Replace with:
```tsx
                  <span className="fz-mono fz-fantasy-code-value">{FZ_FANTASY_CODE}</span>
```

- [ ] **Step 7.3: Add `fz-fantasy-stat-num` class to stat numbers**

Find the stats map inside the card:
```tsx
                    <div className="fz-display fz-tnum" style={{ fontSize: 36 }}>{n}</div>
```

Replace with:
```tsx
                    <div className="fz-display fz-tnum fz-fantasy-stat-num">{n}</div>
```

- [ ] **Step 7.4: Fix section padding for mobile (52px top/bottom instead of 100px)**

Find:
```tsx
      paddingTop: 100, paddingBottom: 100,
```

Replace with:
```tsx
      paddingTop: 56, paddingBottom: 56,
```

- [ ] **Step 7.5: Verify at 390px**

- Single-column layout (text then code card)
- Code chip: full-width, code in 22px mono font
- Stats numbers: 26px, 3-col grid
- CTAs stacked full-width below the card (they already use flexWrap — confirm they stack)

- [ ] **Step 7.6: Verify at 1280px**

- Two-column layout (text left, code card right)
- Code chip font: 38px
- Stats: 36px

- [ ] **Step 7.7: Commit**

```bash
git add src/components/Fantasy.tsx
git commit -m "feat(fantasy): mobile code chip sizing and full-width layout"
```

---

## Task 8: `Members.tsx` — Perk number and card padding classes

**Files:**
- Modify: `src/components/Members.tsx`

Replace the inline `fontFamily/fontSize/lineHeight/color` on perk numbers with `fz-perk-number` class. Replace inline `padding` on perk cards with `fz-perk-card` class. Fix section padding.

- [ ] **Step 8.1: In `src/components/Members.tsx`, replace the perk number div**

Find:
```tsx
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 88, lineHeight: 0.85, color: 'var(--fz-red)',
              }}>{p.n}</div>
```

Replace with:
```tsx
              <div className="fz-perk-number">{p.n}</div>
```

- [ ] **Step 8.2: Add `fz-perk-card` class to each perk card**

Find:
```tsx
              style={{ padding: '36px 32px', position: 'relative' }}
```

Replace with:
```tsx
              className={`fz-card fz-card-hover fz-perk-card fz-reveal fz-reveal-d${i + 1}`}
              style={{ position: 'relative' }}
```

Wait — the element already has `className`. The full element is:
```tsx
            <div
              key={p.n}
              className={`fz-card fz-card-hover fz-reveal fz-reveal-d${i + 1}`}
              style={{ padding: '36px 32px', position: 'relative' }}
            >
```

Replace with:
```tsx
            <div
              key={p.n}
              className={`fz-card fz-card-hover fz-perk-card fz-reveal fz-reveal-d${i + 1}`}
              style={{ position: 'relative' }}
            >
```

- [ ] **Step 8.3: Fix section padding for mobile**

Find:
```tsx
    <section id="socios" style={{ paddingTop: 100, paddingBottom: 100,
```

Replace with:
```tsx
    <section id="socios" style={{ paddingTop: 56, paddingBottom: 56,
```

- [ ] **Step 8.4: Add `fz-display` class and fix title size on perk**

Find:
```tsx
              <div className="fz-display" style={{ fontSize: 32, marginTop: 18, lineHeight: 1 }}>
```

Replace with:
```tsx
              <div className="fz-display" style={{ fontSize: 'clamp(24px, 4vw, 32px)', marginTop: 12, lineHeight: 1 }}>
```

- [ ] **Step 8.5: Verify at 390px**

- 3 perks stacked in 1 column
- Perk number: 60px, red
- Banner "CON SUMARTE YA ALCANZA" with CTA below it (fz-members-cta is column on mobile)

- [ ] **Step 8.6: Verify at 1280px**

- 3 perks in a row
- Perk number: 88px
- Banner: text left, CTA right

- [ ] **Step 8.7: Commit**

```bash
git add src/components/Members.tsx
git commit -m "feat(members): mobile perk sizing with css classes"
```

---

## Task 9: `CTA.tsx` — Stacked full-width buttons

**Files:**
- Modify: `src/components/CTA.tsx`

Wrap buttons in a div with class `fz-cta-btns`. Remove `inline-flex` from the wrapper (CSS handles it).

- [ ] **Step 9.1: Replace `src/components/CTA.tsx` with the following**

```tsx
// CTA — final call to action before footer
import { FZ_LINKS } from '../data';

export function CTA() {
  return (
    <section style={{ padding: '70px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(800px 400px at 50% 50%, rgba(217,56,44,0.18), transparent 60%)',
      }} />
      <div className="fz-container" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="fz-secthead fz-reveal" style={{ justifyContent: 'center', marginBottom: 18 }}>
          <span style={{ color: 'var(--fz-red)' }}>● HASTA LA PRÓXIMA VUELTA</span>
        </div>
        <h2 className="fz-h1 fz-reveal">
          <span style={{ display: 'block' }}>VAMOS A</span>
          <span style={{ display: 'block', color: 'var(--fz-red)' }}>RODAR.</span>
        </h2>
        <div className="fz-cta-btns fz-reveal fz-reveal-d2">
          <a href={FZ_LINKS.youtube}     className="fz-btn fz-btn-primary fz-btn-lg">▶ IR AL CANAL</a>
          <a href={FZ_LINKS.youtubeJoin} className="fz-btn fz-btn-ghost   fz-btn-lg">SER SOCIO</a>
          <a href={FZ_LINKS.discord}     className="fz-btn fz-btn-ghost   fz-btn-lg">DISCORD</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 9.2: Verify at 390px**

- Headline ~86px (fz-h1 = 96px default — close enough; spec says 86px, acceptable)
- 3 buttons stacked full-width in a column

- [ ] **Step 9.3: Verify at 1280px**

- Buttons side by side in a row, centered

- [ ] **Step 9.4: Commit**

```bash
git add src/components/CTA.tsx
git commit -m "feat(cta): stacked full-width buttons on mobile"
```

---

## Task 10: `Discord.tsx` + `Footer.tsx` — Minor class additions

**Files:**
- Modify: `src/components/Discord.tsx`
- Modify: `src/components/Footer.tsx`

### Discord

- [ ] **Step 10.1: In `src/components/Discord.tsx`, add `fz-discord-cta` class to the CTA button and fix section padding**

Find:
```tsx
            <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={FZ_LINKS.discord}
                className="fz-btn fz-btn-lg"
                style={{ background: '#5865F2', color: '#fff' }}
              >UNIRME AL SERVIDOR →</a>
            </div>
```

Replace with:
```tsx
            <div style={{ marginTop: 36 }}>
              <a
                href={FZ_LINKS.discord}
                className="fz-btn fz-btn-lg fz-discord-cta"
                style={{ background: '#5865F2', color: '#fff' }}
              >UNIRME AL SERVIDOR →</a>
            </div>
```

Find the section padding:
```tsx
      paddingTop: 100, paddingBottom: 100,
```
Replace with:
```tsx
      paddingTop: 56, paddingBottom: 56,
```

### Footer

- [ ] **Step 10.2: In `src/components/Footer.tsx`, fix container padding and logo/wordmark sizes**

The footer uses `fz-footer-grid` and `fz-footer-bottom` — those are already CSS-controlled. Just fix the inline logo and wordmark sizes to use smaller defaults.

Find:
```tsx
              <img src="/logo.png" alt="" style={{ width: 36, height: 36 }} />
              <span className="fz-display" style={{ fontSize: 32, letterSpacing: '0.03em' }}>
```

Replace with:
```tsx
              <img src="/logo.png" alt="" style={{ width: 30, height: 30 }} />
              <span className="fz-display" style={{ fontSize: 22, letterSpacing: '0.03em' }}>
```

Find the container top/bottom padding:
```tsx
        <div className="fz-container" style={{ paddingTop: 64, paddingBottom: 32 }}>
```

Replace with:
```tsx
        <div className="fz-container" style={{ paddingTop: 36, paddingBottom: 24 }}>
```

Find the footer bottom copyright:
```tsx
          <span>© 2026 FORMULA ZETA · TODOS LOS DERECHOS RESERVADOS</span>
          <span>HECHO POR FANS, PARA FANS</span>
```

Replace with:
```tsx
          <span>© 2026 FORMULA ZETA · HECHO POR FANS, PARA FANS</span>
```

(One line on mobile is cleaner; second span disappears since fz-footer-bottom is column on mobile.)

- [ ] **Step 10.3: Also fix Streams section padding**

In `src/components/Streams.tsx`, find:
```tsx
    <section id="en-vivo" style={{ paddingTop: 100, paddingBottom: 100 }}>
```

Replace with:
```tsx
    <section id="en-vivo" style={{ paddingTop: 56, paddingBottom: 56 }}>
```

- [ ] **Step 10.4: Verify at 390px**

- Discord: CTA button full-width
- Footer: logo 30×30, wordmark 22px, links in 1-col, 2-col grid for CONTENIDO + COMUNIDAD
- Copyright one line

- [ ] **Step 10.5: Verify at 1280px**

- Discord: CTA button auto-width
- Footer: 4-col grid, logo 36×36, wordmark 32px

- [ ] **Step 10.6: Commit**

```bash
git add src/components/Discord.tsx src/components/Footer.tsx src/components/Streams.tsx
git commit -m "feat(discord,footer,streams): mobile padding and size fixes"
```

---

## Task 11: Visual verification pass

**Files:** None — testing only

Run the dev server and verify all breakpoints systematically.

- [ ] **Step 11.1: Start dev server**

```bash
pnpm dev
```

- [ ] **Step 11.2: Check 390px — run through the full checklist**

Open DevTools → Responsive → 390px width.

| Check | Expected |
|-------|----------|
| Ticker | 30px tall, 10px font |
| Nav bar | 60px tall, hamburger visible |
| Hamburger → overlay | Opens fullscreen, 6 items Bebas 56px, first item red |
| Body scroll locked | Body does not scroll while overlay open |
| ✕ / link click | Closes overlay, scroll restored |
| Hero h1 | ~96px |
| Hero body | 16px |
| Hero CTAs | Stacked full-width column |
| Hero stats | 2×2 grid, 26px numbers |
| Countdown card | Below text, 44px city, 32px digits |
| Videos: hero | 2 cards stacked, 200px thumb, 24px title, stats below |
| Videos: small | 2×2 grid, 100px thumb, 16px title |
| Videos CTA | "VER TODOS LOS VIDEOS →" visible |
| Streams | 2 cards stacked, 140px hero area |
| Fantasy | 1-col, code chip full-width, 22px code font |
| Members | 3 perks stacked, 60px perk number |
| Members banner | Text above, CTA below (column) |
| Discord | 1-col, CTA full-width |
| CTA | 3 buttons stacked full-width |
| Footer | 1-col top, 2-col links, 1-line copyright |
| Horizontal scroll | NONE — `document.body.scrollWidth === window.innerWidth` |

- [ ] **Step 11.3: Check horizontal scroll via DevTools console**

```js
document.body.scrollWidth > window.innerWidth
// Expected: false
```

If `true`, inspect which element is overflowing with:
```js
[...document.querySelectorAll('*')].filter(el => el.scrollWidth > window.innerWidth).map(el => el.className || el.tagName)
```

Fix any overflowing element.

- [ ] **Step 11.4: Check 768px (tablet)**

- Videos: 2 large heroes side by side (280px thumb)
- Members: 2-col grid
- Footer: 2-col grid
- Nav: hamburger still visible (hamburger hides at 1024px)

- [ ] **Step 11.5: Check 1280px (desktop)**

- All sections match the original desktop design
- Nav: desktop links visible, hamburger hidden
- Hero: 2-col grid, countdown card on right
- Videos: 2-col + 4-col
- Footer: 4-col grid

- [ ] **Step 11.6: Final commit**

```bash
git add -A
git commit -m "chore: mobile-first responsive implementation complete"
```

---

## Self-Review Notes

- **Spec coverage:** All 11 sections from the README checklist are covered (Ticker, Nav overlay, Hero, Videos, Streams, Fantasy, Members, Discord, CTA, Footer, scroll lock). ✓
- **No placeholders:** All steps include exact code. ✓  
- **Type consistency:** CSS class names used in component tasks (`fz-perk-number`, `fz-stream-hero`, `fz-video-lg-meta`, etc.) all match definitions in Task 1 CSS. ✓
- **One gap fixed:** Streams section padding was missing — added to Task 10 step 10.3. ✓
