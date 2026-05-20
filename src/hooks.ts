// Formula Zeta — shared hooks
import { useEffect, useState, type RefObject } from 'react';

export interface NextRace {
  city: string;
  circuit: string;
  flag: string;
  countryCode: string;
  round: number;
  target: Date;
}

const COUNTRY_META: Record<string, [string, string]> = {
  Australia:              ['🇦🇺', 'AUS'],
  Bahrain:                ['🇧🇭', 'BRN'],
  'Saudi Arabia':         ['🇸🇦', 'KSA'],
  Japan:                  ['🇯🇵', 'JPN'],
  China:                  ['🇨🇳', 'CHN'],
  'United States':        ['🇺🇸', 'USA'],
  Italy:                  ['🇮🇹', 'ITA'],
  Monaco:                 ['🇲🇨', 'MON'],
  Canada:                 ['🇨🇦', 'CAN'],
  Spain:                  ['🇪🇸', 'ESP'],
  Austria:                ['🇦🇹', 'AUT'],
  'United Kingdom':       ['🇬🇧', 'GBR'],
  Hungary:                ['🇭🇺', 'HUN'],
  Belgium:                ['🇧🇪', 'BEL'],
  Netherlands:            ['🇳🇱', 'NED'],
  Singapore:              ['🇸🇬', 'SGP'],
  Azerbaijan:             ['🇦🇿', 'AZE'],
  Mexico:                 ['🇲🇽', 'MEX'],
  Brazil:                 ['🇧🇷', 'BRA'],
  'United Arab Emirates': ['🇦🇪', 'UAE'],
  Qatar:                  ['🇶🇦', 'QAT'],
};

/** Fetches next F1 race from Jolpica (Ergast successor). Falls back to `fallback` on error. */
export function useNextRace(fallback: NextRace): { race: NextRace; loading: boolean } {
  const [race, setRace] = useState<NextRace | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch('https://api.jolpi.ca/ergast/f1/current/next.json', { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then((data) => {
        const r = data?.MRData?.RaceTable?.Races?.[0];
        if (!r) return;
        const country: string = r.Circuit?.Location?.country ?? '';
        const [flag, countryCode] = COUNTRY_META[country] ?? ['🏁', country.slice(0, 3).toUpperCase()];
        setRace({
          city: (r.Circuit?.Location?.locality ?? '').toUpperCase(),
          circuit: r.Circuit?.circuitName ?? '',
          flag,
          countryCode,
          round: parseInt(r.round ?? '0', 10),
          target: new Date(`${r.date}T${r.time ?? '15:00:00Z'}`),
        });
      })
      .catch((e: Error) => { if (e.name !== 'AbortError') console.warn('next race:', e.message); });

    return () => ctrl.abort();
  }, []);

  return { race: race ?? fallback, loading: race === null };
}

/** Live countdown — recomputes every second. */
export function useCountdown(target: Date) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
}

/** Adds `.fz-in` to any `.fz-reveal` element inside `rootRef` once it scrolls into view.
 *  MutationObserver also picks up elements added dynamically (e.g. async video cards). */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('fz-in'); });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    );

    const watchEl = (el: HTMLElement) => {
      if (!el.classList.contains('fz-in')) io.observe(el);
    };

    root.querySelectorAll<HTMLElement>('.fz-reveal').forEach(watchEl);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.classList.contains('fz-reveal')) watchEl(el);
          el.querySelectorAll<HTMLElement>('.fz-reveal').forEach(watchEl);
        });
      });
    });

    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [rootRef]);
}

/** Zero-pad a number to 2 chars. */
export const pad2 = (n: number) => String(n).padStart(2, '0');
