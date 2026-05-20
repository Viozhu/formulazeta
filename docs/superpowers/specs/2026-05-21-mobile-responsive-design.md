# Spec: Formula Zeta — Mobile Responsive (Approach C: Mobile-First Refactor)

**Date:** 2026-05-21  
**Reference:** `design_handoff_mobile/README.md` + `design_handoff_mobile/reference/variant-b-mobile.jsx`  
**Approach:** Mobile-first CSS refactor + targeted component patches

---

## 1. Overview

Implement the mobile version of the "Arcade Paddock" design (Variant B) by refactoring the existing CSS from desktop-first (max-width queries) to mobile-first (min-width queries). The site is a single page — same section order as desktop, reflowed to 390px.

No new files. Edit existing components in `src/components/` and `src/index.css`.

---

## 2. Breakpoint System

```
default   0–767px    → mobile  (390px reference)
min-768   768–1023px → tablet  (2-col interpolation)
min-1024  1024px+    → desktop (existing design)
```

**Migration:** The current `@media (max-width: 767px)` block becomes the new **default** (no query). The current `@media (max-width: 980px)` block merges into `@media (min-width: 768px)`. All existing "base" desktop styles move into `@media (min-width: 1024px)`.

---

## 3. Design Tokens — Mobile Overrides

These become the default CSS values (no media query):

```css
/* Type scale — mobile defaults */
.fz-h1  → font-size: 96px                        → desktop: clamp(52px, 14vw, 240px) via min-1024
.fz-h2  → font-size: 64px                        → desktop: 132px
.fz-h3  → font-size: 40px                        → desktop: 72px
.fz-h4  → font-size: 28px                        → desktop: 40px

/* Container */
.fz-container → padding: 0 20px                  → desktop: 0 48px

/* Section head */
.fz-secthead-num → 28×28px, font 10px            → desktop: 36×36px
.fz-secthead     → font-size: 9px                → desktop: 12px
```

Color tokens (`--fz-red`, `--fz-bg`, etc.) unchanged — identical between mobile and desktop.

---

## 4. Component Changes

### 4.1 `index.css` — Full restructure

**Structure after refactor:**

```
:root { ... }                          ← unchanged
base reset                             ← unchanged
type helpers / layout utils            ← unchanged, but .fz-container = 20px default
section head                           ← 28×28, 9px default
type scale                             ← mobile sizes as default
buttons                                ← unchanged (already sized OK for mobile)
cards, patterns, tags, reveal          ← unchanged
layout utility classes                 ← mobile-first defaults (1-col, stacked)
@keyframes                             ← unchanged

@media (min-width: 768px) { ... }      ← tablet: 2-col for videos/members, 32px container
@media (min-width: 1024px) { ... }     ← desktop: all existing grid/split layouts
```

**Mobile-default layout classes** (no query, replaces old max-width overrides):
- `.fz-hero-grid` → `grid-template-columns: 1fr; gap: 36px; margin-top: 32px`
- `.fz-hero-stats` → `grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 36px`
- `.fz-videos-lg` → `grid-template-columns: 1fr; gap: 16px`
- `.fz-videos-sm` → `grid-template-columns: 1fr 1fr; gap: 12px`
- `.fz-grid-2` → `grid-template-columns: 1fr; gap: 16px`
- `.fz-grid-3` → `grid-template-columns: 1fr; gap: 16px`
- `.fz-grid-fantasy` → `grid-template-columns: 1fr; gap: 32px`
- `.fz-grid-discord` → `grid-template-columns: 1fr; gap: 32px`
- `.fz-streams-header` → `flex-direction: column; gap: 16px; margin-bottom: 36px`
- `.fz-members-header` → `flex-direction: column; gap: 20px`
- `.fz-members-cta` → `flex-direction: column; align-items: stretch`
- `.fz-footer-grid` → `grid-template-columns: 1fr; gap: 28px`
- `.fz-footer-bottom` → `flex-direction: column; gap: 8px`
- `.fz-nav-hamburger` → `display: flex` (default visible)
- `.fz-nav-desktop-items` → `display: none`
- `.fz-nav-desktop-cta` → `display: none`

**Additional mobile-only CSS rules:**
- `.fz-ticker` → `height: 30px; font-size: 10px; animation-duration: 40s`
- `.fz-nav-bar` → `height: 60px` (new class on nav inner div)
- `.fz-hero-body` → `font-size: 16px` (new class on hero paragraph)
- `.fz-hero-stat-num` → `font-size: 26px` (new class on stat number)
- `.fz-countdown-city` → `font-size: 44px` (new class)
- `.fz-countdown-digit` → `font-size: 32px` (new class)
- `.fz-video-thumb-lg` → `height: 200px`
- `.fz-video-thumb-sm` → `height: 100px`
- `.fz-video-title-lg` → `font-size: 24px`
- `.fz-video-title-sm` → `font-size: 16px`
- `.fz-stream-hero` → `height: 140px`
- `.fz-perk-number` → `font-size: 60px`
- `.fz-perk-card` → `padding: 24px 22px`
- `.fz-cta-btns` → `flex-direction: column; width: 100%` (each btn full-width)

**`@media (min-width: 1024px)` restores desktop values** for all the above.

---

### 4.2 `Nav.tsx` — Overlay menu

