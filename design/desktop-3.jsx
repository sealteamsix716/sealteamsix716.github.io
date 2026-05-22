/* global React */
/* Desktop sections — part 3: WhyUs, ServiceArea, Contact, Footer */

function WhyUs() {
  const reasons = [
    {
      n: '01', t: 'Owner On Every Job',
      d: 'No sub-crews, no flake-outs. The owner is on-site, swinging the wand, holding the line.',
    },
    {
      n: '02', t: 'Premium Materials Only',
      d: 'Commercial-grade sealer, hot-pour rubber, latex traffic paint. No watered-down product.',
    },
    {
      n: '03', t: 'Razor-Sharp Lines',
      d: 'Crisp ADA stalls, clean cut-ins around garages, edges you can run a finger along.',
    },
    {
      n: '04', t: 'WNY Born + Bred',
      d: 'We know Buffalo winters. Our prep, timing, and sealer choice are tuned for it.',
    },
    {
      n: '05', t: 'Free, No-Pressure Estimates',
      d: 'On-site walk-through, written quote, clear scope. We never upsell what you don\'t need.',
    },
    {
      n: '06', t: 'Year-Round Coverage',
      d: 'Seal & stripe through November, plow & salt all winter. One crew, four seasons.',
    },
  ];
  return (
    <section id="why-us" style={{
      background: '#141417', padding: '110px 56px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Big background number */}
      <div style={{
        position: 'absolute', right: -40, top: 40,
        fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 480,
        color: '#1C1C20', letterSpacing: '-0.04em', lineHeight: 0.8,
        pointerEvents: 'none', userSelect: 'none',
      }}>06</div>

      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: 64, maxWidth: 880 }}>
          <div className="mil-label" style={{ marginBottom: 14 }}>
            ↓ SECTION 04 / 06 — WHY SEAL TEAM SIX
          </div>
          <h2 className="display" style={{ fontSize: 84, color: '#F4F4F5', margin: 0 }}>
            ANYONE CAN<br/>
            PAINT A LINE.<br/>
            <span style={{ color: '#FFD200' }}>WE PAINT IT STRAIGHT.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {reasons.map((r, i) => (
            <div key={i} style={{
              position: 'relative', padding: '32px 24px 28px',
              borderLeft: '2px solid #FFD200',
              background: 'linear-gradient(180deg, rgba(255,210,0,0.04) 0%, transparent 100%)',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#FFD200',
                letterSpacing: '0.22em', marginBottom: 18,
              }}>R/{r.n}</div>
              <h3 className="display" style={{ fontSize: 28, color: '#F4F4F5', margin: 0, marginBottom: 12 }}>
                {r.t}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: '#9AA0A6', lineHeight: 1.55, margin: 0 }}>
                {r.d}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote — testimonial placeholder */}
        <div style={{
          marginTop: 80, padding: '40px 48px',
          border: '1px solid #26262B', background: '#0B0B0D',
          display: 'grid', gridTemplateColumns: '120px 1fr 200px', gap: 32, alignItems: 'center',
        }}>
          <div>
            <svg width="60" height="48" viewBox="0 0 60 48" fill="none">
              <path d="M0 48 V 24 C 0 11 8 0 22 0 V 8 C 14 8 8 14 8 24 H 22 V 48 Z" fill="#FFD200" opacity="0.85"/>
              <path d="M32 48 V 24 C 32 11 40 0 54 0 V 8 C 46 8 40 14 40 24 H 54 V 48 Z" fill="#FFD200" opacity="0.85"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, lineHeight: 1.4, color: '#F4F4F5', margin: 0, fontWeight: 400 }}>
              <span style={{ color: '#9AA0A6', fontStyle: 'italic' }}>[ Real customer testimonial drops here — quote about premium finish, sharp lines, and on-time crew. ]</span>
            </p>
            <div style={{ marginTop: 18, display: 'flex', gap: 16, alignItems: 'center' }}>
              <div className="mil-label-white" style={{ fontSize: 11 }}>CUSTOMER NAME · CLARENCE, NY</div>
              <div style={{ color: '#FFD200', fontSize: 14, letterSpacing: '0.15em' }}>★★★★★</div>
            </div>
          </div>
          <div style={{
            border: '1px solid #34343A', padding: 16, textAlign: 'center',
          }}>
            <div className="mil-label-white" style={{ fontSize: 10 }}>RATING</div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 56, color: '#FFD200', lineHeight: 1, margin: '6px 0' }}>5.0</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.18em' }}>FACEBOOK · GOOGLE</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICE AREA — stylized WNY map + town list
   ============================================================ */
