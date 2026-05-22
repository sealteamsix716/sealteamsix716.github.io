/* global React */
/* Desktop sections — part 2: Services, BeforeAfter slider, Gallery */

function Services() {
  const services = [
    {
      n: '01', name: 'Sealcoating',
      desc: 'Premium commercial-grade sealer. Protects against UV, water, gas, and Buffalo winters.',
      icon: 'spray',
      bullets: ['2-coat application', 'Edge-cut precision', 'Cures in 24 hrs'],
    },
    {
      n: '02', name: 'Crack Filling',
      desc: 'Hot-pour rubberized sealant fills cracks before they spread. Stop water before it wins.',
      icon: 'crack',
      bullets: ['Hot-pour rubber', 'Routed if needed', 'Done before sealcoat'],
    },
    {
      n: '03', name: 'Line Striping',
      desc: 'Crisp, code-compliant lines. Standard layouts, ADA stalls, arrows, fire lanes.',
      icon: 'lines',
      bullets: ['Latex traffic paint', 'ADA compliant', 'Stencil work'],
    },
    {
      n: '04', name: 'Hot Asphalt & Patching',
      desc: 'Pothole repair, edge restoration, patch work. We don\'t paint over problems.',
      icon: 'patch',
      bullets: ['Hot-mix patches', 'Saw-cut edges', 'Compacted finish'],
    },
    {
      n: '05', name: 'Concrete',
      desc: 'Curbs, walkways, aprons — handled through our partner crew Xquisit Concrete.',
      icon: 'concrete',
      bullets: ['Via Xquisit Concrete', 'Aprons & walks', 'One point of contact'],
      tag: 'PARTNER',
    },
    {
      n: '06', name: 'Snow + Salting',
      desc: 'Winter plowing, salting, walkways. The crew that sealed your lot keeps it clear.',
      icon: 'snow',
      bullets: ['24/7 storm response', 'Salting & de-icing', 'Sidewalks too'],
      tag: 'SEASONAL',
    },
  ];
  return (
    <section id="services" className="asphalt-grain" style={{ padding: '100px 56px 110px', position: 'relative' }}>
      <div className="road-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56 }}>
          <div>
            <div className="mil-label" style={{ marginBottom: 14 }}>
              ↓ SECTION 01 / 06 — MISSION CAPABILITIES
            </div>
            <h2 className="display" style={{ fontSize: 84, color: '#F4F4F5', margin: 0, maxWidth: 880 }}>
              SIX SERVICES.<br/>
              <span style={{ color: '#FFD200' }}>ZERO</span> SHORTCUTS.
            </h2>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.55,
            color: '#9AA0A6', maxWidth: 360, marginBottom: 12,
          }}>
            Whether it's a 600 sq ft driveway in Clarence or a 60,000 sq ft commercial lot off Walden — same crew, same materials, same finish.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#26262B' }}>
          {services.map((s, i) => (
            <article key={i} style={{
              background: '#141417', padding: '36px 32px 32px',
              minHeight: 320, position: 'relative',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                <ServiceIcon name={s.icon} />
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#FFD200', letterSpacing: '0.18em' }}>
                  S/{s.n}
                </div>
              </div>
              <h3 className="display" style={{ fontSize: 32, color: '#F4F4F5', margin: 0, marginBottom: 10 }}>
                {s.name}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: '#9AA0A6', lineHeight: 1.55, margin: 0, marginBottom: 20 }}>
                {s.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto' }}>
                {s.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#BFC4C9' }}>
                    <span style={{ width: 8, height: 1.5, background: '#FFD200' }} />
                    {b}
                  </li>
                ))}
              </ul>
              {s.tag && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#0B0B0D',
                  background: '#FFD200', padding: '3px 8px', letterSpacing: '0.18em',
                }}>{s.tag}</div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ name }) {
  // Custom monoline icons in safety yellow
  const stroke = '#FFD200';
  const props = { stroke, fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'spray':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          {/* sealcoat wand */}
          <path d="M30 6 L38 14 L18 34 L10 32 L12 24 Z" {...props} />
          <path d="M14 30 L22 22" {...props} />
          {/* droplets */}
          <circle cx="35" cy="10" r="1.5" fill={stroke} />
          <circle cx="32" cy="6" r="1" fill={stroke} />
          <circle cx="38" cy="6" r="1" fill={stroke} />
        </svg>
      );
    case 'crack':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <rect x="6" y="14" width="32" height="20" {...props} />
          <path d="M14 14 L18 22 L14 28 L20 34" {...props} />
          <path d="M30 14 L26 22 L32 26" {...props} />
        </svg>
      );
    case 'lines':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <rect x="4" y="6" width="36" height="32" {...props} />
          <path d="M22 10 L22 14 M22 18 L22 22 M22 26 L22 30 M22 34 L22 38" {...props} />
          <path d="M30 10 L30 38" {...props} />
          <path d="M14 10 L14 38" {...props} />
        </svg>
      );
    case 'patch':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <path d="M4 30 L40 30" {...props} />
          <path d="M10 30 Q14 16 22 18 Q30 20 34 30" {...props} />
          <path d="M14 30 L14 26 L18 26 L18 22 L22 22 L22 26 L28 26 L28 30" {...props} />
        </svg>
      );
    case 'concrete':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <rect x="6" y="8" width="32" height="28" {...props} />
          <path d="M6 16 L38 16 M6 24 L38 24" {...props} />
          <path d="M14 8 L14 16 M22 16 L22 24 M30 24 L30 36 M14 24 L14 36" {...props} />
        </svg>
      );
    case 'snow':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <path d="M22 6 L22 38 M6 22 L38 22" {...props} />
          <path d="M10 10 L34 34 M34 10 L10 34" {...props} />
          <path d="M18 10 L22 6 L26 10 M18 34 L22 38 L26 34" {...props} />
          <path d="M10 18 L6 22 L10 26 M34 18 L38 22 L34 26" {...props} />
        </svg>
      );
    default: return null;
  }
}

