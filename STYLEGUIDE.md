# Formula Zeta — Style Guide v1.0

Sistema visual completo para el sitio y todas las superficies digitales del canal.

> "Una identidad arde en la pista y respira en el paddock."

---

## 01. Logo

El logotipo es la "Z" compuesta por dos planos: uno negro/oscuro arriba-izquierda y uno rojo abajo-derecha, con una barra blanca diagonal que los une. Es la marca principal y no debe deformarse.

### Clear space

Mantené alrededor del logo un espacio libre igual a **la altura de la barra diagonal** (la "Z"). Nada de elementos gráficos, texto u otra marca dentro de esa zona.

### Usos permitidos

- **Logo completo** sobre fondo paddock (`#0a0908`) — uso default
- **Logo en blanco/cremoso** sobre fondo rojo Zeta — para banners y CTAs
- **Logo monocromático negro** sobre fondo claro (`#F4F1EB`) — para press kit / impresos

### Lockup horizontal

`[logo 56px] + "Formula Zeta" (Instrument Serif, 42px) + microcopy "COMUNIDAD F1 · EST. 2019" (JetBrains Mono, 10px, color muted)`

### No hacer

- ❌ No rotar, distorsionar o cambiar las proporciones del logo
- ❌ No agregarle sombras, gradientes ni efectos
- ❌ No usar fondos ruidosos o gradientes detrás
- ❌ Tamaño mínimo: **24px** de alto en digital, **10mm** en impreso

---

## 02. Paleta de color

### Neutrales — paddock night

Estos son los colores principales del sitio. Mantené una jerarquía clara:

| Token | Hex | OKLCH | Uso |
|---|---|---|---|
| `--fz-bg` | `#0a0908` | oklch(0.15 0.005 60) | Fondo principal |
| `--fz-surface` | `#131110` | oklch(0.18 0.005 60) | Cards, secciones diferenciadas |
| `--fz-surface-2` | `#1c1916` | oklch(0.22 0.008 60) | Hover, inputs activos |
| `--fz-text` | `#f4f1eb` | oklch(0.96 0.008 80) | Texto principal, headlines |
| `--fz-muted` | `#8a847a` | oklch(0.62 0.012 80) | Captions, metadata |
| `--fz-muted-2` | `#5a544c` | oklch(0.45 0.012 80) | Texto deshabilitado |

> Saturación de blancos siempre < 0.02 (cálidos, no fríos). El sitio es "warm dark", no neutro.

### Acento — rojo Zeta

| Token | Hex | OKLCH | Uso |
|---|---|---|---|
| `--fz-red` | `#D9382C` | oklch(0.61 0.21 28) | **Primario**: CTAs, hover, momentos de alta tensión |
| `--fz-red-2` | `#FF5247` | oklch(0.68 0.22 28) | Variante hover/highlight |

**Regla de uso**: el rojo es para **acentos**, no para superficies grandes. Usalo en:
- Botones primarios
- Ticker superior
- Subrayados editoriales bajo headings
- Indicador "● EN VIVO" / "● PRÓXIMO GP"
- Stripes diagonales decorativas
- Borde-acento de cards activas
- Una palabra clave dentro de un H1 (no toda la frase)

### Acentos alternos (paletas opcionales)

Si querés rotar el color principal a otro evento o tema, usá estas opciones que comparten estructura cromática:

| Color | Hex | Mood |
|---|---|---|
| Signal Yellow | `#FACC15` | Banderas amarillas, advertencias, alerta |
| Pit Green | `#10B981` | Estado positivo, podio confirmado |
| Track Blue | `#3B82F6` | Telemetría, datos fríos |

Cambia vía CSS var `--fz-red`. El resto del sistema se adapta automáticamente.

---

## 03. Tipografía

Tres familias, tres roles bien diferenciados. **Nunca** usar una fuente fuera de este sistema.

### 3.1 — Bebas Neue (Display / Sport)

**Uso**: headlines arcade, banners, ciudades, números grandes, llamados de acción visual.
**Mood**: paddock, energía deportiva, urgencia.
**Características**: condensed, uppercase-friendly, `line-height: 0.88` para impacto.

```css
font-family: 'Bebas Neue', 'Archivo Black', sans-serif;
letter-spacing: 0.005em;
```

