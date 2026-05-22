/* global React */
/* Sarge the Seal — cartoon harbor seal mascot in hi-vis vest + helmet
   On-brand SVG, drawn so it stays crisp at any size.
   Also exports: SargeBadge (silhouette mark), ChatLauncher, ChatPanel mock */

function Sarge({ size = 80, salute = false, style }) {
  // Cartoon harbor seal w/ hi-vis vest, hard hat, sealcoat wand.
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={(size * 220) / 200}
      style={style}
      aria-label="Sarge the Seal"
    >
      <defs>
        <linearGradient id="sealBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5C5F66" />
          <stop offset="0.5" stopColor="#3B3D43" />
          <stop offset="1" stopColor="#26282D" />
        </linearGradient>
        <linearGradient id="sealBelly" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#9CA1A8" />
          <stop offset="1" stopColor="#6B7076" />
        </linearGradient>
        <linearGradient id="vestGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFE066" />
          <stop offset="1" stopColor="#FFD200" />
        </linearGradient>
        <linearGradient id="helmetGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFE066" />
          <stop offset="1" stopColor="#E5BC00" />
        </linearGradient>
      </defs>

      {/* Wand cord (behind body) */}
      <path
        d="M 158 130 Q 184 110 188 80 Q 192 50 170 36"
        stroke="#0B0B0D" strokeWidth="3" fill="none" strokeLinecap="round"
      />

      {/* Body (rounded teardrop) */}
      <path
        d="M 100 60
           C 60 60 38 100 38 140
           C 38 178 65 200 100 200
           C 135 200 162 178 162 140
           C 162 100 140 60 100 60 Z"
        fill="url(#sealBody)"
        stroke="#0B0B0D" strokeWidth="2.5"
      />

      {/* Belly */}
      <ellipse cx="100" cy="155" rx="32" ry="38" fill="url(#sealBelly)" opacity="0.95" />

      {/* Flippers — feet */}
      <ellipse cx="76" cy="198" rx="14" ry="6" fill="#26282D" stroke="#0B0B0D" strokeWidth="2"/>
      <ellipse cx="124" cy="198" rx="14" ry="6" fill="#26282D" stroke="#0B0B0D" strokeWidth="2"/>

      {/* Right flipper (holding wand) */}
      <path
        d="M 145 128 Q 170 130 170 148 Q 170 162 152 158 Z"
        fill="#3B3D43" stroke="#0B0B0D" strokeWidth="2"
      />

      {/* Left flipper (saluting if salute) */}
      {salute ? (
        <path
          d="M 56 110 Q 38 96 44 76 Q 50 60 70 70 L 70 110 Z"
          fill="#3B3D43" stroke="#0B0B0D" strokeWidth="2"
        />
      ) : (
        <path
          d="M 56 128 Q 36 132 38 152 Q 42 168 60 160 Z"
          fill="#3B3D43" stroke="#0B0B0D" strokeWidth="2"
        />
      )}

      {/* HI-VIS VEST */}
      <path
        d="M 64 110 L 64 178 Q 64 188 76 188 L 124 188 Q 136 188 136 178 L 136 110
           L 116 100 L 84 100 Z"
        fill="url(#vestGrad)" stroke="#0B0B0D" strokeWidth="2.5"
      />
      {/* Vest center opening */}
      <path d="M 100 100 L 100 188" stroke="#0B0B0D" strokeWidth="1.5" />
      {/* Reflective bands */}
      <rect x="64" y="140" width="72" height="6" fill="#F4F4F5" opacity="0.95" />
      <rect x="64" y="160" width="72" height="6" fill="#F4F4F5" opacity="0.95" />
      <rect x="64" y="141" width="72" height="1" fill="#9AA0A6" />
      <rect x="64" y="166" width="72" height="1" fill="#9AA0A6" />

      {/* Vest pocket badge — tiny logo nod */}
      <rect x="72" y="118" width="20" height="14" fill="#0B0B0D" />
      <text x="82" y="129" textAnchor="middle"
        fontFamily="Oswald, sans-serif" fontWeight="700"
        fontSize="9" fill="#FFD200">STS</text>

      {/* HEAD */}
      <ellipse cx="100" cy="78" rx="34" ry="30" fill="url(#sealBody)" stroke="#0B0B0D" strokeWidth="2.5"/>

      {/* Snout */}
      <ellipse cx="100" cy="88" rx="14" ry="10" fill="#9CA1A8" />
      <ellipse cx="100" cy="84" rx="3" ry="2.5" fill="#0B0B0D" />
      {/* Mouth */}
      <path d="M 94 92 Q 100 96 106 92" stroke="#0B0B0D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Whiskers */}
      <path d="M 86 90 L 78 88" stroke="#0B0B0D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 86 92 L 78 94" stroke="#0B0B0D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 114 90 L 122 88" stroke="#0B0B0D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 114 92 L 122 94" stroke="#0B0B0D" strokeWidth="1.2" strokeLinecap="round"/>

      {/* Eyes */}
      <ellipse cx="86" cy="74" rx="3.5" ry="4.5" fill="#0B0B0D"/>
      <ellipse cx="114" cy="74" rx="3.5" ry="4.5" fill="#0B0B0D"/>
      <circle cx="87" cy="72.5" r="1.2" fill="#fff"/>
      <circle cx="115" cy="72.5" r="1.2" fill="#fff"/>
      {/* Brow — gives sarge attitude */}
      <path d="M 80 66 L 92 70" stroke="#0B0B0D" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M 108 70 L 120 66" stroke="#0B0B0D" strokeWidth="2.2" strokeLinecap="round"/>

      {/* HARD HAT */}
      <path
        d="M 64 60
           Q 64 32 100 30
           Q 136 32 136 60
           L 136 64 L 64 64 Z"
        fill="url(#helmetGrad)" stroke="#0B0B0D" strokeWidth="2.5"
      />
      {/* Hat brim */}
      <rect x="58" y="60" width="84" height="8" rx="2" fill="#E5BC00" stroke="#0B0B0D" strokeWidth="2"/>
      {/* Hat ridge */}
      <path d="M 100 30 L 100 60" stroke="#E5BC00" strokeWidth="3"/>
      <path d="M 80 32 Q 80 50 80 60" stroke="#E5BC00" strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M 120 32 Q 120 50 120 60" stroke="#E5BC00" strokeWidth="2" fill="none" opacity="0.6"/>

      {/* Hat badge — STS */}
      <rect x="88" y="40" width="24" height="14" fill="#0B0B0D" rx="1"/>
      <text x="100" y="51" textAnchor="middle"
        fontFamily="Oswald, sans-serif" fontWeight="700"
        fontSize="11" fill="#FFD200">STS</text>

      {/* SEALCOAT WAND (right side) */}
      <line x1="148" y1="135" x2="186" y2="42" stroke="#26282D" strokeWidth="5" strokeLinecap="round"/>
      <line x1="148" y1="135" x2="186" y2="42" stroke="#5C5F66" strokeWidth="2" strokeLinecap="round"/>
      {/* Wand spray nozzle */}
      <polygon points="184,38 196,30 200,42 188,50" fill="#3B3D43" stroke="#0B0B0D" strokeWidth="1.5"/>
      {/* Spray droplets */}
      <circle cx="200" cy="22" r="2" fill="#0B0B0D" opacity="0.7"/>
      <circle cx="206" cy="14" r="1.5" fill="#0B0B0D" opacity="0.5"/>
      <circle cx="194" cy="14" r="1.5" fill="#0B0B0D" opacity="0.5"/>
      {/* Wand grip */}
      <rect x="142" y="128" width="14" height="12" rx="2" fill="#0B0B0D"/>
      <rect x="143" y="130" width="12" height="2" fill="#FFD200" opacity="0.6"/>
    </svg>
  );
}

