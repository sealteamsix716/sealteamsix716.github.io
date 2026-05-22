/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard,
   TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle, useTweaks,
   Nav, Hero, TrustBar, Services, BeforeAfter, Gallery,
   WhyUs, ServiceArea, Contact, Footer,
   MobileHomepage, TokensArtboard,
   Sarge, ChatLauncher, ChatPanel */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "cinematic",
  "tacticalIntensity": "confident",
  "greenGlow": "hero-only",
  "showChatPanel": false
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      <DesignCanvas
        title="SEAL TEAM SIX · Homepage Design"
        subtitle="Tactical-premium · Buffalo, NY · Sealcoating & striping"
      >
        <DCSection id="desktop" title="Desktop · Homepage">
          <DCArtboard id="desktop-home" label="1440 × Full Page" width={1440} height={6800}>
            <DesktopHomepage variant={tweaks.heroVariant} greenGlow={tweaks.greenGlow} />
          </DCArtboard>
        </DCSection>

        <DCSection id="mobile" title="Mobile · 390pt">
          <DCArtboard id="mobile-home" label="iPhone · 390 × full" width={390} height={3640}>
            <MobileHomepage />
          </DCArtboard>
        </DCSection>

        <DCSection id="chat" title="Floating Chatbot · Ask Sarge">
          <DCArtboard id="chat-closed" label="Launcher (collapsed)" width={420} height={300}>
            <ChatLauncherFrame />
          </DCArtboard>
          <DCArtboard id="chat-open" label="Panel (open · step 1)" width={420} height={620}>
            <ChatPanelFrame />
          </DCArtboard>
        </DCSection>

        <DCSection id="tokens" title="Design Tokens">
          <DCArtboard id="tokens" label="System reference · 1440 × full" width={1440} height={2900}>
            <TokensArtboard />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero" subtitle="Cinematic full-bleed photo is primary">
          <TweakSelect
            label="Hero variant"
            value={tweaks.heroVariant}
            onChange={(v) => setTweak('heroVariant', v)}
            options={[
              { value: 'cinematic', label: 'Cinematic photo (default)' },
              { value: 'split',     label: 'Split frame — type + photo' },
              { value: 'canvas',    label: 'Asphalt-as-canvas (no photo)' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Accents">
          <TweakRadio
            label="Hi-vis green glow"
            value={tweaks.greenGlow}
            onChange={(v) => setTweak('greenGlow', v)}
            options={[
              { value: 'none', label: 'Off' },
              { value: 'hero-only', label: 'Hero seam' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function DesktopHomepage({ variant, greenGlow }) {
  return (
    <div style={{ background: '#0B0B0D', overflow: 'hidden' }}>
      <Nav />
      <Hero variant={variant} greenGlow={greenGlow} />
      <TrustBar />
      <Services />
      <BeforeAfter />
      <Gallery />
      <WhyUs />
      <ServiceArea />
      <Contact />
      <Footer />
    </div>
  );
}

function ChatLauncherFrame() {
  return (
    <div className="asphalt-grain" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div className="hud-grid" />
      <div style={{ position: 'absolute', left: 24, top: 24 }}>
        <div className="mil-label">FLOATING LAUNCHER · BOTTOM-RIGHT</div>
      </div>
      <ChatLauncher />
    </div>
  );
}

function ChatPanelFrame() {
  return (
    <div className="asphalt-grain" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div className="hud-grid" />
      <div style={{ position: 'absolute', left: 24, top: 24 }}>
        <div className="mil-label">SCRIPTED FLOW · 11 STEPS · FORMSPREE</div>
      </div>
      <ChatPanel />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
