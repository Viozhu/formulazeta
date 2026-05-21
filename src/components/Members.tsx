// Socios del canal — YouTube Membership perks
import { FZ_LINKS, FZ_MEMBER_PERKS } from '../data';

export function Members() {
  return (
    <section id="socios" style={{ paddingTop: 56, paddingBottom: 56, position: 'relative', overflow: 'hidden' }}>
      <div className="fz-checker" style={{
        position: 'absolute', right: -100, top: 100, width: 360, height: 360,
      }} />
      <div className="fz-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="fz-secthead fz-reveal" style={{ marginBottom: 28 }}>
          <span className="fz-secthead-num">04</span>
          <span>SOCIOS DEL CANAL / YOUTUBE MEMBERSHIP</span>
          <span className="fz-secthead-rule" />
        </div>

        <div className="fz-members-header fz-reveal">
          <h2 className="fz-h2" style={{ flexShrink: 0 }}>
            APOYÁ EL CANAL.<br />
            <span style={{ color: 'var(--fz-red)' }}>SUMATE.</span>
          </h2>
          <div style={{ flex: 1, borderRadius: 4, overflow: 'hidden', lineHeight: 0 }}>
            <img
              src="/socios-banner.jpg"
              alt="Socios del canal Formula Zeta"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>
        </div>

        <p className="fz-reveal" style={{ fontSize: 18, lineHeight: 1.5, color: 'rgba(244,241,235,0.85)', marginBottom: 40 }}>
          La mejor forma de apoyar el trabajo del canal es sumándote a la comunidad de
          <strong style={{ color: 'var(--fz-text)' }}> MIEMBROS</strong> en YouTube.
          Los tres niveles acceden a los mismos beneficios — con sumarte ya alcanza.
        </p>

        <div className="fz-grid-3">
          {FZ_MEMBER_PERKS.map((p, i) => (
            <div
              key={p.n}
              className={`fz-card fz-card-hover fz-perk-card fz-reveal fz-reveal-d${i + 1}`}
              style={{ position: 'relative' }}
            >
              <div className="fz-perk-number">{p.n}</div>
              <div className="fz-display" style={{ fontSize: 'clamp(24px, 4vw, 32px)', marginTop: 12, lineHeight: 1 }}>
                {p.title}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, marginTop: 16, color: 'rgba(244,241,235,0.75)' }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="fz-members-cta fz-reveal" style={{
          marginTop: 40, padding: '28px 32px',
          background: 'var(--fz-surface)', border: '1px solid var(--fz-red)',
        }}>
          <div>
            <div className="fz-mono" style={{ fontSize: 10, color: 'var(--fz-red)', letterSpacing: '0.32em' }}>
              ● 3 NIVELES · MISMOS BENEFICIOS
            </div>
            <div className="fz-display" style={{ fontSize: 36, marginTop: 8 }}>
              CON SUMARTE YA ALCANZA.
            </div>
          </div>
          <a href={FZ_LINKS.youtubeJoin} className="fz-btn fz-btn-primary fz-btn-lg">
            QUIERO SER SOCIO →
          </a>
        </div>
      </div>
    </section>
  );
}
