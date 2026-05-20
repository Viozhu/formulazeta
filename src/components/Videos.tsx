import { FZ_LINKS, FZ_VIDEOS, type FZVideo } from '../data';
import { useYTVideos } from '../yt';

export function Videos() {
  const yt = useYTVideos();
  const videos = yt.status === 'ok' ? yt.videos : FZ_VIDEOS;
  const loading = yt.status === 'loading';

  return (
    <section id="videos" style={{
      paddingTop: 80, paddingBottom: 100,
      background: 'var(--fz-surface)',
      borderTop: '1px solid var(--fz-line)',
      borderBottom: '1px solid var(--fz-line)',
    }}>
      <div className="fz-container">
        <div className="fz-secthead fz-reveal" style={{ marginBottom: 28 }}>
          <span className="fz-secthead-num">01</span>
          <span>VIDEOS RECIENTES / YT @FORMULAZETA</span>
          <span className="fz-secthead-rule" />
          <a href={FZ_LINKS.youtube} className="fz-mono" style={{ color: 'var(--fz-text)' }}>VER TODOS →</a>
        </div>

        <h2 className="fz-h2 fz-reveal" style={{ marginBottom: 56 }}>EL CANAL.</h2>

        {loading ? (
          <VideoSkeleton />
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              {videos.slice(0, 2).map((v, i) => <VideoCardLarge key={v.id} v={v} delay={i + 1} />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
              {videos.slice(2, 6).map((v, i) => <VideoCardSmall key={v.id} v={v} delay={i + 1} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function VideoSkeleton() {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {[0, 1].map((i) => (
          <div key={i} className="fz-card" style={{ height: 420 }}>
            <div style={{ height: 360, background: 'var(--fz-surface-2)', animation: 'fzPulse 1.8s ease-in-out infinite' }} />
            <div style={{ padding: '18px 4px', height: 30, background: 'var(--fz-surface-2)', margin: '0 4px', opacity: 0.5 }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="fz-card" style={{ height: 230 }}>
            <div style={{ height: 170, background: 'var(--fz-surface-2)', animation: 'fzPulse 1.8s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
            <div style={{ padding: '14px 12px', height: 40, background: 'var(--fz-surface-2)', margin: '0 12px', opacity: 0.4 }} />
          </div>
        ))}
      </div>
    </>
  );
}

function VideoCardLarge({ v, delay }: { v: FZVideo; delay: number }) {
  return (
    <a href={`https://youtube.com/watch?v=${v.id}`} className={`fz-card fz-card-hover fz-reveal fz-reveal-d${delay}`} style={{ display: 'block', position: 'relative' }}>
      <div style={{ position: 'relative', height: 360, overflow: 'hidden', background: 'var(--fz-surface-2)' }}>
        <VideoThumb v={v} />
        <PlayArc />
        <div style={{ position: 'absolute', left: 14, top: 14, zIndex: 2 }}>
          <span className="fz-tag">{v.tag}</span>
        </div>
        <Duration value={v.duration} />
      </div>
      <div style={{ padding: '18px 4px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
        <h3 className="fz-display" style={{ fontSize: 36, lineHeight: 1, maxWidth: 520 }}>
          {v.title.toUpperCase()}
        </h3>
        <div className="fz-mono" style={{ fontSize: 11, color: 'var(--fz-muted)', textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <div>{v.views} VIEWS</div>
          <div style={{ marginTop: 4 }}>{v.age.toUpperCase()}</div>
        </div>
      </div>
    </a>
  );
}

function VideoCardSmall({ v, delay }: { v: FZVideo; delay: number }) {
  return (
    <a href={`https://youtube.com/watch?v=${v.id}`} className={`fz-card fz-card-hover fz-reveal fz-reveal-d${delay}`} style={{ display: 'block' }}>
      <div style={{ position: 'relative', height: 170, overflow: 'hidden', background: 'var(--fz-surface-2)' }}>
        <VideoThumb v={v} small />
        <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 2 }}>
          <span className="fz-tag" style={{ fontSize: 9, padding: '3px 8px' }}>{v.tag}</span>
        </div>
        <Duration value={v.duration} small />
      </div>
      <div style={{ padding: '14px 12px 14px' }}>
        <h4 className="fz-display" style={{ fontSize: 24, lineHeight: 1 }}>{v.title.toUpperCase()}</h4>
        <div className="fz-mono" style={{ fontSize: 10, color: 'var(--fz-muted)', marginTop: 8, display: 'flex', gap: 8 }}>
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
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          // maxresdefault doesn't exist for all videos → fall back to hqdefault
          if (img.src.includes('maxresdefault')) {
            img.src = img.src.replace('maxresdefault', 'hqdefault');
          } else {
            img.style.display = 'none';
          }
        }}
      />
    );
  }
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: `
        repeating-linear-gradient(90deg, oklch(0.30 0.06 ${v.hue}) 0 24px, oklch(0.26 0.06 ${v.hue}) 24px 48px),
        oklch(0.32 0.08 ${v.hue})
      `,
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
      width: 70, height: 70, background: 'var(--fz-red)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
      clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
    }}>
      <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor"><path d="M4 3l11 6-11 6V3z"/></svg>
    </div>
  );
}

function Duration({ value, small = false }: { value: string; small?: boolean }) {
  return (
    <span className="fz-mono" style={{
      position: 'absolute', right: 12, bottom: 12, zIndex: 2,
      background: 'rgba(10,9,8,0.9)', color: '#fff',
      padding: small ? '3px 6px' : '4px 8px',
      fontSize: small ? 10 : 11,
    }}>
      {value}
    </span>
  );
}
