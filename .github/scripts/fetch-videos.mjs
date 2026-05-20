#!/usr/bin/env node
// Scrapes @formulazeta/videos and writes public/videos.json
// Runs inside GitHub Actions — no API key needed

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const CHANNEL_URL = 'https://www.youtube.com/@formulazeta/videos';
const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), '../../public/videos.json');
const HUE_CYCLE = [358, 28, 200, 200, 358, 50];

function guessTag(title) {
  const t = title.toLowerCase();
  if (/en vivo|directo|live/.test(t))   return 'EN VIVO';
  if (/reacci[oó]n/.test(t))            return 'REACCIÓN';
  if (/an[áa]lisis/.test(t))            return 'ANÁLISIS';
  if (/cr[oó]nica/.test(t))             return 'CRÓNICA';
  if (/fantasy/.test(t))                return 'FANTASY';
  if (/explica|minutos/.test(t))        return 'EXPLAINER';
  if (/compilado/.test(t))              return 'COMPILADO';
  return 'VIDEO';
}

function extractYtInitialData(html) {
  const marker = 'var ytInitialData = ';
  const start = html.indexOf(marker);
  if (start === -1) throw new Error('ytInitialData not found');

  let depth = 0, inStr = false, strChar = '', end = -1;
  const jsonStart = start + marker.length;

  for (let i = jsonStart; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === strChar) inStr = false;
    } else {
      if (c === '"' || c === "'") { inStr = true; strChar = c; }
      else if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
    }
  }

  if (end === -1) throw new Error('Could not find end of ytInitialData JSON');
  return JSON.parse(html.substring(jsonStart, end));
}

async function main() {
  const res = await fetch(CHANNEL_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const data = extractYtInitialData(html);

  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const videosTab = tabs.find(t => t?.tabRenderer?.content?.richGridRenderer);
  const contents = videosTab?.tabRenderer?.content?.richGridRenderer?.contents || [];

  const videos = [];
  for (const item of contents) {
    if (videos.length >= 6) break;
    const lv = item?.richItemRenderer?.content?.lockupViewModel;
    if (!lv) continue;

    const sources = lv?.contentImage?.thumbnailViewModel?.image?.sources || [];
    const idMatch = (sources[0]?.url || '').match(/\/vi\/([^/]+)\//);
    const id = idMatch?.[1];
    if (!id) continue;

    const title = lv?.metadata?.lockupMetadataViewModel?.title?.content || '';
    const metaParts = (lv?.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows || [])
      .flatMap(r => (r?.metadataParts || []).map(p => p?.text?.content || ''));

    const views = metaParts.find(p => /vista|view/i.test(p)) || '';
    const age   = metaParts.find(p => /hace|hora|día|semana|mes|año|hour|day|week|month/i.test(p)) || '';

    videos.push({
      id,
      title,
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      views,
      age,
      tag: guessTag(title),
      duration: '—',
      hue: HUE_CYCLE[videos.length] ?? 200,
    });
  }

  if (videos.length === 0) throw new Error('No videos extracted — page structure may have changed');

  writeFileSync(OUT_PATH, JSON.stringify(videos, null, 2));
  console.log(`✓ Wrote ${videos.length} videos to public/videos.json`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