| Rol | Tamaño | Uso típico |
|---|---|---|
| Display XL | 240px | Hero principal ("VELOCIDAD SIN FILTRO") |
| Display L | 132px | H2 de sección ("EL CANAL.") |
| Display M | 72px | Subhead ("PRÓXIMAS SEIS CARRERAS") |
| Display S | 40px | Nombre de sección dentro de card |
| Display XS | 28px | Subtítulo card / nav brand |

### 3.2 — Space Grotesk (Sans / Body)

**Uso**: texto largo, párrafos, navegación, captions descriptivos.
**Mood**: limpio, legible, contemporáneo, no compite con Bebas.
**Pesos disponibles**: 400 / 500 / 600 / 700.

```css
font-family: 'Space Grotesk', system-ui, sans-serif;
```

| Rol | Tamaño | Line-height | Uso |
|---|---|---|---|
| Body L | 22px | 1.45 | Lead párrafo bajo hero |
| Body M | 18-19px | 1.5 | Párrafos descriptivos en secciones |
| Body S | 14-15px | 1.55 | Card descriptions, footnotes |
| Caption | 12-13px | 1.5 | Microcopy en cards |

### 3.3 — JetBrains Mono (Mono / Data)

**Uso**: timings, posiciones, tags, microcopy técnico, códigos, todo lo que sea "data".
**Mood**: telemetría, sistema, código.
**Pesos**: 400 / 500.

```css
font-family: 'JetBrains Mono', ui-monospace, monospace;
```

| Rol | Tamaño | Uso típico |
|---|---|---|
| Code XL | 38px | Código de Fantasy League (P4VGMEKJ503) |
| Code M | 16px | Timer countdown ("17D 22H 14M") |
| Tag | 10-11px | Tags de categoría ("ANÁLISIS"), section heads |
| Microcopy | 9-10px | Captions de cards, ucase metadata |

**Letter-spacing en mono uppercase**: siempre `0.22em` cuando va en uppercase (mejora legibilidad).

**Tabular numbers**: aplicá `font-variant-numeric: tabular-nums` a todo número en tabla, countdown o standing para que las columnas alineen.

### Instrument Serif (alternativo)

Si en algún momento querés un mood más editorial/magazine, hay una variante con `Instrument Serif` como display. Está usada en el styleguide visual y en Variant A del canvas, pero **no** en el sitio principal.

---

## 04. Componentes

### Botones

Tres niveles:

1. **Primary** — fondo rojo Zeta, texto blanco, hover con stamp offset
2. **Default** — fondo cremoso/blanco, texto paddock, hover con stamp offset rojo
3. **Ghost** — transparente, borde sutil, hover invertido

**Stamp offset hover**: el botón se mueve `-2px, -2px` y aparece una sombra dura `4px 4px 0 var(--fz-red)` (o el color contrastante). Esto da una sensación de stencil/sello industrial.

```css
.btn {
  padding: 18px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  transition: transform .15s, box-shadow .15s;
}
.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--fz-red);
}
```

### Tags

```html
<span class="tag">ANÁLISIS</span>
```

Mono, 10px, uppercase, `padding: 5px 10px`, fondo `var(--fz-bg)` (cuando el tag está sobre una card) o `var(--fz-red)` (cuando es el tag principal / featured).

### Cards

Fondo `var(--fz-surface)`, borde 1px solid `var(--fz-line)`. **Sin border-radius**. En hover, el borde cambia a `var(--fz-red)` y/o la card sube 3px (`translateY(-3px)`).

### Section heads

Cada sección de la home empieza con un "section head":

```
[01] · NOMBRE EN MONO UPPERCASE · ────────────────── · acción a la derecha
```

- `[01]` cuadrado 36×36 con fondo rojo, número blanco, font Bebas Neue
- Mono 12px uppercase, letter-spacing 0.22em
- Línea horizontal sutil que llena el espacio
- Opcional: link/CTA al final ("VER TODOS →")

### Elementos gráficos

- **Stripe diagonal** (rojo): `repeating-linear-gradient(-78deg, var(--fz-red) 0 12px, transparent 12px 24px)` — para fondos hero y accents
- **Checker pattern**: dos linear-gradients a 45°/-45° con `background-size: 14px 14px` — para fondos decorativos a cuadros tipo bandera de meta
- **Team bar**: barra vertical de 3-4px de ancho con color de equipo, al lado del nombre del piloto

---

## 05. Voz y tono

El canal lo conduce **una persona** (Zeta). Primera persona singular, voz argentina, informal.

### Apasionado