/* ============================================================
   BEFORE / AFTER — interactive draggable slider
   ============================================================ */
function BeforeAfter() {
  const [pos, setPos] = React.useState(52);
  const ref = React.useRef(null);
  const dragging = React.useRef(false);

  const onMove = React.useCallback((e) => {
    if (!dragging.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const p = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPos(p);
  }, []);

  React.useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', up);
    };
  }, [onMove]);

  return (
    <section id="our-work" style={{ background: '#0B0B0D', padding: '110px 56px', position: 'relative' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <div className="mil-label" style={{ marginBottom: 14 }}>
              ↓ SECTION 02 / 06 — BEFORE / AFTER
            </div>
            <h2 className="display" style={{ fontSize: 84, color: '#F4F4F5', margin: 0 }}>
              SEE THE<br/>
              <span style={{ color: '#FFD200' }}>DIFFERENCE.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
            <div>
              <div className="mil-label-white">JOB ID</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22, color: '#F4F4F5', letterSpacing: '0.04em', marginTop: 4 }}>
                STS-2024-0142
              </div>
            </div>
            <div>
              <div className="mil-label-white">LOCATION</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22, color: '#F4F4F5', letterSpacing: '0.04em', marginTop: 4 }}>
                CLARENCE, NY
              </div>
            </div>
            <div>
              <div className="mil-label-white">TURNAROUND</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22, color: '#F4F4F5', letterSpacing: '0.04em', marginTop: 4 }}>
                1 DAY
              </div>
            </div>
          </div>
        </div>

        {/* The slider */}
        <div
          ref={ref}
          style={{
            position: 'relative', width: '100%', height: 620,
            overflow: 'hidden', cursor: 'ew-resize',
            border: '1px solid #26262B',
            userSelect: 'none',
          }}
          onMouseDown={(e) => { dragging.current = true; onMove(e); }}
          onTouchStart={(e) => { dragging.current = true; onMove(e); }}
        >
          {/* AFTER (full background) */}
          <img src="images/garage-after.jpg" alt="After sealcoating"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

          {/* BEFORE (clipped) */}
          <div style={{ position: 'absolute', inset: 0, width: `${pos}%`, overflow: 'hidden' }}>
            <img src="images/garage-before.jpg" alt="Before sealcoating"
              style={{ position: 'absolute', inset: 0, width: `${(100 / pos) * 100}%`, height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Labels */}
          <div style={{
            position: 'absolute', top: 28, left: 28,
            background: 'rgba(11,11,13,0.85)', backdropFilter: 'blur(8px)',
            padding: '10px 16px', border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <div className="mil-label-white" style={{ fontSize: 10 }}>STATUS</div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22, color: '#FF3D2E', letterSpacing: '0.06em' }}>
              ▲ BEFORE
            </div>
          </div>
          <div style={{
            position: 'absolute', top: 28, right: 28,
            background: 'rgba(11,11,13,0.85)', backdropFilter: 'blur(8px)',
            padding: '10px 16px', border: '1px solid rgba(255,210,0,0.4)',
          }}>
            <div className="mil-label-white" style={{ fontSize: 10 }}>STATUS</div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22, color: '#FFD200', letterSpacing: '0.06em' }}>
              ★ MISSION COMPLETE
            </div>
          </div>

          {/* Drag handle */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: `${pos}%`,
            width: 2, background: '#FFD200',
            boxShadow: '0 0 18px rgba(255,210,0,0.6)',
            transform: 'translateX(-1px)',
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 56, height: 56, borderRadius: '50%',
              background: '#FFD200',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(255,210,0,0.5), 0 8px 24px rgba(0,0,0,0.5)',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22">
                <path d="M7 4 L1 11 L7 18 M15 4 L21 11 L15 18" stroke="#0B0B0D" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{
              position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#FFD200',
              letterSpacing: '0.2em', whiteSpace: 'nowrap', background: 'rgba(11,11,13,0.85)',
              padding: '3px 8px', border: '1px solid rgba(255,210,0,0.3)',
            }}>← DRAG →</div>
          </div>

          {/* Reticle corners */}
          <div className="brackets" style={{ position: 'absolute', inset: 12 }}>
            <span className="br-tr" /><span className="br-br" />
          </div>

          {/* Bottom caption strip */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: '14px 28px',
            background: 'linear-gradient(0deg, rgba(11,11,13,0.95), transparent)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#F4F4F5' }}>
              Residential driveway · 2-car · faded asphalt → 2-coat premium seal
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width: 24, height: 3, background: i === 0 ? '#FFD200' : '#26262B' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Job thumbnails (other before/afters) */}
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { img: 'images/garage-after.jpg', label: 'YELLOW HOUSE · CLARENCE', active: true },
            { img: 'images/auto-shop-after.jpg', label: 'AUTO SHOP · BUFFALO' },
            { img: 'images/school-drive.jpg', label: 'CHARTER SCHOOL · BUFFALO' },
            { img: 'images/residential-parking.jpg', label: 'RESIDENTIAL LOT · AMHERST' },
          ].map((t, i) => (
            <button key={i} style={{
              position: 'relative', height: 88, border: 0, padding: 0, cursor: 'pointer',
              outline: t.active ? '2px solid #FFD200' : '1px solid #26262B',
              outlineOffset: t.active ? -2 : -1,
              background: '#0B0B0D', overflow: 'hidden',
            }}>
              <img src={t.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: t.active ? 1 : 0.7 }} />
              <div style={{
                position: 'absolute', left: 8, bottom: 8,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#F4F4F5',
                letterSpacing: '0.18em', background: 'rgba(11,11,13,0.85)', padding: '3px 6px',
              }}>
                {t.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GALLERY
   ============================================================ */
function Gallery() {
  const shots = [
    { img: 'images/residential-1.jpg', cat: 'RESIDENTIAL', loc: 'Clarence, NY', span: 'col-span-2 row-span-2' },
    { img: 'images/school-ada.jpg', cat: 'SCHOOLS · ADA', loc: 'Buffalo, NY' },
    { img: 'images/residential-2.jpg', cat: 'RESIDENTIAL', loc: 'Amherst, NY' },
    { img: 'images/auto-shop-after.jpg', cat: 'COMMERCIAL', loc: 'Buffalo, NY', span: 'col-span-2' },
    { img: 'images/school-drive.jpg', cat: 'SCHOOLS', loc: 'Buffalo, NY' },
    { img: 'images/residential-parking.jpg', cat: 'RESIDENTIAL LOT', loc: 'Amherst, NY' },
  ];

  return (
    <section id="gallery" className="asphalt-grain" style={{ padding: '110px 56px', position: 'relative' }}>
      <div className="road-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <div className="mil-label" style={{ marginBottom: 14 }}>
              ↓ SECTION 03 / 06 — MISSION ARCHIVE
            </div>
            <h2 className="display" style={{ fontSize: 84, color: '#F4F4F5', margin: 0 }}>
              FIELD<br/>
              <span style={{ color: '#FFD200' }}>REPORTS.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {['ALL', 'RESIDENTIAL', 'LUXURY', 'COMMERCIAL', 'SCHOOLS'].map((f, i) => (
              <button key={i} style={{
                background: i === 0 ? '#FFD200' : 'transparent',
                color: i === 0 ? '#0B0B0D' : '#9AA0A6',
                border: i === 0 ? 0 : '1px solid #34343A',
                padding: '8px 14px',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                letterSpacing: '0.2em', cursor: 'pointer',
              }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Masonry-ish grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '240px',
          gap: 8,
        }}>
          {shots.map((s, i) => {
            const isLarge = s.span === 'col-span-2 row-span-2';
            const isWide = s.span === 'col-span-2';
            return (
              <div key={i} style={{
                position: 'relative',
                gridColumn: isLarge || isWide ? 'span 2' : 'span 1',
                gridRow: isLarge ? 'span 2' : 'span 1',
                overflow: 'hidden',
                background: '#141417',
              }}>
                <img src={s.img} alt={s.cat}
                  style={{ width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform .5s ease', }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(0deg, rgba(11,11,13,0.92) 0%, transparent 45%)',
                }} />
                <div style={{
                  position: 'absolute', left: 16, bottom: 14, right: 16,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                }}>
                  <div>
                    <div className="mil-label" style={{ fontSize: 10, marginBottom: 4 }}>{s.cat}</div>
                    <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: 18, color: '#F4F4F5', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {s.loc}
                    </div>
                  </div>
                  <div style={{
                    width: 32, height: 32, border: '1px solid rgba(255,255,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 11 L11 3 M11 3 L5 3 M11 3 L11 9" stroke="#FFD200" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  </div>
                </div>

                {/* Corner reticle */}
                {isLarge && (
                  <>
                    <div style={{ position: 'absolute', top: 12, left: 12 }}>
                      <div className="brackets" style={{ width: 24, height: 24 }}><span className="br-tr"/><span className="br-br"/></div>
                    </div>
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#FFD200',
                      letterSpacing: '0.2em', background: 'rgba(11,11,13,0.7)',
                      padding: '3px 8px', border: '1px solid rgba(255,210,0,0.3)',
                    }}>FEATURED</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="#" className="btn btn-ghost" style={{ fontSize: 14 }}>
            VIEW FULL ARCHIVE <span className="arrow-r" />
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Services, BeforeAfter, Gallery });
