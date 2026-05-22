/* global React, Sarge */
/* Design tokens artboard — colors, type, motifs, components reference */

function TokensArtboard() {
  return (
    <div style={{ background: '#0B0B0D', color: '#F4F4F5', padding: '64px 56px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="mil-label" style={{ marginBottom: 14 }}>DESIGN SYSTEM · STS-716 · v0.1</div>
          <h1 className="display" style={{ fontSize: 72, margin: 0, color: '#F4F4F5' }}>
            TACTICAL<br/><span style={{ color: '#FFD200' }}>PREMIUM</span> SYSTEM
          </h1>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9AA0A6', letterSpacing: '0.16em', textAlign: 'right', lineHeight: 1.7 }}>
          ASPHALT BLACK + SAFETY YELLOW<br/>
          BUFFALO, NY · WNY OPS
        </div>
      </div>

      {/* COLORS */}
      <section style={{ marginBottom: 64 }}>
        <SectionLabel num="01" title="COLOR SYSTEM" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          <Swatch name="ASPHALT 0" hex="#0B0B0D" bg="#0B0B0D" role="Base / page" />
          <Swatch name="ASPHALT 1" hex="#141417" bg="#141417" role="Card surface" />
          <Swatch name="ASPHALT 2" hex="#1C1C20" bg="#1C1C20" role="Raised" />
          <Swatch name="ASPHALT 3" hex="#26262B" bg="#26262B" role="Hairline" />
          <Swatch name="ASPHALT 4" hex="#34343A" bg="#34343A" role="Border" />
          <Swatch name="SAFETY YELLOW" hex="#FFD200" bg="#FFD200" role="Primary accent · CTA · highlight" big light />
          <Swatch name="YELLOW DEEP" hex="#E5BC00" bg="#E5BC00" role="Hover" light />
          <Swatch name="ROAD WHITE" hex="#F4F4F5" bg="#F4F4F5" role="Body text" light />
          <Swatch name="CONCRETE 1" hex="#6B7076" bg="#6B7076" role="Mid gray" />
          <Swatch name="CONCRETE 2" hex="#9AA0A6" bg="#9AA0A6" role="Light gray" light />
          <Swatch name="HI-VIS GREEN" hex="#C8FF00" bg="#C8FF00" role="RARE · fresh-seal glow only" light />
          <Swatch name="HAZARD RED" hex="#FF3D2E" bg="#FF3D2E" role="Danger / 'before' state" />
        </div>
      </section>

      {/* TYPE */}
      <section style={{ marginBottom: 64 }}>
        <SectionLabel num="02" title="TYPOGRAPHY" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 24 }}>
          <TypeCard
            family="OSWALD"
            role="Display · Headlines · Industrial condensed"
            sampleStyle={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 80, lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#F4F4F5' }}
            sample="LOCK IT DOWN."
            scale={[
              ['H1 / 124', 124], ['H2 / 84', 84], ['H3 / 32', 32], ['LABEL / 17', 17],
            ]}
          />
          <TypeCard
            family="INTER"
            role="Body · UI · clean grotesk"
            sampleStyle={{ fontFamily: 'Inter, sans-serif', fontSize: 22, lineHeight: 1.45, color: '#F4F4F5' }}
            sample="Buffalo's driveways, locked down. Premium sealcoating and razor-sharp striping."
            scale={[
              ['LG / 20', 20], ['MD / 16', 16], ['SM / 14', 14], ['XS / 13', 13],
            ]}
          />
          <TypeCard
            family="JETBRAINS MONO"
            role="Labels · Stencil-style microcopy"
            sampleStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FFD200' }}
            sample="STS-716 · LOCKED DOWN"
            scale={[
              ['M / 13', 13], ['S / 11', 11], ['XS / 10', 10], ['XXS / 9', 9],
            ]}
          />
        </div>
      </section>

      {/* MOTIFS */}
      <section style={{ marginBottom: 64 }}>
        <SectionLabel num="03" title="MOTIFS & TEXTURE" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <MotifCard label="ASPHALT GRAIN">
            <div className="asphalt-grain" style={{ width: '100%', height: 140 }} />
          </MotifCard>
          <MotifCard label="HAZARD STRIPE">
            <div className="hazard" style={{ width: '100%', height: 140 }} />
          </MotifCard>
          <MotifCard label="ROAD-LINE DASHES">
            <div style={{ width: '100%', height: 140, background: '#141417', position: 'relative' }}>
              <div className="road-divider" style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)' }} />
            </div>
          </MotifCard>
          <MotifCard label="HUD GRID">
            <div style={{ width: '100%', height: 140, background: '#141417', position: 'relative' }}>
              <div className="hud-grid" style={{ mask: 'none' }} />
            </div>
          </MotifCard>
          <MotifCard label="STENCIL ARROW">
            <div style={{ width: '100%', height: 140, background: '#141417', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="stencil-arrow" style={{ width: 96, height: 28 }} />
            </div>
          </MotifCard>
          <MotifCard label="RETICLE / BRACKETS">
            <div style={{ width: '100%', height: 140, background: '#141417', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="#FFD200" strokeWidth="1" fill="none" strokeDasharray="2 4" />
                <circle cx="60" cy="60" r="32" stroke="#FFD200" strokeWidth="1" fill="none" />
                <line x1="60" y1="0" x2="60" y2="24" stroke="#FFD200" strokeWidth="1" />
                <line x1="60" y1="96" x2="60" y2="120" stroke="#FFD200" strokeWidth="1" />
                <line x1="0" y1="60" x2="24" y2="60" stroke="#FFD200" strokeWidth="1" />
                <line x1="96" y1="60" x2="120" y2="60" stroke="#FFD200" strokeWidth="1" />
                <circle cx="60" cy="60" r="3" fill="#FFD200" />
              </svg>
            </div>
          </MotifCard>
          <MotifCard label="FRESH-SEAL GLOW">
            <div style={{ width: '100%', height: 140, background: '#141417', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '80%', height: 1, background: '#C8FF00', boxShadow: '0 0 14px #C8FF00, 0 0 28px rgba(200,255,0,0.5)' }} />
            </div>
          </MotifCard>
          <MotifCard label="CORNER BRACKETS">
            <div style={{ width: '100%', height: 140, background: '#141417', padding: 28 }}>
              <div className="brackets" style={{ width: '100%', height: '100%' }}>
                <span className="br-tr" /><span className="br-br" />
              </div>
            </div>
          </MotifCard>
        </div>
      </section>

      {/* COMPONENTS */}
      <section style={{ marginBottom: 64 }}>
        <SectionLabel num="04" title="COMPONENTS" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {/* Buttons */}
          <div style={{ background: '#141417', padding: 28, border: '1px solid #26262B' }}>
            <div className="mil-label-white" style={{ marginBottom: 16 }}>BUTTONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <button className="btn btn-primary">FREE ESTIMATE <span className="arrow-r" /></button>
              <button className="btn btn-ghost">SEE OUR WORK</button>
              <button className="btn" style={{ background: 'transparent', color: '#FFD200', border: '1.5px solid #FFD200', clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                CALL NOW
              </button>
            </div>
          </div>

          {/* Labels & tags */}
          <div style={{ background: '#141417', padding: 28, border: '1px solid #26262B' }}>
            <div className="mil-label-white" style={{ marginBottom: 16 }}>LABELS & TAGS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
              <span className="mil-label">STS-716 · LOCKED DOWN</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#0B0B0D', background: '#FFD200', padding: '4px 10px', letterSpacing: '0.18em' }}>FEATURED</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#C8FF00', letterSpacing: '0.18em' }}>● ONLINE</span>
              <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: 13, color: '#FF3D2E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>▲ BEFORE</span>
              <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: 13, color: '#FFD200', letterSpacing: '0.06em', textTransform: 'uppercase' }}>★ MISSION COMPLETE</span>
            </div>
          </div>

          {/* Logo lockup */}
          <div style={{ background: '#141417', padding: 28, border: '1px solid #26262B' }}>
            <div className="mil-label-white" style={{ marginBottom: 16 }}>LOGO LOCKUP</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#0B0B0D', border: '1.5px solid #FFD200',
                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
              }}>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 19, color: '#FFD200', marginTop: -4 }}>STS</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22, color: '#F4F4F5', letterSpacing: '0.04em' }}>SEAL TEAM SIX</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.28em', marginTop: 4 }}>SEALCOATING · STRIPING</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SARGE */}
      <section>
        <SectionLabel num="05" title="MASCOT · SARGE THE SEAL" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 16 }}>
          <div style={{ background: '#141417', padding: 28, border: '1px solid #26262B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Sarge size={180} />
            <div className="mil-label-white" style={{ marginTop: 18 }}>FULL PORTRAIT</div>
          </div>
          <div style={{ background: '#141417', padding: 28, border: '1px solid #26262B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%', background: '#0B0B0D',
              border: '3px solid #FFD200',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden',
            }}>
              <div style={{ transform: 'translateY(10px) scale(1.05)' }}><Sarge size={110} /></div>
            </div>
            <div className="mil-label-white">AVATAR · CIRCULAR</div>
          </div>
          <div style={{ background: '#141417', padding: 28, border: '1px solid #26262B' }}>
            <div className="mil-label-white" style={{ marginBottom: 12 }}>PERSONA</div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.55, color: '#BFC4C9' }}>
              Sarge is a harbor seal in tactical gear — hi-vis vest, hard hat, sealcoat wand. He's the squad leader who collects intel for free estimates. Tone: <span style={{ color: '#F4F4F5', fontWeight: 600 }}>no-nonsense but warm, brief, encouraging, light tactical flavor.</span>
            </p>
            <div style={{ marginTop: 18, padding: '12px 14px', background: '#26262B', borderLeft: '2px solid #FFD200' }}>
              <div className="mil-label-white" style={{ marginBottom: 4 }}>EXAMPLE GREETING</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F4F4F5', fontStyle: 'italic' }}>
                "Sarge here, Seal Team Six. I'll get your free estimate locked in — takes about 30 seconds."
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ num, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#FFD200', letterSpacing: '0.22em', background: '#141417', padding: '4px 10px', border: '1px solid #34343A' }}>
        {num}
      </span>
      <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22, color: '#F4F4F5', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {title}
      </div>
      <div style={{ flex: 1, height: 1, background: '#26262B' }} />
    </div>
  );
}

