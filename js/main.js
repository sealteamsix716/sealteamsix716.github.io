/* ============================================================
   SEAL TEAM SIX — main.js
   Nav, mobile menu, before/after slider with thumbnails,
   gallery lightbox + filter, contact form submit, scrollspy.
   ============================================================ */

(function () {
  'use strict';

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgoqkqqd';

  /* ----------- NAV: scrolled state + mobile menu ----------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------- BEFORE / AFTER SLIDER ----------- */
  // Photo pairs are registered onto a common viewpoint by
  // scripts/align_before_after.py, so dragging the handle changes the pavement
  // rather than jumping between two different camera positions.
  const BA_WEBP = (() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.toDataURL && c.toDataURL('image/webp').indexOf('data:image/webp') === 0);
    } catch (err) { return false; }
  })();
  const BA_EXT = BA_WEBP ? 'webp' : 'jpg';

  const BA_PAIRS = [
    {
      key: 'residential-drive',
      label: 'RESIDENTIAL DRIVEWAY',
      base: 'images/ba/residential-driveway-clarence',
      caption: 'Residential driveway · faded and patched → fresh two-coat seal',
      service: 'DRIVEWAY SEALCOAT',
      area: 'WESTERN NEW YORK',
      surface: 'RESIDENTIAL ASPHALT',
    },
    {
      key: 'autoshop',
      label: 'AUTO SHOP LOT',
      base: 'images/ba/auto-shop-lot',
      caption: 'Commercial lot · cracked and faded → crack-filled and sealed',
      service: 'COMMERCIAL SEALCOAT',
      area: 'WESTERN NEW YORK',
      surface: 'COMMERCIAL LOT',
    },
    {
      key: 'country',
      label: 'COUNTRY DRIVEWAY',
      base: 'images/ba/country-driveway',
      caption: 'Long rural driveway · weathered → restored deep-black finish',
      service: 'DRIVEWAY SEALCOAT',
      area: 'WESTERN NEW YORK',
      surface: 'RURAL ASPHALT',
    },
  ];
  // Retired: the old "yellow house" pair was 720x540 and its two frames share
  // only 3 matching features — they were never the same viewpoint, which is
  // what made the handle feel wrong. The old "commercial lot · ADA" pair was
  // not a before/after at all: its "before" already had fresh striping down.

  const baSlider = document.querySelector('.ba-slider');
  if (baSlider) {
    let pos = 50;
    let activeIndex = 0;
    let dragging = false;

    const beforeImg = baSlider.querySelector('.ba-before');
    const afterImg = baSlider.querySelector('.ba-after');
    const beforeWrap = baSlider.querySelector('.ba-before-wrap');
    const handle = baSlider.querySelector('.ba-handle');
    const knob = baSlider.querySelector('.ba-knob');
    const captionEl = baSlider.querySelector('.ba-caption-text');
    const dotsEl = baSlider.querySelector('.ba-caption-dots');
    const metaJobId = document.querySelector('[data-ba-jobid]');
    const metaLoc = document.querySelector('[data-ba-loc]');
    const metaTurn = document.querySelector('[data-ba-turn]');

    const update = (p) => {
      pos = Math.max(2, Math.min(98, p));
      if (beforeWrap) beforeWrap.style.width = pos + '%';
      if (beforeImg) {
        // Keep the before-image aligned (not stretched).
        beforeImg.style.width = (10000 / pos) + '%';
      }
      if (handle) handle.style.left = pos + '%';
      if (knob) knob.setAttribute('aria-valuenow', Math.round(pos));
    };

    const moveFromEvent = (e) => {
      const r = baSlider.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      update((x / r.width) * 100);
    };

    baSlider.addEventListener('mousedown', (e) => { dragging = true; moveFromEvent(e); });
    baSlider.addEventListener('touchstart', (e) => { dragging = true; moveFromEvent(e); }, { passive: true });
    window.addEventListener('mousemove', (e) => { if (dragging) moveFromEvent(e); });
    window.addEventListener('touchmove', (e) => { if (dragging) moveFromEvent(e); }, { passive: true });
    window.addEventListener('mouseup', () => { dragging = false; });
    window.addEventListener('touchend', () => { dragging = false; });

    // Keyboard support on the knob
    if (knob) {
      knob.setAttribute('role', 'slider');
      knob.setAttribute('aria-valuemin', '0');
      knob.setAttribute('aria-valuemax', '100');
      knob.setAttribute('aria-valuenow', '50');
      knob.setAttribute('aria-label', 'Before / after slider');
      knob.setAttribute('tabindex', '0');
      knob.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') update(pos - 3);
        else if (e.key === 'ArrowRight') update(pos + 3);
        else if (e.key === 'Home') update(2);
        else if (e.key === 'End') update(98);
      });
    }

    const applySrc = (img, pair, side) => {
      if (!img) return;
      const stem = `${pair.base}-${side}`;
      img.srcset = `${stem}-800.${BA_EXT} 800w, ${stem}-1600.${BA_EXT} 1600w`;
      img.sizes = '(max-width: 900px) 100vw, 960px';
      img.src = `${stem}-1600.${BA_EXT}`;
    };

    const setActive = (idx) => {
      const pair = BA_PAIRS[idx];
      if (!pair) return;
      activeIndex = idx;
      applySrc(beforeImg, pair, 'before');
      applySrc(afterImg, pair, 'after');
      if (beforeImg) beforeImg.alt = `Before — ${pair.caption}`;
      if (afterImg) afterImg.alt = `After — ${pair.caption}`;
      if (captionEl) captionEl.textContent = pair.caption;
      if (metaJobId) metaJobId.textContent = pair.service;
      if (metaLoc) metaLoc.textContent = pair.area;
      if (metaTurn) metaTurn.textContent = pair.surface;
      // dots
      if (dotsEl) {
        dotsEl.innerHTML = '';
        BA_PAIRS.forEach((_, i) => {
          const d = document.createElement('span');
          d.style.cssText = `display:inline-block;width:24px;height:3px;background:${i === idx ? 'var(--yellow)' : 'var(--asphalt-3)'};margin-right:6px;`;
          dotsEl.appendChild(d);
        });
      }
      // thumbnails
      document.querySelectorAll('.ba-thumb').forEach((t, i) => {
        t.classList.toggle('is-active', i === idx);
      });
      update(50);
    };

    // Build thumbnails
    const thumbsHost = document.querySelector('.ba-thumbs');
    if (thumbsHost) {
      thumbsHost.innerHTML = '';
      BA_PAIRS.forEach((p, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ba-thumb';
        if (i === 0) btn.classList.add('is-active');
        // A dedicated 480px thumbnail — this used to point at the full-size
        // "after", so opening the page fetched every pair at display size.
        btn.innerHTML =
          `<img src="${p.base}-thumb-480.${BA_EXT}" alt="" width="480" height="360" ` +
          `loading="lazy" decoding="async" /><span class="label">${p.label}</span>`;
        btn.addEventListener('click', () => setActive(i));
        thumbsHost.appendChild(btn);
      });
    }
    setActive(0);
  }

  /* ----------- GALLERY: filter + lightbox ----------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryFilters = document.querySelectorAll('.gallery-filters button');
  galleryFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'ALL';
      galleryFilters.forEach((b) => b.classList.toggle('is-active', b === btn));
      galleryItems.forEach((it) => {
        const cats = (it.dataset.cat || '').toUpperCase().split(',').map((s) => s.trim());
        const show = filter === 'ALL' || cats.includes(filter);
        it.style.display = show ? '' : 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox?.querySelector('img');
  const lbLabel = lightbox?.querySelector('.lightbox-meta .mil-label');
  const lbTitle = lightbox?.querySelector('.lightbox-meta strong');
  let currentLbIndex = 0;
  const allItems = Array.from(galleryItems);

  function openLightbox(idx) {
    if (!lightbox || !allItems[idx]) return;
    currentLbIndex = idx;
    const item = allItems[idx];
    const img = item.querySelector('img');
    if (lbImg && img) {
      lbImg.src = img.dataset.full || img.src;
      lbImg.alt = img.alt;
    }
    if (lbLabel) lbLabel.textContent = (item.dataset.cat || '').split(',')[0];
    if (lbTitle) lbTitle.textContent = item.dataset.loc || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function navLb(dir) {
    const visible = allItems.filter((it) => it.style.display !== 'none');
    if (!visible.length) return;
    const item = allItems[currentLbIndex];
    let visIdx = visible.indexOf(item);
    visIdx = (visIdx + dir + visible.length) % visible.length;
    openLightbox(allItems.indexOf(visible[visIdx]));
  }

  galleryItems.forEach((it, i) => {
    it.addEventListener('click', () => openLightbox(i));
    it.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  if (lightbox) {
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', () => navLb(-1));
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', () => navLb(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLb(-1);
      if (e.key === 'ArrowRight') navLb(1);
    });
  }

  /* ----------- CONTACT FORM ----------- */
  const contactForm = document.getElementById('estimate-form');
  if (contactForm) {
    window.STSForms?.watch(contactForm);
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submit = contactForm.querySelector('button[type=submit]');
      const errorEl = contactForm.querySelector('.form-error');
      const success = document.querySelector('.form-success');
      const fd = new FormData(contactForm);

      // Honeypot
      if (fd.get('_gotcha')) return;

      if (contactForm.dataset.submitting === 'true') return;

      // The form carries `novalidate`, so nothing was checking the required
      // name and phone before this — blank leads could be submitted.
      if (window.STSForms && !window.STSForms.validate(contactForm)) {
        if (errorEl) {
          errorEl.classList.add('is-active');
          errorEl.textContent = 'Please fix the highlighted fields and try again.';
        }
        return;
      }

      if (errorEl) errorEl.classList.remove('is-active');
      contactForm.dataset.submitting = 'true';
      submit.disabled = true;
      const originalLabel = submit.innerHTML;
      submit.innerHTML = 'SENDING…';

      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST', body: fd,
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('formspree ' + res.status);
        contactForm.style.display = 'none';
        if (success) success.classList.add('is-active');
      } catch (err) {
        if (errorEl) {
          errorEl.classList.add('is-active');
          errorEl.innerHTML = 'Submission hiccup. Call or text us directly at <a href="tel:7169078259" style="color:var(--yellow)">716-907-8259</a> or email <a href="mailto:Seal.Team.Six.Snow@gmail.com" style="color:var(--yellow)">Seal.Team.Six.Snow@gmail.com</a>.';
        }
      } finally {
        delete contactForm.dataset.submitting;
        submit.disabled = false;
        submit.innerHTML = originalLabel;
      }
    });
  }

  /* ----------- SERVICE-AREA MAP <-> TOWN LIST ----------- */
  // The tightly packed inner-ring suburbs are unlabelled dots on the map, so
  // the town list acts as the legend: pointing at either one lights the pair.
  const townPills = document.querySelectorAll('.town-pill[data-town]');
  const townNodes = document.querySelectorAll('.wny-town[data-town]');
  if (townPills.length && townNodes.length) {
    const byTown = new Map();
    const register = (el) => {
      const key = el.dataset.town;
      if (!byTown.has(key)) byTown.set(key, []);
      byTown.get(key).push(el);
    };
    townPills.forEach(register);
    townNodes.forEach(register);

    const light = (key, on) => {
      (byTown.get(key) || []).forEach((el) => el.classList.toggle('is-lit', on));
    };

    byTown.forEach((els, key) => {
      els.forEach((el) => {
        el.addEventListener('mouseenter', () => light(key, true));
        el.addEventListener('mouseleave', () => light(key, false));
      });
    });

    // Keyboard parity: make the pills focusable and light on focus.
    townPills.forEach((pill) => {
      pill.tabIndex = 0;
      const key = pill.dataset.town;
      pill.addEventListener('focus', () => light(key, true));
      pill.addEventListener('blur', () => light(key, false));
    });
  }

  /* ----------- SCROLLSPY (nav active link) ----------- */
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const sections = Array.from(navLinks)
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((s) => spy.observe(s));
  }

  /* ----------- YEAR IN FOOTER ----------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
