// Socios del canal — YouTube Membership perks
import { FZ_LINKS, FZ_MEMBER_PERKS } from '../data';

export function Members() {
  return (
    <section id="socios" style={{ paddingTop: 100, paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
      <div className="fz-checker" style={{
        position: 'absolute', right: -100, top: 100, width: 360, height: 360,
      }} />
      <div className="fz-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="fz-secthead fz-reveal" style={{ marginBottom: 28 }}>
          <span className="fz-secthead-num">04</span>
          <span>SOCIOS DEL CANAL / YOUTUBE MEMBERSHIP</span>
          <span className="fz-secthead-rule" />
        </div>

        <div className="fz-reveal" style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 56, gap: 40,
        }}>
          <h2 className="fz-h2">
            APOYÁ EL CANAL.<br />
            <span style={{ color: 'var(--fz-red)' }}>SUMATE.</span>
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 480, color: 'rgba(244,241,235,0.85)' }}>
            La mejor forma de apoyar el trabajo del canal es sumándote a la comunidad de
            <strong style={{ color: 'var(--fz-text)' }}> MIEMBROS</strong> en YouTube.
            Los tres niveles acceden a los mismos beneficios — con sumarte ya alcanza.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {FZ_MEMBER_PERKS.map((p, i) => (
            <div
              key={p.n}
              className={`fz-card fz-card-hover fz-reveal fz-reveal-d${i + 1}`}
              style={{ padding: '36px 32px', position: 'relative' }}
            >
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 88, lineHeight: 0.85, color: 'var(--fz-red)',
              }}>{p.n}</div>
              <div className="fz-display" style={{ fontSize: 32, marginTop: 18, lineHeight: 1 }}>
                {p.title}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, marginTop: 16, color: 'rgba(244,241,235,0.75)' }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="fz-reveal" style={{
          marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, padding: '28px 32px',
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