Replace the current `fz-nav-mobile-menu` dropdown with a **fixed fullscreen overlay**.

**Changes:**
- Nav inner bar gets class `fz-nav-bar` (height controlled by CSS: 60px mobile, 78px desktop)
- Hamburger: `background: menuOpen ? 'var(--fz-red)' : 'transparent'`
- Mobile menu: `position: fixed; inset: 0; z-index: 40; background: rgba(10,9,8,0.96); backdrop-filter: blur(8px)`
- Menu items: Bebas Neue, 56px, one per line, `border-bottom: 1px solid var(--fz-line)`
- First item (HOME) renders in `var(--fz-red)`
- Close button (✕) top-right 40×40 with border
- CTA "SER SOCIO →" full-width `fz-btn fz-btn-primary` at bottom
- Scroll lock: `useEffect` toggles `document.body.style.overflow = menuOpen ? 'hidden' : ''`
- Click any link → close menu

---

### 4.3 `Ticker.tsx`

Add class `fz-ticker-track` to inner div. Move all sizing to CSS (mobile defaults, desktop via min-1024).

---

### 4.4 `Hero.tsx`

Add new CSS classes to elements that need mobile-specific sizing:
- `fz-hero-body` on the paragraph
- `fz-hero-stat-num` on each stat number div
- `fz-countdown-city` on city div
- `fz-countdown-digit` on each digit div
- `fz-nav-bar` on the hero bg decorations get reduced opacity/size via CSS

No structural change — layout already handled by `fz-hero-grid`.

---

### 4.5 `Videos.tsx`

**Structural change in `VideoCardLarge`:**

On mobile, stats row (views + age) moves **below** the title in a single line, not a right-aligned column. Achieved by:
- Wrapping title+stats in a div with class `fz-video-lg-meta`
- CSS: `.fz-video-lg-meta` → `flex-direction: column` on mobile, `flex-direction: row; justify-content: space-between` on desktop

Add class `fz-video-thumb-lg` to large thumb div, `fz-video-thumb-sm` to small thumb div, `fz-video-title-lg` and `fz-video-title-sm` to title elements.

**New CTA** at end of Videos section:
```tsx
<a href={FZ_LINKS.youtube} className="fz-mono fz-videos-cta">
  VER TODOS LOS VIDEOS →
</a>
```
CSS: `display: block; text-align: center; padding: 14px; border: 1px solid var(--fz-line-2); font-size: 11px; letter-spacing: 0.2em; margin-top: 24px`

---

### 4.6 `Streams.tsx`

Add class `fz-stream-hero` to the `height: 220px` div in `StreamCard`. CSS controls height (140px mobile, 220px desktop).

---

### 4.7 `Fantasy.tsx`

Add class `fz-fantasy-code-chip` to the code chip div. CSS: font-size 22px mobile (already inline, needs override or class). Add `fz-fantasy-stats` to stats grid for font-size control.

---

### 4.8 `Members.tsx`

Add class `fz-perk-number` to each perk number div. Add class `fz-perk-card` to each perk card. CSS overrides padding and font-size.

---

### 4.9 `CTA.tsx`

Add class `fz-cta-btns` to the button wrapper div. CSS: column direction + full-width buttons on mobile.

---

### 4.10 `Discord.tsx`, `Footer.tsx`

Minor class additions for elements that need mobile sizing. No structural changes — layout already handled by grid classes.

---

## 5. Interactions

- **Hamburger**: `menuOpen` state toggles overlay. Body scroll locked when open.
- **Scroll lock**: `useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen])`
- **Countdown**: unchanged — `useCountdown()` hook continues as-is.
- **Copy code**: unchanged — `navigator.clipboard.writeText()`.
- **Reveal on scroll**: `.fz-reveal` + IntersectionObserver unchanged.
- **Touch hit areas**: `.fz-btn` padding 16px 20px → ≥48px tall ✓. Social tiles 36×36 — acceptable (close to 44px HIG minimum).

---

## 6. Files Modified

| File | Type of change |
|------|----------------|
| `src/index.css` | Full restructure to mobile-first |
| `src/components/Nav.tsx` | Overlay menu, scroll lock, nav height class |
| `src/components/Ticker.tsx` | Add CSS classes, remove inline sizing |
| `src/components/Hero.tsx` | Add CSS classes for mobile sizing |
| `src/components/Videos.tsx` | Thumb heights, title sizes, VideoCardLarge reflow, CTA |
| `src/components/Streams.tsx` | Stream hero height class |
| `src/components/Fantasy.tsx` | Code chip + stats classes |
| `src/components/Members.tsx` | Perk number + card classes |
| `src/components/CTA.tsx` | Button wrapper class |
| `src/components/Discord.tsx` | Minor class additions |
| `src/components/Footer.tsx` | Minor class additions |

No new files. No new dependencies.

---

## 7. Testing Checklist

- [ ] 390px — all sections render correctly
- [ ] 414px — no horizontal scroll
- [ ] 768px (tablet) — 2-col grids for Videos sm + Members
- [ ] 1280px — desktop unchanged
- [ ] Hamburger opens overlay, closes on link click / ✕
- [ ] Body scroll locked when menu open
- [ ] Countdown runs while menu is open
- [ ] Reveal animations not broken on mobile
- [ ] Hit areas ≥ 44px for primary actions
