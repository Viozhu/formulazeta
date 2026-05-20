import { useEffect, useState } from 'react';
import { type FZVideo } from './data';

const VIDEOS_URL = '/videos.json';
const CACHE_KEY  = 'fz-yt-v3';
const CACHE_TTL  = 30 * 60 * 1000; // 30 min

export function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

interface CacheEntry { ts: number; videos: FZVideo[] }

function readCache(): FZVideo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, videos }: CacheEntry = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return videos;
  } catch {
    return null;
  }
}

function writeCache(videos: FZVideo[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), videos } satisfies CacheEntry));
  } catch { /* storage quota — ignore */ }
}

async function fetchVideos(signal: AbortSignal): Promise<FZVideo[]> {
  const r = await fetch(VIDEOS_URL, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
  });
  if (!r.ok) throw new Error(`videos.json ${r.status}`);
  const videos: FZVideo[] = await r.json();
  if (!Array.isArray(videos) || videos.length === 0) throw new Error('empty');
  return videos;
}

export type YTState =
  | { status: 'loading' }
  | { status: 'ok'; videos: FZVideo[] }
  | { status: 'error' };

export function useYTVideos(): YTState {
  const [state, setState] = useState<YTState>(() => {
    const cached = readCache();
    return cached ? { status: 'ok', videos: cached } : { status: 'loading' };
  });

  useEffect(() => {
    const ctrl = new AbortController();

    fetchVideos(ctrl.signal)
      .then((videos) => {
        writeCache(videos);
        setState({ status: 'ok', videos });
      })
      .catch((e: Error) => {
        if (e.name === 'AbortError') return;
        setState((prev) => prev.status === 'ok' ? prev : { status: 'error' });
      });

    return () => ctrl.abort();
  }, []);

  return state;
}
