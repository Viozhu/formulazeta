// CTA — final call to action before footer
import { FZ_LINKS } from '../data';

export function CTA() {
  return (
    <section style={{ padding: '70px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(800px 400px at 50% 50%, rgba(217,56,44,0.18), transparent 60%)',
      }} />
      <div className="fz-container" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="fz-secthead fz-reveal" style={{ justifyContent: 'center', marginBottom: 18 }}>
          <span style={{ color: 'var(--fz-red)' }}>● HASTA LA PRÓXIMA VUELTA</span>
        </div>
        <h2 className="fz-h1 fz-reveal">
          <span style={{ display: 'block' }}>VAMOS A</span>
          <span style={{ display: 'block', color: 'var(--fz-red)' }}>RODAR.</span>
        </h2>
        <div className="fz-cta-btns fz-reveal fz-reveal-d2">
          <a href={FZ_LINKS.youtube}     className="fz-btn fz-btn-primary fz-btn-lg">▶ IR AL CANAL</a>
          <a href={FZ_LINKS.youtubeJoin} className="fz-btn fz-btn-ghost   fz-btn-lg">SER SOCIO</a>
          <a href={FZ_LINKS.discord}     className="fz-btn fz-btn-ghost   fz-btn-lg">DISCORD</a>
        </div>
      </div>
    </section>
  );
}