/* Compact circular Sarge for launcher button */
function SargeAvatar({ size = 56 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: '#0B0B0D',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      overflow: 'hidden',
      border: '2px solid #FFD200',
      position: 'relative',
    }}>
      <div style={{ transform: 'translateY(6px) scale(1.05)' }}>
        <Sarge size={size * 0.95} />
      </div>
    </div>
  );
}

/* Floating chat launcher (bottom-right corner) */
function ChatLauncher({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', right: 24, bottom: 24,
        display: 'flex', alignItems: 'center', gap: 14,
        background: '#FFD200',
        color: '#0B0B0D',
        border: 0,
        padding: '8px 22px 8px 8px',
        cursor: 'pointer',
        boxShadow: '0 12px 32px rgba(0,0,0,0.5), 0 0 0 4px rgba(255,210,0,0.18)',
        borderRadius: 999,
        zIndex: 50,
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        background: '#0B0B0D',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ transform: 'translateY(4px) scale(1.0)' }}>
          <Sarge size={52} />
        </div>
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 10, height: 10, borderRadius: '50%',
          background: '#C8FF00',
          boxShadow: '0 0 6px #C8FF00',
        }} />
      </div>
      <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.2em', color: '#0B0B0D', opacity: 0.7, textTransform: 'uppercase' }}>ONLINE</div>
        <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Ask Sarge
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#0B0B0D', opacity: 0.75 }}>
          Free estimate · 30 sec
        </div>
      </div>
    </button>
  );
}

