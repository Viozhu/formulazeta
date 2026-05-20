// Formula Zeta — content + types
// Data scraped from formulazeta.carrd.co (May 2026)

export interface FZVideo {
  id: string;
  thumb?: string; // optional real thumbnail URL
  title: string;
  duration: string;
  views: string;
  age: string;
  tag: string;
  hue: number; // for placeholder striped thumb
}

export interface FZMemberPerk {
  n: string;
  title: string;
  body: string;
}

// ─── Channel links (real) ─────────────────────────────────────
export const FZ_LINKS = {
  youtube: "https://youtube.com/@formulazeta",
  youtubeJoin: "https://www.youtube.com/channel/UCjBSltnahL1em-O7KCEfFUQ/join",
  kick: "https://kick.com/formulazeta",
  discord: "https://discord.gg/qBngBWzQK",
  twitter: "https://twitter.com/zetazalazar",
  instagram: "https://instagram.com/formulazeta.ok",
  tiktok: "https://tiktok.com/@formulazeta",
  fantasy: "https://fantasy.formula1.com/",
  email: "contacto.formulazeta@gmail.com",
};

// ─── F1 Fantasy league code ──────────────────────────────────
export const FZ_FANTASY_CODE = "P4VGMEKJ503";

// ─── Member perks (from carrd) ────────────────────────────────
export const FZ_MEMBER_PERKS: FZMemberPerk[] = [
  {
    n: "01",
    title: "REACCIONES EN VIVO",
    body: "Mirá conmigo prácticas libres, clasificaciones, sprints y carreras de F2. Reaccionamos juntos, comentamos jugada a jugada.",
  },
  {
    n: "02",
    title: "VIDEOS EXCLUSIVOS",
    body: "Análisis profundos, contenido extra y reviews que no van al canal público. Solo para socios.",
  },
  {
    n: "03",
    title: "TRANSMISIONES SOLO SOCIOS",
    body: "Streams privados en YouTube con la comunidad más cercana. Charlamos sin filtros sobre el deporte.",
  },
];

// ─── Latest videos (first 2 are real YT IDs from carrd, rest are placeholders) ──
// TODO: cuando se conecte a YouTube Data API, reemplazar este array con la respuesta
// de channels.list / playlistItems.list para el canal @formulazeta.
export const FZ_VIDEOS: FZVideo[] = [
  {
    id: "sszp4KqnPQ8",
    thumb: "https://i.ytimg.com/vi_webp/sszp4KqnPQ8/maxresdefault.webp",
    title: "Análisis del fin de semana — todo lo que pasó en el GP",
    duration: "18:42",
    views: "128K",
    age: "hace 2 días",
    tag: "ANÁLISIS",
    hue: 358,
  },
  {
    id: "c-LNBF68QHI",
    thumb: "https://i.ytimg.com/vi_webp/c-LNBF68QHI/maxresdefault.webp",
    title: "Reacción en vivo: clasificación y prácticas libres",
    duration: "2:14:08",
    views: "94K",
    age: "hace 4 días",
    tag: "EN VIVO",
    hue: 28,
  },
  {
    id: "v3",
    title: "Reglamento 2026 explicado en 10 minutos",
    duration: "10:41",
    views: "212K",
    age: "hace 1 semana",
    tag: "EXPLAINER",
    hue: 200,
  },
  {
    id: "v4",
    title: "Compilado de adelantos de Colapinto esta temporada",
    duration: "06:55",
    views: "187K",
    age: "hace 1 semana",
    tag: "COMPILADO",
    hue: 200,
  },
  {
    id: "v5",
    title: "Crónica completa del último Gran Premio",
    duration: "24:33",
    views: "156K",
    age: "hace 2 semanas",
    tag: "CRÓNICA",
    hue: 358,
  },
  {
    id: "v6",
    title: "F1 Fantasy: cómo armar tu equipo perfecto",
    duration: "12:17",
    views: "88K",
    age: "hace 2 semanas",
    tag: "FANTASY",
    hue: 50,
  },
];

// ─── Next race countdown target ───────────────────────────────
// TODO: conectar a Ergast / OpenF1 API y derivar dinámicamente
export const FZ_NEXT_RACE = {
  city: "MONTREAL",
  circuit: "Circuit Gilles Villeneuve",
  flag: "🇨🇦",
  countryCode: "CAN",
  round: 9,
  target: new Date("2026-06-07T18:00:00Z"),
};

// ─── Discord channels (cosmetic — for the Discord card preview) ──
export const FZ_DISCORD_CHANNELS: [string, string][] = [
  ["#general", "Charla libre sobre F1, F2, F3 y karting"],
  ["#análisis", "Discusiones técnicas sobre cada GP"],
  ["#memes", "Lo mejor del paddock del fin de semana"],
  ["#f1-fantasy", "Alertas y estrategia para la liga"],
  ["#sugerencias", "Ideas para próximos videos del canal"],
];

// ─── Stats (manually updated — replace with YT Data API later) ──
export const FZ_STATS: [string, string][] = [
  ["142K", "SUBS"],
  ["3.2M", "VIEWS"],
  ["218", "VIDEOS"],
  ["7", "AÑOS"],
];
