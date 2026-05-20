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
    : `R${round} ${race.city} · ${pad2(countdown.d)}D ${pad2(countdown.h)}H ${pad2(countdown.m)}M`;
  const items = [
    'NUEVO VIDEO: ANÁLISIS DEL FIN DE SEMANA',
    'EN VIVO PRONTO EN KICK · KICK.COM/FORMULAZETA',
    `F1 FANTASY LEAGUE · CÓDIGO ${FZ_FANTASY_CODE}`,
    ...(raceItem ? [raceItem] : []),
    'SUMATE A LA COMUNIDAD DE DISCORD',
  ];
  return (
    <div style={{
      background: 'var(--fz-red)', color: '#fff', overflow: 'hidden',
      height: 36, display: 'flex', alignItems: 'center',
      borderBottom: '1px solid rgba(0,0,0,0.2)',
    }}>
      <div style={{
        display: 'flex', gap: 56,
        animation: 'fzTick 50s linear infinite',
        willChange: 'transform', whiteSpace: 'nowrap',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
        letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
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