/* Chat panel in open state (for mock) */
function ChatPanel({ onClose }) {
  return (
    <div style={{
      position: 'absolute', right: 24, bottom: 24,
      width: 380, height: 540,
      background: '#141417',
      border: '1px solid #34343A',
      boxShadow: '0 30px 60px rgba(0,0,0,0.65), 0 0 0 4px rgba(255,210,0,0.06)',
      display: 'flex', flexDirection: 'column',
      zIndex: 50,
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: 16, display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid #26262B', background: '#1C1C20',
        position: 'relative',
      }}>
        <div className="hazard-thin" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3 }} />
        <SargeAvatar size={44} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#F4F4F5' }}>
            SARGE · Squad Leader
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#C8FF00', letterSpacing: '0.18em' }}>
            ● ONLINE · TYP. REPLY &lt;5 MIN
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'transparent', border: 0, color: '#9AA0A6',
          fontSize: 22, cursor: 'pointer', lineHeight: 1,
        }}>×</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
        <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
          <div style={{
            background: '#26262B', color: '#F4F4F5',
            padding: '10px 14px', fontSize: 14, lineHeight: 1.45,
            borderRadius: '2px 12px 12px 12px',
          }}>
            Sarge here, Seal Team Six. I'll get your free estimate locked in — takes about 30 seconds. What can we seal up for you?
          </div>
          <div style={{ fontSize: 10, color: '#6B7076', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>09:42</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#FFD200', letterSpacing: '0.18em' }}>
            STEP 01 · SERVICE TYPE
          </div>
          {['Sealcoating', 'Crack Filling', 'Line Striping', 'Multiple / Not sure'].map((opt, i) => (
            <button key={i} style={{
              background: 'transparent',
              border: '1px solid #34343A',
              color: '#F4F4F5',
              padding: '12px 14px',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>{opt}</span>
              <span style={{ color: '#FFD200', fontSize: 12 }}>→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: 10, borderTop: '1px solid #26262B',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: '#0B0B0D',
      }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#6B7076', letterSpacing: '0.18em' }}>
          STEP 1 / 11
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} style={{
              width: 16, height: 3,
              background: i === 0 ? '#FFD200' : '#26262B',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Sarge, SargeAvatar, ChatLauncher, ChatPanel });