Hablamos como fans hablan a fans. Sin distancia profesional, sin neutralidad fingida.
> *"Hoy se rompió algo importante en Mónaco. Vamos a verlo."*

### Técnico pero claro

Profundizamos en reglamento y estrategia, pero siempre traducimos el jargon.
> *"El undercut funcionó porque la pista evolucionó dos segundos por vuelta."*

### Irreverente

Tenemos opinión. La defendemos. No fingimos imparcialidad cuando no la hay.
> *"Eso no fue una penalización justa, y lo decimos sin filtros."*

### Vos argentino

- **Sumate** > suscríbete
- **Armá** tu equipo > arma tu equipo
- **Vení** al stream > ven al stream
- **Pasame** un reel > pásame un reel
- **Charlá** con la comunidad

Evitar **regionalismos extremos** que no se entiendan fuera de Argentina. La audiencia es LATAM amplia.

---

## 06. Hacer / No hacer

### ✓ Hacer

- Combinar Bebas Neue (display) + JetBrains Mono (data) para tensión visual
- Reservar el rojo Zeta para CTAs y momentos clave, no decoración
- Padding generoso: respira como pista mojada después de la lluvia
- Datos siempre con `font-variant-numeric: tabular-nums`
- Imagen-driven: cada GP merece su foto, cada piloto su color de equipo
- Animaciones reveal-on-scroll sutiles (translateY 24px → 0, opacity 0 → 1)
- Hover states ricos en cards (border-color, transform, scale en thumb)

### ✗ No hacer

- No usar los logos oficiales de F1, FIA, Pirelli o equipos en el sitio
- No mezclar rojo Zeta con gradientes "Web3-y". Es plano, es rojo.
- No usar emojis decorativos. Banderas de país sí; emojis decorativos no.
- No textos largos sobre fondo rojo. El rojo es para momentos.
- No imitar gráficos oficiales de broadcast (timing TV) — somos comunidad, no FOM
- No usar Inter, Roboto, Arial ni system-ui como display
- No border-radius mayor a 0 en cards principales (estética industrial/stencil)

---

## 07. Animaciones

Tres tipos básicos. Todos suaves, ninguno chillón.

### 7.1 — Reveal on scroll

Cada bloque relevante (h1, h2, cards) entra con:

```css
.fz-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .9s cubic-bezier(.2,.7,.3,1),
              transform .9s cubic-bezier(.2,.7,.3,1);
}
.fz-reveal.fz-in {
  opacity: 1;
  transform: none;
}
```

Implementado vía `IntersectionObserver` con threshold 0.1 y rootMargin `-8%`. Delays opcionales en cascada: `.fz-reveal-d1` (.08s), `.fz-reveal-d2` (.16s), etc.

### 7.2 — Ticker / Marquee

Loop infinito horizontal. CSS-only, sin JS. `animation: tick 50s linear infinite`. Duplicar el contenido y `translateX(-50%)`.

### 7.3 — Pulse en indicadores live

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.4); }
}
```

Para el punto rojo de "● EN VIVO" o "● PRÓXIMO GP". 1.6s ease-in-out infinite.

---

## 08. Iconografía

- **Banderas de país**: emojis Unicode están bien (🇨🇦, 🇪🇸, 🇲🇽) — no son decorativos, son datos.
- **Iconos de redes sociales**: rectangulos cuadrados de 36×36 con las iniciales en JetBrains Mono (YT, KI, DC, IG, TW, TT). Estética stencil, sin gradientes ni logos oficiales coloreados.
- **Play icon en thumbnails**: triángulo sólido apuntando a la derecha, dentro de un parallelograma rojo con clip-path (no círculo).

---

## 09. Tokens disponibles (resumen para Claude Code)

CSS custom properties que están en `src/index.css`. Usalas siempre — no hardcodear hex.

```css
:root {
  /* Surfaces */
  --fz-bg:        #0a0908;
  --fz-surface:   #131110;
  --fz-surface-2: #1c1916;

  /* Lines */
  --fz-line:    rgba(255,255,255,0.08);
  --fz-line-2:  rgba(255,255,255,0.14);

  /* Text */
  --fz-text:    #f4f1eb;
  --fz-muted:   #8a847a;
  --fz-muted-2: #5a544c;

  /* Accent */
  --fz-red:     #d9382c;
  --fz-red-2:   #ff5247;
}
```

---

— Fin Style Guide v1.0 · Mayo 2026 —
