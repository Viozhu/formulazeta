// Two channels — YouTube + Kick split cards
import { FZ_LINKS } from '../data';

export function Streams() {
  return (
    <section id="en-vivo" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="fz-container">
        <div className="fz-secthead fz-reveal" style={{ marginBottom: 28 }}>
          <span className="fz-secthead-num">02</span>
          <span>DOS CANALES / EN VIVO TODO EL FIN DE SEMANA</span>
          <span className="fz-secthead-rule" />
        </div>

        <div className="fz-reveal" style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 56, gap: 40,
        }}>
          <h2 className="fz-h2">
            REACCIONES<br />EN <span style={{ color: 'var(--fz-red)' }}>DIRECTO.</span>
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 480, color: 'rgba(244,241,235,0.75)' }}>
            Prácticas libres, clasificaciones, sprints y carreras de F2. Te elegís
            el canal y nos vemos en el directo — comentamos jugada a jugada.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <StreamCard
            href={FZ_LINKS.youtube}
            platform="YOUTUBE"
            handle="@FORMULAZETA"
            url="youtube.com/@formulazeta"
            accentColor="#ff0000"
            ctaLabel="SUSCRIBIRME →"
            kicker="CANAL PRINCIPAL · 142K SUBS"
            description="Videos, análisis y reacciones en vivo. El home base de toda la comunidad."
            badge={null}
            preview={<YouTubePreview />}
            delay={1}
          />
          <StreamCard
            href={FZ_LINKS.kick}
            platform="STREAM"
            handle="/FORMULAZETA"
            url="kick.com/formulazeta"
            accentColor="#53fc18"
            ctaLabel="SEGUIR →"
            kicker="WATCH-ALONGS · ALTERNATIVO"
            description="Streams largos sin restricciones — clasificaciones y carreras enteras en directo."
            badge={null}
            preview={<KickPreview />}
            delay={2}
          />
        </div>
      </div>
    </section>
  );
}

interface StreamCardProps {
  href: string;
  platform: string;
  handle: string;
  url: string;
  accentColor: string;
  ctaLabel: string;
  kicker: string;
  description: string;
  badge: string | null;
  preview: React.ReactNode;
  delay: number;
}

function StreamCard({
  href, platform, handle, url, accentColor, ctaLabel, kicker, description, badge, preview, delay,
}: StreamCardProps) {
  return (
    <a
      href={href}
      className={`fz-reveal fz-reveal-d${delay}`}
      style={{
        position: 'relative', overflow: 'hidden', minHeight: 380,
        background: 'var(--fz-surface)', border: '1px solid var(--fz-line)',
        transition: 'border-color .25s, transform .25s', textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.transform = '';
      }}
    >
      <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
        {preview}
        <div style={{ position: 'absolute', top: 18, left: 18 }}>
          <span className="fz-mono" style={{
            fontSize: 11, padding: '6px 12px',
            background: 'rgba(10,9,8,0.7)', color: '#fff', letterSpacing: '0.22em',
          }}>{platform}</span>
        </div>
        {badge && (
          <div style={{ position: 'absolute', top: 18, right: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 8, height: 8, background: accentColor,
              borderRadius: '50%', animation: 'fzPulse 1.6s infinite',
            }} />
            <span className="fz-mono" style={{ fontSize: 11, color: accentColor, letterSpacing: '0.22em' }}>{badge}</span>
          </div>
        )}
      </div>
      <div style={{ padding: 28 }}>
        <div className="fz-mono" style={{
          fontSize: 10, color: 'var(--fz-muted)',
          letterSpacing: '0.22em', marginBottom: 12,
        }}>{kicker}</div>
        <div className="fz-display" style={{ fontSize: 56, lineHeight: 0.92 }}>{handle}</div>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(244,241,235,0.75)', marginTop: 16, marginBottom: 24 }}>
          {description}
        </p>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 18, borderTop: '1px solid var(--fz-line)',
        }}>
          <span className="fz-mono" style={{ fontSize: 11, color: 'var(--fz-muted)' }}>{url}</span>
          <span className="fz-mono" style={{ fontSize: 12, color: accentColor, letterSpacing: '0.22em' }}>{ctaLabel}</span>
        </div>
      </div>
    </a>
  );
}

function YouTubePreview() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, #1a0606, #0a0908)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(420px 220px at 60% 50%, rgba(255,0,0,0.22), transparent 70%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center' }}>
        <svg width="120" height="84" viewBox="0 0 120 84">
          <rect width="120" height="84" rx="20" fill="#ff0000" />
          <polygon points="48,24 48,60 80,42" fill="#fff" />
        </svg>
      </div>
    </div>
  );
}

function KickPreview() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, #06140a, #0a0908)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(420px 220px at 60% 50%, rgba(83,252,24,0.18), transparent 70%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#53fc18', color: '#0a0908', padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="fz-display" style={{ fontSize: 48, lineHeight: 0.85 }}>KICK</span>
          <span style={{ width: 10, height: 10, background: '#0a0908', borderRadius: '50%' }} />
        </div>
      </div>
    </div>
  );
}