function ServiceArea() {
  const towns = [
    'Buffalo', 'Clarence', 'Amherst', 'Williamsville', 'Tonawanda',
    'Cheektowaga', 'West Seneca', 'Lancaster', 'Depew', 'Orchard Park',
    'Hamburg', 'East Aurora', 'Lockport', 'Niagara Falls', 'Grand Island',
    'Kenmore', 'Snyder', 'Eggertsville', 'Getzville', 'Akron',
  ];
  return (
    <section id="service-area" className="asphalt-grain" style={{ padding: '110px 56px', position: 'relative' }}>
      <div className="road-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div className="mil-label" style={{ marginBottom: 14 }}>
            ↓ SECTION 05 / 06 — AREA OF OPERATION
          </div>
          <h2 className="display" style={{ fontSize: 78, color: '#F4F4F5', margin: 0, marginBottom: 24 }}>
            DEPLOYING<br/>
            ACROSS<br/>
            <span style={{ color: '#FFD200' }}>WESTERN NY.</span>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.55, color: '#BFC4C9', maxWidth: 540, marginBottom: 32 }}>
            We service the entire Buffalo metro area and surrounding suburbs. If your driveway is in WNY, we'll get to it. Not sure if you're in range? Send us your ZIP — we'll confirm same day.
          </p>

          {/* Town wall */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 560 }}>
            {towns.map((t, i) => (
              <span key={i} style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 500, fontSize: 13,
                color: i === 0 ? '#0B0B0D' : '#BFC4C9',
                background: i === 0 ? '#FFD200' : 'transparent',
                border: i === 0 ? 0 : '1px solid #34343A',
                padding: '6px 12px', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {t}
              </span>
            ))}
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: '#9AA0A6', letterSpacing: '0.18em',
              padding: '7px 12px', textTransform: 'uppercase',
            }}>+ surrounding</span>
          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 24 }}>
            <div>
              <div className="mil-label-white">HQ</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 18, color: '#F4F4F5', marginTop: 4 }}>BUFFALO, NY</div>
            </div>
            <div>
              <div className="mil-label-white">RADIUS</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 18, color: '#F4F4F5', marginTop: 4 }}>30 MILES</div>
            </div>
            <div>
              <div className="mil-label-white">DRIVE TIME</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 18, color: '#F4F4F5', marginTop: 4 }}>≤ 45 MIN</div>
            </div>
          </div>
        </div>

        {/* Stylized WNY map */}
        <WNYMap />
      </div>
    </section>
  );
}

