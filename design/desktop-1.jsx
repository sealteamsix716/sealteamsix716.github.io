/* global React, Sarge */
/* Desktop sections — part 1: Nav, Hero, TrustBar */

function Nav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'rgba(11,11,13,0.82)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="hazard-thin" style={{ height: 3 }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 36,
        padding: '14px 56px',
        maxWidth: 1440, margin: '0 auto',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{
            width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0B0B0D', border: '1.5px solid #FFD200',
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
          }}>
            <div style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 17,
              color: '#FFD200', letterSpacing: '0.04em', marginTop: -4,
            }}>STS</div>
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 19,
              color: '#F4F4F5', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>SEAL TEAM SIX</div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5,
              color: '#9AA0A6', letterSpacing: '0.32em', textTransform: 'uppercase',
              marginTop: 3,
            }}>Sealcoating · Striping</div>
          </div>
        </a>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: 30, marginLeft: 24 }}>
          {['Services', 'Our Work', 'Why Us', 'Service Area', 'Contact'].map((link, i) => (
            <a key={i} href={`#${link.toLowerCase().replace(' ', '-')}`} style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
              color: '#F4F4F5', textDecoration: 'none', textTransform: 'uppercase',
              letterSpacing: '0.12em',
              position: 'relative',
            }}>
              {link}
            </a>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        {/* Phone */}
        <a href="tel:7169078259" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          textDecoration: 'none', color: '#F4F4F5',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#FFD200" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#9AA0A6', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Call</div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.04em' }}>716-907-8259</div>
          </div>
        </a>

        <a href="#estimate" className="btn btn-primary">
          Free Estimate
          <span className="arrow-r" />
        </a>
      </div>
    </header>
  );
}

/* ============================================================
   HERO
   Cinematic full-bleed sealcoated photo, HUD overlay,
   animated road-line dashes, hi-vis 'fresh seal' glow seam
   ============================================================ */
