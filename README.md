# Formula Zeta — Website Handoff

Paquete listo para llevar el rediseño de **Formula Zeta** a un proyecto de React (Vite / Next.js / cualquier setup moderno).

Incluye la dirección "Arcade Paddock" elegida (Variant B del canvas de exploración) + Style Guide completo.

---

## 📁 Estructura del paquete

```
handoff/
├── README.md                ← este archivo
├── STYLEGUIDE.md            ← sistema visual completo (paleta, tipografía, voz)
├── public/
│   └── logo.png             ← logotipo
└── src/
    ├── index.css            ← reset + tokens CSS (variables globales)
    ├── App.tsx              ← root del sitio
    ├── data.ts              ← contenido real del canal + tipos
    ├── hooks.ts             ← useCountdown, useReveal
    └── components/
        ├── Ticker.tsx       ← barra superior roja con marquee
        ├── Nav.tsx          ← navegación sticky
        ├── Hero.tsx         ← hero + countdown al próximo GP
        ├── Videos.tsx       ← grid de videos recientes
        ├── Streams.tsx      ← YouTube + Kick
        ├── Fantasy.tsx      ← liga F1 Fantasy con código
        ├── Members.tsx      ← Socios del canal (3 beneficios)
        ├── Discord.tsx      ← Comunidad de Discord
        ├── CTA.tsx          ← cierre "Vamos a rodar"
        └── Footer.tsx       ← footer con socials reales
```

---

## 🚀 Setup rápido

### Opción A — Vite + React + TypeScript

```bash
npm create vite@latest formula-zeta -- --template react-ts
cd formula-zeta
npm install
```

Después:

1. Copiá la carpeta `handoff/src/` sobre `src/` del proyecto Vite (sobrescribí `App.tsx` y agregá los nuevos archivos).
2. Copiá `handoff/public/logo.png` a `public/`.
3. Reemplazá el contenido de `src/index.css` con el de este paquete.
4. En `index.html`, agregá los `<link>` de Google Fonts justo antes de `</head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Bebas+Neue&display=swap" rel="stylesheet">
```

5. `npm run dev` → debería levantar el sitio.

### Opción B — Next.js (App Router)

```bash
npx create-next-app@latest formula-zeta --typescript --app
```

Adaptaciones:
- Renombrá `App.tsx` → `app/page.tsx` y reemplazá `import` de los componentes con paths absolutos (`@/components/...`).
- Movéте `index.css` → `app/globals.css` y dejá la import en `app/layout.tsx`.
- Las `<link>` de fuentes van en `app/layout.tsx` dentro del `<head>` (o usá `next/font` con Google Fonts — más rápido).
- `logo.png` → `public/logo.png` (igual que Vite).

---

## 🎨 Sistema de diseño

Ver [`STYLEGUIDE.md`](./STYLEGUIDE.md) para el detalle completo. Resumen rápido:

- **Fondo**: paddock nocturno `#0a0908`
- **Acento**: rojo Zeta `#D9382C` (del logo)
- **3 fuentes**:
  - **Bebas Neue** → headlines, ciudades, números grandes (uppercase)
  - **Space Grotesk** → body, párrafos, navegación
  - **JetBrains Mono** → timing, códigos, captions, tags
- **Espaciado**: `48-64px` entre secciones grandes, `18-24px` entre cards
- **Bordes**: 1px solid `var(--fz-line)` — sin border-radius (estética industrial)
- **Hover en botones**: `translate(-2px, -2px)` + `box-shadow: 4px 4px 0 var(--fz-red)` (efecto offset stamp)

---

## 📦 Contenido integrado

Sacado directo de `formulazeta.carrd.co`:

| Sección | Datos reales |
|---|---|
| YouTube canal | `@formulazeta` — https://youtube.com/@formulazeta |
| YouTube Membership | UCjBSltnahL1em-O7KCEfFUQ/join |
| Kick stream | kick.com/formulazeta |
| Discord | discord.gg/qBngBWzQK |
| Instagram | @formulazeta.ok |
| Twitter | @zetazalazar |
| TikTok | /formulazeta |
| F1 Fantasy code | **P4VGMEKJ503** |
| Beneficios Socios | Reacciones en vivo · Videos exclusivos · Transmisiones solo socios |

Los thumbnails de video usan los IDs reales scrapeados del carrd (`sszp4KqnPQ8`, `c-LNBF68QHI`). Para los otros 4 hay un placeholder con rayas. Reemplazá `FZ_VIDEOS` en `data.ts` con los IDs reales actuales cuando lo conectes a la YouTube Data API.

---

## ✅ Para Claude Code: lo que tenés que hacer

1. **Revisar STYLEGUIDE.md** y respetarlo en cualquier nuevo componente.
2. **Conservar la voz argentina informal** ("sumate", "armá", "vení") — el canal es de un solo creador llamado Zeta, primera persona singular.
3. **No inventar datos de F1 oficiales** — no usar logos de equipos, FIA, Pirelli ni nombres de pilotos reales en marketing del sitio (sí podés mencionarlos en contenido del canal). El sitio es de la comunidad, no broadcast oficial.
4. **El countdown al próximo GP** está hardcodeado a Montreal 2026-06-07. Cuando lo conectes a un calendario real (e.g. Ergast / OpenF1 API), actualizá `FZ_NEXT_RACE.target` y `city/circuit/flag` en `data.ts`.
5. **Próximos features sugeridos** (no incluidos en este handoff, pero queda preparado para):
   - Conectar la grid de videos a YouTube Data API v3 (`channels.list` + `playlistItems.list`)
   - Página interna `/socios` con detalle por nivel
   - Página `/gp/[round]` con previa + crónica de cada carrera
   - Embebido de Kick widget cuando esté en vivo (CORS-friendly desde `player.kick.com`)
   - Modo claro (lo dejé planeado en los tokens pero no implementado)
6. **El paquete usa TSX pero NO depende de TypeScript estricto** — los tipos son mínimos, podés borrar las anotaciones y renombrar a `.jsx` si preferís JavaScript plano.
7. **No hay librerías externas más allá de React** — sin Tailwind, sin Framer Motion, sin shadcn. Todo en CSS plano + hooks de React. Es intencional, para que sea fácil de adaptar a cualquier stack.

---

## 🔧 Tweak: color principal

El sitio acepta cambiar el color principal vía CSS variable `--fz-red`. Se puede tweakear desde una settings page o desde el código:

```tsx
document.documentElement.style.setProperty('--fz-red', '#FACC15'); // signal yellow
```

Paletas sugeridas (ver STYLEGUIDE.md):
- `#D9382C` rojo Zeta (default)
- `#FF5247` rojo neón
- `#FACC15` signal yellow
- `#10B981` pit green
- `#3B82F6` track blue

---

## 📄 Licencia / Atribución

Diseño y código generados a medida para Formula Zeta (comunidad).
Logo: propiedad de Formula Zeta.
Fuentes: Google Fonts (SIL Open Font License).

— Fin del handoff —
