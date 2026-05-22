/* ============================================================
   HERO 3D SCENE — Three.js
   Receding asphalt plane with animated yellow road-line dashes
   and a moving wet-gloss specular sweep. Lazy-loaded after first
   paint. Falls back to static image when:
     - prefers-reduced-motion is set
     - WebGL is unavailable
     - viewport < 768px wide (mobile keeps the fallback for perf)
   ============================================================ */

const THREE_CDN = 'https://unpkg.com/three@0.160.0/build/three.module.js';

const heroEl = document.querySelector('.hero-canvas');
const fallbackEl = document.querySelector('.hero-fallback');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrow = window.innerWidth < 768;

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
}

function useFallback() {
  if (fallbackEl) fallbackEl.style.display = 'block';
  if (heroEl) heroEl.style.display = 'none';
}

async function init() {
  if (!heroEl) return;
  if (reducedMotion || isNarrow || !hasWebGL()) {
    useFallback();
    return;
  }

  let THREE;
  try {
    THREE = await import(THREE_CDN);
  } catch (e) {
    console.warn('three.js load failed; using fallback', e);
    useFallback();
    return;
  }

  // Hide fallback once 3D is up
  if (fallbackEl) fallbackEl.style.display = 'none';

  const w = heroEl.clientWidth;
  const h = heroEl.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  heroEl.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0B0B0D, 18, 60);

  const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 200);
  camera.position.set(0, 2.6, 8);
  camera.lookAt(0, 0, -20);

  // ---- Asphalt plane (custom shader) ----
  const planeGeo = new THREE.PlaneGeometry(200, 200, 1, 1);
  const planeMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorBase: { value: new THREE.Color(0x0B0B0D) },
      uColorGloss: { value: new THREE.Color(0x1A1A20) },
      uYellow: { value: new THREE.Color(0xFFD200) },
      uGlossSpeed: { value: 0.45 },
      uDashSpeed: { value: 2.2 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      varying vec3 vWorld;

      uniform float uTime;
      uniform vec3 uColorBase;
      uniform vec3 uColorGloss;
      uniform vec3 uYellow;
      uniform float uGlossSpeed;
      uniform float uDashSpeed;

      // hash & noise for asphalt grain
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      void main() {
        // Use world coords so the surface texture stays stable as camera moves.
        vec2 p = vWorld.xz * 1.6;

        // Asphalt base: dark with subtle grain noise.
        float grain = noise(p * 8.0) * 0.05 + noise(p * 32.0) * 0.025;
        vec3 col = uColorBase + vec3(grain);

        // Wet-gloss specular sweep — diagonal band sliding across the plane.
        float sweepCoord = (vWorld.x * 0.30 + vWorld.z * 0.10) - uTime * uGlossSpeed;
        float sweep = exp(-pow(mod(sweepCoord + 30.0, 8.0) - 4.0, 2.0) * 0.5) * 0.55;
        col = mix(col, uColorGloss + vec3(0.06, 0.06, 0.08), sweep);

        // Yellow center-line dashes (continuously scrolling toward camera).
        float centerWidth = 0.22;
        float centerMask = smoothstep(centerWidth, centerWidth - 0.06, abs(vWorld.x));

        // dash pattern: 1.0 unit on, 1.5 unit off, scrolling along z
        float dashCoord = vWorld.z + uTime * uDashSpeed;
        float dashCycle = mod(dashCoord, 2.5);
        float dashMask = smoothstep(1.0, 0.95, dashCycle);

        // Fade dashes that are very close to the camera (vWorld.z > 6) and very far (< -50).
        float zNear = vWorld.z;
        float dashFade = smoothstep(7.0, 4.0, zNear) * smoothstep(-55.0, -50.0, zNear);

        float dash = centerMask * dashMask * dashFade;
        col = mix(col, uYellow, dash);

        // Side rumble lines (edge of road) — subtle yellow
        float edge = smoothstep(4.5, 4.6, abs(vWorld.x)) * smoothstep(4.8, 4.7, abs(vWorld.x));
        col = mix(col, uYellow * 0.6, edge * 0.4);

        // Vignette toward edges using radial distance from camera ground point
        float v = smoothstep(80.0, 8.0, length(vec2(vWorld.x, vWorld.z + 20.0)));
        col *= mix(0.55, 1.0, v);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = 0;
  scene.add(plane);

  // ---- Faint horizon glow ----
  const glowGeo = new THREE.PlaneGeometry(80, 4);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xFFD200, transparent: true, opacity: 0.10,
    blending: THREE.AdditiveBlending,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(0, 0.6, -45);
  scene.add(glow);

  // ---- Hi-vis seam line (where horizon meets asphalt) ----
  const seamGeo = new THREE.PlaneGeometry(80, 0.06);
  const seamMat = new THREE.MeshBasicMaterial({
    color: 0xC8FF00, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending,
  });
  const seam = new THREE.Mesh(seamGeo, seamMat);
  seam.position.set(0, 0.05, -45);
  scene.add(seam);

  // ---- Lighting (mostly for the glow; the asphalt has its own shader) ----
  const amb = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(amb);
  const key = new THREE.DirectionalLight(0xFFD200, 0.4);
  key.position.set(8, 12, 4);
  scene.add(key);

  // ---- Mouse parallax ----
  let mx = 0, my = 0, tx = 0, ty = 0;
  const onMouse = (e) => {
    const rect = heroEl.getBoundingClientRect();
    mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };
  window.addEventListener('pointermove', onMouse);

  // ---- Resize ----
  const onResize = () => {
    const W = heroEl.clientWidth;
    const H = heroEl.clientHeight;
    if (!W || !H) return;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  // ---- Visibility / pause when offscreen ----
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }, { rootMargin: '0px', threshold: 0 });
  io.observe(heroEl);

  // ---- Animate ----
  const clock = new THREE.Clock();
  function tick() {
    if (visible) {
      const dt = clock.getDelta();
      planeMat.uniforms.uTime.value += dt;

      // Eased parallax
      tx += (mx * 0.35 - tx) * 0.04;
      ty += (my * 0.18 - ty) * 0.04;
      camera.position.x = tx;
      camera.position.y = 2.6 - ty * 0.6;
      camera.lookAt(0, 0.2, -20);

      // Pulse the seam slightly
      seam.material.opacity = 0.45 + Math.sin(performance.now() * 0.0015) * 0.12;
      glow.material.opacity = 0.08 + Math.sin(performance.now() * 0.0012 + 0.5) * 0.04;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Lazy-init after first paint to avoid blocking initial render.
if (document.readyState === 'complete') {
  setTimeout(init, 80);
} else {
  window.addEventListener('load', () => setTimeout(init, 80));
}
