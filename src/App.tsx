// Formula Zeta — root component
//
// Drop this directly into a Vite React project (replaces src/App.tsx) or
// adapt for Next.js (move to app/page.tsx and remove the import line for
// index.css — instead import it from app/layout.tsx).

import { useRef } from 'react';
import { FZ_NEXT_RACE } from './data';
import { useCountdown, useReveal, useNextRace } from './hooks';

import { Ticker }   from './components/Ticker';
import { Nav }      from './components/Nav';
import { Hero }     from './components/Hero';
import { Videos }   from './components/Videos';
import { Streams }  from './components/Streams';
import { Fantasy }  from './components/Fantasy';
import { Members }  from './components/Members';
import { Discord }  from './components/Discord';
import { CTA }      from './components/CTA';
import { Footer }   from './components/Footer';

import './index.css';

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  const { race, loading: raceLoading } = useNextRace(FZ_NEXT_RACE);
  const countdown = useCountdown(race.target);

  return (
    <div ref={rootRef} className="fz-root" style={{ minHeight: '100vh' }}>
      <Ticker countdown={countdown} race={race} raceLoading={raceLoading} />
      <Nav />
      <Hero countdown={countdown} race={race} raceLoading={raceLoading} />
      <Videos />
      <Streams />
      <Fantasy />
      <Members />
      <Discord />
      <CTA />
      <Footer />
    </div>
  );
}