function WNYMap() {
  // Stylized abstract map - not geographically perfect, but reads as Buffalo/WNY
  // Showing Lake Erie/Niagara coastline + town pins
  return (
    <div style={{
      position: 'relative', height: 560,
      background: '#0B0B0D',
      border: '1px solid #26262B',
      overflow: 'hidden',
    }}>
      {/* HUD grid */}
      <div className="hud-grid" style={{ mask: 'none' }} />

      {/* Lake Erie water */}
      <svg width="100%" height="100%" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}>
        {/* Lake / Niagara River */}
        <defs>
          <pattern id="waterDots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.6" fill="#34343A" />
          </pattern>
        </defs>
        <path d="M -20 380 Q 80 350 180 360 L 200 280 L 215 200 L 210 120 L 240 40 L 0 40 L -20 380 Z"
          fill="url(#waterDots)" opacity="0.6" />
        {/* Coastline */}
        <path d="M -20 380 Q 80 350 180 360 L 200 280 L 215 200 L 210 120 L 240 40"
          stroke="#FFD200" strokeWidth="1.5" fill="none" strokeDasharray="2 4" opacity="0.5" />

        {/* Niagara River label */}
        <text x="100" y="160" fontFamily="JetBrains Mono, monospace" fontSize="10"
          fill="#6B7076" letterSpacing="3" transform="rotate(-72 100 160)">LAKE ERIE</text>
        <text x="240" y="100" fontFamily="JetBrains Mono, monospace" fontSize="9"
          fill="#6B7076" letterSpacing="2">NIAGARA RIVER →</text>

        {/* Major roads — abstract */}
        <path d="M 220 380 L 360 280 L 500 240" stroke="#26262B" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 220 380 L 360 280 L 500 240" stroke="#34343A" strokeWidth="2" fill="none" strokeDasharray="4 6" />
        <text x="380" y="260" fontFamily="JetBrains Mono, monospace" fontSize="8"
          fill="#6B7076" letterSpacing="2" transform="rotate(-12 380 260)">I-90 →</text>

        <path d="M 260 200 L 280 380" stroke="#26262B" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 260 200 L 280 380" stroke="#34343A" strokeWidth="1.5" fill="none" strokeDasharray="3 5" />
        <text x="290" y="220" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#6B7076" letterSpacing="2">I-190</text>

        {/* Service radius circle */}
        <circle cx="280" cy="320" r="200" stroke="#FFD200" strokeWidth="1" fill="none" strokeDasharray="2 4" opacity="0.35" />
        <circle cx="280" cy="320" r="130" stroke="#FFD200" strokeWidth="1" fill="none" strokeDasharray="2 4" opacity="0.5" />
        <circle cx="280" cy="320" r="200" fill="#FFD200" opacity="0.025" />

        {/* Pins */}
        {[
          { x: 280, y: 320, label: 'BUFFALO', hq: true },
          { x: 380, y: 280, label: 'CLARENCE' },
          { x: 340, y: 240, label: 'AMHERST' },
          { x: 360, y: 220, label: 'WILLIAMSVILLE' },
          { x: 240, y: 240, label: 'TONAWANDA' },
          { x: 360, y: 340, label: 'CHEEKTOWAGA' },
          { x: 280, y: 420, label: 'HAMBURG' },
          { x: 340, y: 400, label: 'ORCHARD PARK' },
          { x: 440, y: 320, label: 'LANCASTER' },
          { x: 240, y: 140, label: 'NIAGARA FALLS' },
        ].map((p, i) => (
          <g key={i}>
            {p.hq && <circle cx={p.x} cy={p.y} r="20" fill="#FFD200" opacity="0.15">
              <animate attributeName="r" values="20;36;20" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
            </circle>}
            <circle cx={p.x} cy={p.y} r={p.hq ? 6 : 4} fill={p.hq ? '#FFD200' : '#F4F4F5'} />
            {p.hq && <circle cx={p.x} cy={p.y} r="10" stroke="#FFD200" strokeWidth="1" fill="none" />}
            <text x={p.x + 10} y={p.y + 4}
              fontFamily="Oswald, sans-serif" fontWeight="600" fontSize="11"
              fill={p.hq ? '#FFD200' : '#F4F4F5'} letterSpacing="1.5">
              {p.label}{p.hq && ' · HQ'}
            </text>
          </g>
        ))}

        {/* Compass */}
        <g transform="translate(540 40)">
          <circle cx="0" cy="0" r="20" stroke="#FFD200" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M 0 -16 L -4 4 L 0 0 L 4 4 Z" fill="#FFD200" />
          <text x="0" y="-22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#FFD200" letterSpacing="1">N</text>
        </g>

        {/* Reticle overlay center on Buffalo */}
        <g transform="translate(280 320)" opacity="0.6">
          <line x1="-30" y1="0" x2="-12" y2="0" stroke="#FFD200" strokeWidth="1" />
          <line x1="12" y1="0" x2="30" y2="0" stroke="#FFD200" strokeWidth="1" />
          <line x1="0" y1="-30" x2="0" y2="-12" stroke="#FFD200" strokeWidth="1" />
          <line x1="0" y1="12" x2="0" y2="30" stroke="#FFD200" strokeWidth="1" />
        </g>
      </svg>

      {/* Corner labels */}
      <div style={{ position: 'absolute', top: 16, left: 16 }}>
        <div className="mil-label" style={{ fontSize: 10 }}>WNY · 716 OPS GRID</div>
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#6B7076', letterSpacing: '0.18em' }}>
          42.8864° N · 78.8784° W
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, background: '#FFD200', borderRadius: '50%' }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.18em' }}>HQ</span>
        <span style={{ width: 6, height: 6, background: '#F4F4F5', borderRadius: '50%', marginLeft: 12 }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.18em' }}>SERVICE TOWN</span>
      </div>
      {/* Brackets */}
      <div className="brackets" style={{ position: 'absolute', inset: 12 }}>
        <span className="br-tr" /><span className="br-br" />
      </div>
    </div>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  return (
    <section id="contact" style={{ background: '#0B0B0D', padding: '110px 56px', position: 'relative' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 80 }}>
        <div>
          <div className="mil-label" style={{ marginBottom: 14 }}>
            ↓ SECTION 06 / 06 — REQUEST INTEL
          </div>
          <h2 className="display" style={{ fontSize: 84, color: '#F4F4F5', margin: 0, marginBottom: 24 }}>
            LOCK IT<br/>
            <span style={{ color: '#FFD200' }}>DOWN.</span>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.55, color: '#BFC4C9', maxWidth: 460, marginBottom: 40 }}>
            Free estimate. Zero pressure. We'll walk the property, measure the work, and email you a written quote — usually within 24 hours.
          </p>

          {/* Big phone block */}
          <a href="tel:7169078259" style={{
            display: 'block', textDecoration: 'none',
            border: '1px solid #FFD200',
            padding: '24px 28px', marginBottom: 16,
            background: 'linear-gradient(180deg, rgba(255,210,0,0.06), transparent)',
          }}>
            <div className="mil-label" style={{ marginBottom: 6 }}>PRIMARY CHANNEL · CALL OR TEXT</div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 52, color: '#F4F4F5', letterSpacing: '0.02em', lineHeight: 1 }}>
              716-907-8259
            </div>
          </a>

          <a href="mailto:Seal.Team.Six.Snow@gmail.com" style={{
            display: 'block', textDecoration: 'none',
            border: '1px solid #26262B', padding: '20px 28px', marginBottom: 32,
          }}>
            <div className="mil-label-white" style={{ marginBottom: 6 }}>SECONDARY · EMAIL</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, fontWeight: 600, color: '#F4F4F5' }}>
              Seal.Team.Six.Snow@gmail.com
            </div>
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ border: '1px solid #26262B', padding: 16 }}>
              <div className="mil-label-white">HOURS</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: 15, color: '#F4F4F5', marginTop: 6, lineHeight: 1.5 }}>
                MON–SAT · 7A – 7P<br/>
                SUN · BY APPOINTMENT
              </div>
            </div>
            <div style={{ border: '1px solid #26262B', padding: 16 }}>
              <div className="mil-label-white">FACEBOOK</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: 15, color: '#F4F4F5', marginTop: 6, lineHeight: 1.5 }}>
                /SealTeamSix.716
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form id="estimate" style={{
          background: '#141417', padding: '48px 48px 40px', border: '1px solid #26262B',
          position: 'relative',
        }}>
          {/* Header strip */}
          <div className="hazard-thin" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <div className="mil-label" style={{ marginBottom: 8 }}>INTAKE FORM · STS-716</div>
              <h3 className="display" style={{ fontSize: 32, color: '#F4F4F5', margin: 0 }}>
                FREE ESTIMATE
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mil-label-white">RESPONSE</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 18, color: '#C8FF00', marginTop: 4 }}>
                &lt; 24 HRS
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
            <div className="field"><label>Full Name</label><input type="text" placeholder="John Smith" /></div>
            <div className="field"><label>Phone</label><input type="tel" placeholder="716-555-0000" /></div>
          </div>

          <div className="field" style={{ marginBottom: 18 }}>
            <label>Email</label><input type="email" placeholder="you@email.com" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
            <div className="field"><label>Town / ZIP</label><input type="text" placeholder="Clarence · 14031" /></div>
            <div className="field">
              <label>Property Type</label>
              <select>
                <option>Residential driveway</option>
                <option>Luxury / Estate</option>
                <option>Commercial lot</option>
                <option>HOA / School</option>
              </select>
            </div>
          </div>

          <div className="field" style={{ marginBottom: 18 }}>
            <label>Services needed</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {['Sealcoating', 'Crack Filling', 'Line Striping', 'Patching', 'Snow / Salt'].map((s, i) => (
                <label key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 14px', border: '1px solid #34343A',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#F4F4F5',
                  cursor: 'pointer',
                }}>
                  <input type="checkbox" defaultChecked={i === 0} style={{ accentColor: '#FFD200' }} />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="field" style={{ marginBottom: 24 }}>
            <label>Anything else? (optional)</label>
            <textarea rows="3" placeholder="Approximate size, special access notes, timeline…" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#6B7076', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              No spam. We only use this to quote your job.
            </div>
            <button type="submit" className="btn btn-primary" style={{ fontSize: 16, padding: '18px 32px' }}>
              SEND TO THE CREW <span className="arrow-r" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{ background: '#0B0B0D', borderTop: '1px solid #26262B', position: 'relative' }}>
      <div className="hazard-thin" style={{ height: 4 }} />
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '64px 56px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.3fr', gap: 40, marginBottom: 48 }}>
          {/* Logo block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#0B0B0D', border: '1.5px solid #FFD200',
                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
              }}>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 19, color: '#FFD200', marginTop: -4 }}>STS</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22, color: '#F4F4F5', letterSpacing: '0.04em' }}>
                  SEAL TEAM SIX
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.28em', marginTop: 4 }}>
                  SEALCOATING · STRIPING
                </div>
              </div>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9AA0A6', lineHeight: 1.6, maxWidth: 320 }}>
              Owner-operated asphalt sealcoating, crack filling, line striping and winter services. Buffalo + Western New York.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <a href="#" style={{ width: 36, height: 36, border: '1px solid #34343A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD200', textDecoration: 'none', fontFamily: 'Oswald', fontWeight: 700 }}>f</a>
              <a href="tel:7169078259" style={{ width: 36, height: 36, border: '1px solid #34343A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD200', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/></svg>
              </a>
            </div>
          </div>

          {[
            { t: 'Services', l: ['Sealcoating', 'Crack Filling', 'Line Striping', 'Patching', 'Snow & Salt'] },
            { t: 'Company', l: ['Why Seal Team Six', 'Our Work', 'Service Area', 'Free Estimate'] },
            { t: 'Service Area', l: ['Buffalo', 'Clarence', 'Amherst', 'Williamsville', '+ All WNY'] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFD200',
                textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 16,
              }}>{col.t}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.l.map((it, j) => (
                  <li key={j}><a href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#BFC4C9', textDecoration: 'none' }}>{it}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFD200',
              textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 16,
            }}>Direct Channel</div>
            <a href="tel:7169078259" style={{ textDecoration: 'none', color: '#F4F4F5' }}>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 24, letterSpacing: '0.02em' }}>716-907-8259</div>
            </a>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#BFC4C9', marginTop: 8, lineHeight: 1.5 }}>
              Seal.Team.Six.Snow<br/>@gmail.com
            </div>
            <a href="#estimate" className="btn btn-primary" style={{ fontSize: 13, padding: '10px 18px', marginTop: 18 }}>
              FREE ESTIMATE <span className="arrow-r" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24, borderTop: '1px solid #26262B',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#6B7076', letterSpacing: '0.16em',
        }}>
          <div>© 2026 SEAL TEAM SIX SEALCOATING & STRIPING · BUFFALO, NY</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: '#6B7076', textDecoration: 'none' }}>PRIVACY</a>
            <a href="#" style={{ color: '#6B7076', textDecoration: 'none' }}>TERMS</a>
            <span style={{ color: '#FFD200' }}>STS-716 · LOCKED DOWN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { WhyUs, ServiceArea, Contact, Footer });
