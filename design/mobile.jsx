/* global React, Sarge, SargeAvatar */
/* Mobile version — 390px wide phone-frame-style design */

function MobileHomepage() {
  return (
    <div style={{ width: 390, background: '#0B0B0D', color: '#F4F4F5', position: 'relative', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{
        height: 44, padding: '0 22px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        fontFamily: '-apple-system, sans-serif', fontWeight: 600, fontSize: 15, color: '#F4F4F5',
      }}>
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="18" height="12" viewBox="0 0 18 12"><path d="M1 11 L1 8 M5 11 L5 6 M9 11 L9 4 M13 11 L13 2 M17 11 L17 0" stroke="#F4F4F5" strokeWidth="1.5" /></svg>
          <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 4 Q7 -2 13 4 M3 6 Q7 2 11 6 M5 8 Q7 6 9 8" stroke="#F4F4F5" strokeWidth="1.2" fill="none" /></svg>
          <span style={{ width: 24, height: 11, border: '1px solid #F4F4F5', borderRadius: 2, position: 'relative', padding: 1 }}>
            <span style={{ display: 'block', width: '80%', height: '100%', background: '#F4F4F5' }} />
          </span>
        </span>
      </div>

      {/* MOBILE NAV */}
      <div style={{
        padding: '12px 18px',
        background: 'rgba(11,11,13,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #26262B',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 44, zIndex: 30,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0B0B0D', border: '1.5px solid #FFD200',
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
          }}>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 13, color: '#FFD200', marginTop: -3 }}>STS</div>
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 15, color: '#F4F4F5', letterSpacing: '0.04em' }}>SEAL TEAM SIX</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: '#9AA0A6', letterSpacing: '0.24em', marginTop: 2 }}>716 OPS</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="tel:7169078259" style={{
            width: 38, height: 38, border: '1px solid #FFD200',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FFD200', textDecoration: 'none',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/></svg>
          </a>
          <button style={{
            width: 38, height: 38, background: 'transparent',
            border: '1px solid #34343A', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ display: 'block', width: 18, height: 2, background: '#F4F4F5' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: '#FFD200' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: '#F4F4F5' }} />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE HERO */}
      <section style={{ position: 'relative', minHeight: 700, overflow: 'hidden' }}>
        <img src="images/residential-1.jpg" alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.5) contrast(1.15)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(11,11,13,0.6) 0%, rgba(11,11,13,0.4) 30%, rgba(11,11,13,0.95) 90%)',
        }} />
        <div className="hud-grid" style={{ opacity: 0.5 }} />

        {/* Reticle */}
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ position: 'absolute', top: 60, right: 16, opacity: 0.4 }}>
          <circle cx="70" cy="70" r="62" stroke="#FFD200" strokeWidth="1" fill="none" strokeDasharray="2 4" />
          <circle cx="70" cy="70" r="38" stroke="#FFD200" strokeWidth="1" fill="none" />
          <line x1="70" y1="0" x2="70" y2="32" stroke="#FFD200" strokeWidth="1" />
          <line x1="70" y1="108" x2="70" y2="140" stroke="#FFD200" strokeWidth="1" />
          <line x1="0" y1="70" x2="32" y2="70" stroke="#FFD200" strokeWidth="1" />
          <line x1="108" y1="70" x2="140" y2="70" stroke="#FFD200" strokeWidth="1" />
          <circle cx="70" cy="70" r="2" fill="#FFD200" />
        </svg>

        <div style={{ position: 'relative', padding: '40px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span className="stencil-arrow" style={{ width: 36, height: 12 }} />
            <span className="mil-label" style={{ fontSize: 9.5 }}>
              BUFFALO · OWNER-OPERATED · EST. 2022
            </span>
          </div>
          <h1 className="display" style={{
            fontSize: 62, color: '#F4F4F5', margin: 0, lineHeight: 0.92,
          }}>
            BUFFALO'S<br/>
            DRIVEWAYS,<br/>
            <span style={{ color: '#FFD200', position: 'relative', display: 'inline-block' }}>
              LOCKED<br/>DOWN.
              <span style={{ position: 'absolute', left: 0, bottom: -6, height: 5, width: '74%', background: '#FFD200' }} />
            </span>
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.5,
            color: '#BFC4C9', marginTop: 28, marginBottom: 28, maxWidth: 320,
          }}>
            <span style={{ color: '#F4F4F5', fontWeight: 600 }}>Sealcoating · Crack Filling · Striping.</span>{' '}
            Residential & commercial. Mission-tight finish, every job.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            <a href="#" className="btn btn-primary" style={{ fontSize: 14, padding: '16px 22px', justifyContent: 'space-between' }}>
              GET A FREE ESTIMATE
              <span className="arrow-r" />
            </a>
            <a href="#" className="btn btn-ghost" style={{ fontSize: 14, padding: '16px 22px', justifyContent: 'space-between' }}>
              SEE OUR WORK
              <span className="arrow-r" />
            </a>
          </div>

          {/* Mini stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12,
            paddingTop: 22, borderTop: '1px solid #26262B',
          }}>
            {[
              { num: '24h', lbl: 'EST. RESPONSE' },
              { num: '100%', lbl: 'OWNER ON-SITE' },
              { num: 'WNY', lbl: 'SERVICE AREA' },
              { num: '2022', lbl: 'IN BUSINESS' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 28, color: '#F4F4F5', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#9AA0A6', letterSpacing: '0.18em', marginTop: 4 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hi-vis glow seam */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 20, height: 1,
          background: 'linear-gradient(90deg, transparent, #C8FF00, transparent)',
          boxShadow: '0 0 12px #C8FF00, 0 0 24px rgba(200,255,0,0.5)',
        }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 6,
          backgroundImage: 'repeating-linear-gradient(90deg, #FFD200 0 36px, transparent 36px 72px)',
        }} />
      </section>

      {/* TRUST BAR mobile */}
      <section className="hazard-thin" style={{ height: 3 }} />
      <section style={{ background: '#0B0B0D', padding: '20px 24px', borderBottom: '1px solid #26262B', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 14, whiteSpace: 'nowrap' }}>
          {['Locally Owned', 'Since 2022', 'Free Estimates', 'ADA Striping'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 16 16"><path d="M2 8 L7 13 L14 4" stroke="#FFD200" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
              <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500, fontSize: 13, color: '#F4F4F5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="asphalt-grain" style={{ padding: '48px 24px', position: 'relative' }}>
        <div className="mil-label" style={{ marginBottom: 12 }}>↓ 01 / 06 · CAPABILITIES</div>
        <h2 className="display" style={{ fontSize: 44, color: '#F4F4F5', margin: 0, marginBottom: 28 }}>
          SIX SERVICES.<br/><span style={{ color: '#FFD200' }}>ZERO</span> SHORTCUTS.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            ['01', 'Sealcoating', 'Premium 2-coat protection'],
            ['02', 'Crack Filling', 'Hot-pour rubberized sealant'],
            ['03', 'Line Striping', 'ADA · Standard · Custom'],
            ['04', 'Hot Asphalt & Patching', 'Real repair, not paint-over'],
            ['05', 'Concrete', 'Via Xquisit · One contact', 'PARTNER'],
            ['06', 'Snow + Salting', 'Same crew, all winter', 'SEASONAL'],
          ].map(([n, t, d, tag], i) => (
            <div key={i} style={{
              background: '#141417', padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 16,
              borderLeft: '2px solid #FFD200',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#FFD200', letterSpacing: '0.18em' }}>{n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 18, color: '#F4F4F5', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{t}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#9AA0A6', marginTop: 2 }}>{d}</div>
              </div>
              {tag && <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#0B0B0D', background: '#FFD200', padding: '2px 6px', letterSpacing: '0.16em' }}>{tag}</div>}
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 1 L9 6 L3 11" stroke="#9AA0A6" strokeWidth="1.5" fill="none" /></svg>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE/AFTER static (mobile) */}
      <section style={{ background: '#0B0B0D', padding: '48px 24px', position: 'relative' }}>
        <div className="mil-label" style={{ marginBottom: 12 }}>↓ 02 / 06 · BEFORE / AFTER</div>
        <h2 className="display" style={{ fontSize: 44, color: '#F4F4F5', margin: 0, marginBottom: 24 }}>
          SEE THE<br/><span style={{ color: '#FFD200' }}>DIFFERENCE.</span>
        </h2>
        <div style={{
          position: 'relative', height: 420, overflow: 'hidden',
          border: '1px solid #26262B',
        }}>
          <img src="images/garage-after.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, width: '50%', overflow: 'hidden' }}>
            <img src="images/garage-before.jpg" alt="" style={{ width: 'calc(100% * 2)', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(11,11,13,0.85)', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 14, color: '#FF3D2E', letterSpacing: '0.06em' }}>▲ BEFORE</div>
          </div>
          <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(11,11,13,0.85)', padding: '6px 10px', border: '1px solid rgba(255,210,0,0.4)' }}>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFD200', letterSpacing: '0.06em' }}>★ AFTER</div>
          </div>
          {/* Center handle */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: '#FFD200', boxShadow: '0 0 12px rgba(255,210,0,0.6)', transform: 'translateX(-1px)' }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 44, height: 44, borderRadius: '50%', background: '#FFD200',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255,210,0,0.5)',
            }}>
              <svg width="18" height="18" viewBox="0 0 22 22"><path d="M7 4 L1 11 L7 18 M15 4 L21 11 L15 18" stroke="#0B0B0D" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#9AA0A6' }}>Yellow house · 2-car · Clarence, NY</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ width: 16, height: 2, background: i === 0 ? '#FFD200' : '#26262B' }} />)}
          </div>
        </div>
      </section>

      {/* GALLERY mobile */}
      <section className="asphalt-grain" style={{ padding: '48px 24px', position: 'relative' }}>
        <div className="mil-label" style={{ marginBottom: 12 }}>↓ 03 / 06 · FIELD REPORTS</div>
        <h2 className="display" style={{ fontSize: 44, color: '#F4F4F5', margin: 0, marginBottom: 24 }}>
          FIELD<br/><span style={{ color: '#FFD200' }}>REPORTS.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {[
            { img: 'images/residential-1.jpg', cat: 'RESIDENTIAL', span: 'col' },
            { img: 'images/auto-shop-after.jpg', cat: 'COMMERCIAL' },
            { img: 'images/school-ada.jpg', cat: 'SCHOOL · ADA' },
            { img: 'images/school-drive.jpg', cat: 'SCHOOL' },
            { img: 'images/residential-2.jpg', cat: 'RESIDENTIAL' },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'relative', height: i === 0 ? 280 : 140,
              gridColumn: i === 0 ? '1 / -1' : 'auto',
              overflow: 'hidden', background: '#141417',
            }}>
              <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(11,11,13,0.85), transparent 55%)' }} />
              <div style={{ position: 'absolute', left: 10, bottom: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#FFD200', letterSpacing: '0.18em' }}>{s.cat}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US mobile */}
      <section style={{ background: '#141417', padding: '48px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: 20, fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 240, color: '#1C1C20', lineHeight: 0.8, pointerEvents: 'none' }}>06</div>
        <div style={{ position: 'relative' }}>
          <div className="mil-label" style={{ marginBottom: 12 }}>↓ 04 / 06 · WHY STS</div>
          <h2 className="display" style={{ fontSize: 42, color: '#F4F4F5', margin: 0, marginBottom: 28 }}>
            ANYONE CAN<br/>PAINT A LINE.<br/><span style={{ color: '#FFD200' }}>WE PAINT IT<br/>STRAIGHT.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['01', 'Owner On Every Job'],
              ['02', 'Premium Materials Only'],
              ['03', 'Razor-Sharp Lines'],
              ['04', 'WNY Born + Bred'],
              ['05', 'Free, No-Pressure Quotes'],
              ['06', 'Year-Round Coverage'],
            ].map(([n, t], i) => (
              <div key={i} style={{
                padding: '14px 16px', borderLeft: '2px solid #FFD200',
                background: 'linear-gradient(90deg, rgba(255,210,0,0.05), transparent)',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#FFD200', letterSpacing: '0.18em' }}>R/{n}</div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 18, color: '#F4F4F5', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA mobile */}
      <section className="asphalt-grain" style={{ padding: '48px 24px', position: 'relative' }}>
        <div className="mil-label" style={{ marginBottom: 12 }}>↓ 05 / 06 · AREA OF OPS</div>
        <h2 className="display" style={{ fontSize: 42, color: '#F4F4F5', margin: 0, marginBottom: 20 }}>
          DEPLOYING<br/>ACROSS<br/><span style={{ color: '#FFD200' }}>WESTERN NY.</span>
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#BFC4C9', lineHeight: 1.55 }}>
          Buffalo + every WNY suburb. Send us your ZIP — we confirm same day.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
          {['Buffalo', 'Clarence', 'Amherst', 'Williamsville', 'Tonawanda', 'Cheektowaga', 'West Seneca', 'Lancaster', 'Hamburg', 'Orchard Park', 'Lockport'].map((t, i) => (
            <span key={i} style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 500, fontSize: 11,
              color: i === 0 ? '#0B0B0D' : '#BFC4C9',
              background: i === 0 ? '#FFD200' : 'transparent',
              border: i === 0 ? 0 : '1px solid #34343A',
              padding: '5px 10px', textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>{t}</span>
          ))}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6', letterSpacing: '0.16em', padding: '6px 8px' }}>+ MORE</span>
        </div>
      </section>

      {/* CONTACT mobile */}
      <section style={{ background: '#0B0B0D', padding: '48px 24px', position: 'relative' }}>
        <div className="mil-label" style={{ marginBottom: 12 }}>↓ 06 / 06 · REQUEST INTEL</div>
        <h2 className="display" style={{ fontSize: 50, color: '#F4F4F5', margin: 0, marginBottom: 20 }}>
          LOCK IT<br/><span style={{ color: '#FFD200' }}>DOWN.</span>
        </h2>

        <a href="tel:7169078259" style={{
          display: 'block', textDecoration: 'none',
          border: '1px solid #FFD200', padding: '18px 20px', marginBottom: 12,
          background: 'linear-gradient(180deg, rgba(255,210,0,0.06), transparent)',
        }}>
          <div className="mil-label" style={{ marginBottom: 4 }}>CALL OR TEXT</div>
          <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 32, color: '#F4F4F5', letterSpacing: '0.02em' }}>716-907-8259</div>
        </a>

        <a href="mailto:Seal.Team.Six.Snow@gmail.com" style={{
          display: 'block', textDecoration: 'none',
          border: '1px solid #26262B', padding: '14px 20px', marginBottom: 24,
        }}>
          <div className="mil-label-white" style={{ marginBottom: 4 }}>EMAIL</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#F4F4F5' }}>Seal.Team.Six.Snow@gmail.com</div>
        </a>

        <form style={{ background: '#141417', padding: 24, border: '1px solid #26262B', position: 'relative' }}>
          <div className="hazard-thin" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3 }} />
          <h3 className="display" style={{ fontSize: 22, color: '#F4F4F5', margin: 0, marginBottom: 16 }}>QUICK ESTIMATE</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="field"><label>Name</label><input type="text" placeholder="John Smith" /></div>
            <div className="field"><label>Phone</label><input type="tel" placeholder="716-555-0000" /></div>
            <div className="field"><label>Town / ZIP</label><input type="text" placeholder="Clarence · 14031" /></div>
            <div className="field">
              <label>What's the job?</label>
              <select><option>Sealcoating</option><option>Crack Filling</option><option>Line Striping</option><option>Multiple</option></select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ fontSize: 14, padding: '14px 20px', marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
            SEND TO THE CREW <span className="arrow-r" />
          </button>
        </form>
      </section>

      {/* FOOTER mobile */}
      <footer style={{ background: '#0B0B0D', borderTop: '1px solid #26262B' }}>
        <div className="hazard-thin" style={{ height: 3 }} />
        <div style={{ padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#0B0B0D', border: '1.5px solid #FFD200',
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
            }}>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 13, color: '#FFD200', marginTop: -3 }}>STS</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 16, color: '#F4F4F5', letterSpacing: '0.04em' }}>SEAL TEAM SIX</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#9AA0A6', letterSpacing: '0.24em', marginTop: 2 }}>SEALCOATING · STRIPING</div>
            </div>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#6B7076', letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1.7 }}>
            © 2026 STS-716 · LOCKED DOWN<br/>
            BUFFALO + WESTERN NEW YORK
          </div>
        </div>
      </footer>

      {/* Sarge launcher floating */}
      <button style={{
        position: 'sticky', bottom: 16,
        marginLeft: 'calc(100% - 84px)', marginRight: 16, marginBottom: 16, marginTop: -84,
        zIndex: 50,
        width: 68, height: 68, borderRadius: '50%',
        background: '#FFD200', border: 0, cursor: 'pointer',
        boxShadow: '0 12px 32px rgba(0,0,0,0.5), 0 0 0 4px rgba(255,210,0,0.2)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: '#0B0B0D',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{ transform: 'translateY(4px)' }}><Sarge size={62} /></div>
          <span style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderRadius: '50%', background: '#C8FF00', boxShadow: '0 0 6px #C8FF00' }} />
        </div>
      </button>
    </div>
  );
}

Object.assign(window, { MobileHomepage });
