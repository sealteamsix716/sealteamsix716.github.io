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
  // Pairs come from the design comp + image inventory.
  const BA_PAIRS = [
    {
      key: 'garage',
      label: 'YELLOW HOUSE · CLARENCE',
      before: 'images/residential-garage-driveway-before.jpg',
      after: 'images/residential-garage-driveway-after.jpg',
      caption: 'Residential driveway · 2-car · faded asphalt → 2-coat premium seal',
      jobId: 'STS-2025-0142',
      location: 'CLARENCE, NY',
      turn: '1 DAY',
    },
    {
      key: 'autoshop',
      label: 'AUTO SHOP · BUFFALO',
      before: 'images/auto-shop-parking-lot-before.jpg',
      after: 'images/auto-shop-parking-lot-after.jpg',
      caption: 'Commercial parking lot · cracked & faded → crack-filled, sealed, re-striped',
      jobId: 'STS-2025-0089',
      location: 'BUFFALO, NY',
      turn: '2 DAYS',
    },
    {
      key: 'country',
      label: 'COUNTRY DRIVE · WNY',
      before: 'images/country-driveway-sealcoating-before.jpg',
      after: 'images/country-driveway-sealcoating-after.jpg',
      caption: 'Long rural driveway · weathered → restored deep-black finish',
      jobId: 'STS-2024-0211',
      location: 'EAST AURORA, NY',
      turn: '1 DAY',
    },
    {
      key: 'parking',
      label: 'COMMERCIAL LOT · ADA',
      before: 'images/parking-lot-striping-before.jpg',
      after: 'images/parking-lot-striping-after.jpg',
      caption: 'Faded ADA lot → fresh sealcoat + crisp ADA-compliant striping',
      jobId: 'STS-2025-0167',
      location: 'AMHERST, NY',
      turn: '1 DAY',
    },
  ];

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

    const setActive = (idx) => {
      const pair = BA_PAIRS[idx];
      if (!pair) return;
      activeIndex = idx;
      if (beforeImg) {
        beforeImg.src = pair.before;
        beforeImg.alt = `Before — ${pair.caption}`;
      }
      if (afterImg) {
        afterImg.src = pair.after;
        afterImg.alt = `After — ${pair.caption}`;
      }
      if (captionEl) captionEl.textContent = pair.caption;
      if (metaJobId) metaJobId.textContent = pair.jobId;
      if (metaLoc) metaLoc.textContent = pair.location;
      if (metaTurn) metaTurn.textContent = pair.turn;
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
        btn.innerHTML = `<img src="${p.after}" alt="${p.label}" loading="lazy" /><span class="label">${p.label}</span>`;
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
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submit = contactForm.querySelector('button[type=submit]');
      const errorEl = contactForm.querySelector('.form-error');
      const success = document.querySelector('.form-success');
      const fd = new FormData(contactForm);

      // Honeypot
      if (fd.get('_gotcha')) return;

      if (errorEl) errorEl.classList.remove('is-active');
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
        submit.disabled = false;
        submit.innerHTML = originalLabel;
      }
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