function Swatch({ name, hex, bg, role, big = false, light = false }) {
  const textColor = light ? '#0B0B0D' : '#F4F4F5';
  return (
    <div style={{ position: 'relative', gridColumn: big ? 'span 2' : 'auto' }}>
      <div style={{
        background: bg, height: big ? 140 : 110,
        padding: 14, position: 'relative',
        border: bg === '#0B0B0D' ? '1px solid #34343A' : 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: big ? 16 : 13, color: textColor, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {name}
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: textColor, opacity: 0.7, letterSpacing: '0.1em' }}>
          {hex}
        </div>
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.14em', marginTop: 6, textTransform: 'uppercase' }}>
        {role}
      </div>
    </div>
  );
}

function TypeCard({ family, role, sampleStyle, sample, scale }) {
  return (
    <div style={{ background: '#141417', padding: 28, border: '1px solid #26262B' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 18, color: '#FFD200', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{family}</div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#9AA0A6', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{role}</div>
      </div>
      <div style={{ ...sampleStyle, margin: '20px 0 24px', minHeight: 140, display: 'flex', alignItems: 'center' }}>
        {sample}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 14, borderTop: '1px solid #26262B' }}>
        {scale.map(([lbl, sz], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.14em' }}>
            <span>{lbl}</span>
            <span>{sz}PX</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotifCard({ label, children }) {
  return (
    <div>
      <div style={{ border: '1px solid #34343A' }}>
        {children}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.18em', marginTop: 8, textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

Object.assign(window, { TokensArtboard });