function Hero({ variant = 'cinematic', greenGlow = 'hero-only' }) {
  const showGlow = greenGlow !== 'none';

  return (
    <section style={{
      position: 'relative', height: 820, overflow: 'hidden',
      background: '#0B0B0D',
    }}>
      {/* Background photo */}
      {variant === 'cinematic' && (
        <>
          <img src="images/residential-1.jpg" alt="Freshly sealed driveway"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 70%',
              filter: 'brightness(0.55) contrast(1.15) saturate(0.85)',
            }} />
          {/* darken gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(11,11,13,0.92) 0%, rgba(11,11,13,0.65) 45%, rgba(11,11,13,0.3) 100%), linear-gradient(0deg, rgba(11,11,13,0.85) 0%, rgba(11,11,13,0.1) 50%)',
          }} />
        </>
      )}

      {variant === 'split' && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div className="asphalt-grain" />
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src="images/residential-2.jpg" alt="Freshly sealed driveway"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.1)' }} />
          </div>
        </div>
      )}

      {variant === 'canvas' && (
        <div className="asphalt-grain" style={{ position: 'absolute', inset: 0 }}>
          {/* big diagonal hazard accent */}
          <div className="hazard" style={{
            position: 'absolute', right: -60, top: 80,
            width: 320, height: 80, transform: 'rotate(-12deg)', opacity: 0.18,
          }} />
        </div>
      )}

      {/* HUD grid overlay */}
      <div className="hud-grid" />

      {/* Targeting reticle (top-right) */}
      <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: 'absolute', top: 80, right: 64, opacity: 0.35 }}>
        <circle cx="110" cy="110" r="98" stroke="#FFD200" strokeWidth="1" fill="none" strokeDasharray="2 6" />
        <circle cx="110" cy="110" r="70" stroke="#FFD200" strokeWidth="1" fill="none" />
        <circle cx="110" cy="110" r="40" stroke="#FFD200" strokeWidth="1" fill="none" />
        <line x1="110" y1="0" x2="110" y2="40" stroke="#FFD200" strokeWidth="1" />
        <line x1="110" y1="180" x2="110" y2="220" stroke="#FFD200" strokeWidth="1" />
        <line x1="0" y1="110" x2="40" y2="110" stroke="#FFD200" strokeWidth="1" />
        <line x1="180" y1="110" x2="220" y2="110" stroke="#FFD200" strokeWidth="1" />
        <circle cx="110" cy="110" r="3" fill="#FFD200" />
      </svg>

      {/* Side stencil text */}
      <div style={{
        position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'left top',
      }}>
        <div className="mil-label" style={{ fontSize: 10, color: '#FFD200', opacity: 0.5 }}>
          STS-716 · WNY OPS · EST. 2022 · MISSION: LOCK IT DOWN
        </div>
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        maxWidth: 1440, margin: '0 auto',
        padding: '120px 80px 80px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <span className="stencil-arrow" />
          <span className="mil-label" style={{ fontSize: 12 }}>
            BUFFALO, NY · OWNER-OPERATED · LOCALLY DEPLOYED
          </span>
        </div>

        {/* Headline */}
        <h1 className="display" style={{
          fontSize: 124,
          color: '#F4F4F5',
          margin: 0,
          maxWidth: 1000,
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
        }}>
          BUFFALO'S<br />
          DRIVEWAYS,<br />
          <span style={{ color: '#FFD200', position: 'relative', display: 'inline-block' }}>
            LOCKED DOWN.
            {/* yellow underline w/ stencil arrow */}
            <span style={{
              position: 'absolute', left: 0, bottom: -10, height: 8,
              width: '78%', background: '#FFD200',
            }} />
          </span>
        </h1>

        {/* Subhead */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 20, lineHeight: 1.45,
          color: '#BFC4C9', maxWidth: 620, marginTop: 36, marginBottom: 40,
          fontWeight: 400,
        }}>
          <span style={{ color: '#F4F4F5', fontWeight: 600 }}>Sealcoating · Crack Filling · Line Striping.</span>{' '}
          Residential and commercial, done mission-tight. Razor-sharp lines, premium materials, no excuses — across all of Western New York.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="#estimate" className="btn btn-primary" style={{ fontSize: 16, padding: '18px 32px' }}>
            Get a Free Estimate
            <span className="arrow-r" />
          </a>
          <a href="#gallery" className="btn btn-ghost" style={{ fontSize: 16, padding: '18px 32px' }}>
            See Our Work
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 12 }}>
            <div style={{ width: 6, height: 6, background: '#C8FF00', borderRadius: '50%', boxShadow: '0 0 8px #C8FF00' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#9AA0A6', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Booking 2026 season now
            </span>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          marginTop: 100, display: 'flex', gap: 64, alignItems: 'flex-end',
        }}>
          {[
            { num: '24h', lbl: 'EST. RESPONSE' },
            { num: '100%', lbl: 'OWNER ON-SITE' },
            { num: 'WNY', lbl: 'SERVICE AREA' },
            { num: '2022', lbl: 'IN BUSINESS' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 44,
                color: '#F4F4F5', lineHeight: 1, letterSpacing: '-0.01em',
              }}>{s.num}</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9AA0A6',
                letterSpacing: '0.22em', marginTop: 6,
              }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hi-vis green 'fresh seal' glow seam at bottom */}
      {showGlow && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 38, height: 1,
          background: 'linear-gradient(90deg, transparent, #C8FF00, transparent)',
          boxShadow: '0 0 14px #C8FF00, 0 0 28px rgba(200,255,0,0.5)',
        }} />
      )}

      {/* Animated road-line dashes (bottom) */}
      <div className="road-flow" style={{
        position: 'absolute', left: 0, right: 0, bottom: 18, height: 6,
        backgroundImage: 'repeating-linear-gradient(90deg, #FFD200 0 64px, transparent 64px 128px)',
        backgroundSize: '128px 6px',
        backgroundRepeat: 'repeat-x',
        opacity: 0.95,
      }} />

      {/* Corner brackets */}
      <div style={{ position: 'absolute', left: 56, top: 100 }}>
        <div className="brackets" style={{ width: 30, height: 30 }}><span className="br-tr"/><span className="br-br"/></div>
      </div>
    </section>
  );
}

/* ============================================================
   TRUST BAR
   ============================================================ */
function TrustBar() {
  const items = [
    'Locally Owned',
    'Since 2022',
    'Free Estimates',
    'Residential + Commercial',
    'ADA Striping',
  ];
  return (
    <section style={{
      background: '#0B0B0D', borderTop: '1px solid #26262B', borderBottom: '1px solid #26262B',
      padding: '24px 56px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
      }}>
        {items.map((it, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* yellow chevron mark */}
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M2 8 L7 13 L14 4" stroke="#FFD200" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 500, fontSize: 17,
                color: '#F4F4F5', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>{it}</span>
            </div>
            {i < items.length - 1 && (
              <span style={{ width: 1, height: 28, background: '#26262B' }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, TrustBar });
