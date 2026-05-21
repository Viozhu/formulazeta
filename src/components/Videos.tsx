import { FZ_LINKS, FZ_VIDEOS, type FZVideo } from '../data';
import { useYTVideos } from '../yt';

export function Videos() {
  const yt = useYTVideos();
  const videos = yt.status === 'ok' ? yt.videos : FZ_VIDEOS;
  const loading = yt.status === 'loading';

  return (
    <section id="videos" style={{
      paddingTop: 52, paddingBottom: 60,
      background: 'var(--fz-surface)',
      borderTop: '1px solid var(--fz-line)',
      borderBottom: '1px solid var(--fz-line)',
    }}>
      <div className="fz-container">
        <div className="fz-secthead fz-reveal" style={{ marginBottom: 18 }}>
          <span className="fz-secthead-num">01</span>
          <span>VIDEOS / @FORMULAZETA</span>
          <span className="fz-secthead-rule" />
          <a href={FZ_LINKS.youtube} className="fz-mono" style={{ color: 'var(--fz-text)', whiteSpace: 'nowrap' }}>VER TODOS →</a>
        </div>

        <h2 className="fz-h2 fz-reveal" style={{ marginBottom: 28 }}>EL CANAL.</h2>

        {loading ? (
          <VideoSkeleton />
        ) : (
          <>
            <div className="fz-videos-lg">
              {videos.slice(0, 2).map((v, i) => <VideoCardLarge key={v.id} v={v} delay={i + 1} />)}
            </div>
            <div className="fz-videos-sm">
              {videos.slice(2, 6).map((v, i) => <VideoCardSmall key={v.id} v={v} delay={i + 1} />)}
            </div>
          </>
        )}

        <a href={FZ_LINKS.youtube} className="fz-videos-cta fz-mono fz-reveal">
          VER TODOS LOS VIDEOS →
        </a>
      </div>
    </section>
  );
}

function VideoSkeleton() {
  return (
    <>
      <div className="fz-videos-lg">
        {[0, 1].map((i) => (
          <div key={i} className="fz-card">
            <div className="fz-video-thumb-lg" style={{ background: 'var(--fz-surface-2)', animation: 'fzPulse 1.8s ease-in-out infinite' }} />
            <div style={{ padding: '14px 4px', height: 28, background: 'var(--fz-surface-2)', margin: '0 4px', opacity: 0.5 }} />
          </div>
        ))}
      </div>
      <div className="fz-videos-sm">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="fz-card">
            <div className="fz-video-thumb-sm" style={{ background: 'var(--fz-surface-2)', animation: 'fzPulse 1.8s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
            <div style={{ padding: '10px 12px', height: 36, background: 'var(--fz-surface-2)', margin: '0 12px', opacity: 0.4 }} />
          </div>
        ))}
      </div>
    </>
  );
}

function VideoCardLarge({ v, delay }: { v: FZVideo; delay: number }) {
  return (
    <a
      href={`https://youtube.com/watch?v=${v.id}`}
      className={`fz-card fz-card-hover fz-reveal fz-reveal-d${delay}`}
      style={{ display: 'block', position: 'relative' }}
    >
      <div className="fz-video-thumb-lg" style={{ position: 'relative', overflow: 'hidden', background: 'var(--fz-surface-2)' }}>
        <VideoThumb v={v} />
        <PlayArc />
        <div style={{ position: 'absolute', left: 14, top: 14, zIndex: 2 }}>
          <span className="fz-tag">{v.tag}</span>
        </div>
        <Duration value={v.duration} />
      </div>
      {/* fz-video-lg-meta: column on mobile, row on desktop */}
      <div className="fz-video-lg-meta">
        <h3 className="fz-display fz-video-title-lg">{v.title.toUpperCase()}</h3>
        <div className="fz-mono" style={{ fontSize: 10, color: 'var(--fz-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <div>{v.views} VIEWS</div>
          <div style={{ marginTop: 4 }}>{v.age.toUpperCase()}</div>
        </div>
      </div>
    </a>
  );
}

function VideoCardSmall({ v, delay }: { v: FZVideo; delay: number }) {
  return (
    <a
      href={`https://youtube.com/watch?v=${v.id}`}
      className={`fz-card fz-card-hover fz-reveal fz-reveal-d${delay}`}
      style={{ display: 'block' }}
    >
      <div className="fz-video-thumb-sm" style={{ position: 'relative', overflow: 'hidden', background: 'var(--fz-surface-2)' }}>
        <VideoThumb v={v} small />
        <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 2 }}>
          <span className="fz-tag" style={{ fontSize: 9, padding: '3px 8px' }}>{v.tag}</span>
        </div>
        <Duration value={v.duration} small />
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <h4 className="fz-display fz-video-title-sm">{v.title.toUpperCase()}</h4>
        <div className="fz-mono" style={{ fontSize: 9, color: 'var(--fz-muted)', marginTop: 6, display: 'flex', gap: 6 }}>
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
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
    );
  }
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: `repeating-linear-gradient(90deg, oklch(0.30 0.06 ${v.hue}) 0 24px, oklch(0.26 0.06 ${v.hue}) 24px 48px), oklch(0.32 0.08 ${v.hue})`,
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
      width: 56, height: 56, background: 'var(--fz-red)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
    }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M4 3l11 6-11 6V3z"/></svg>
    </div>
  );
}

function Duration({ value, small = false }: { value: string; small?: boolean }) {
  return (
    <span className="fz-mono" style={{
      position: 'absolute', right: 10, bottom: 10, zIndex: 2,
      background: 'rgba(10,9,8,0.9)', color: '#fff',
      padding: small ? '2px 5px' : '4px 8px',
      fontSize: small ? 9 : 11,
    }}>
      {value}
    </span>
  );
}
