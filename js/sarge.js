/* ============================================================
   ASK SARGE — chatbot
   Static, no backend, no API keys. Fuse.js fuzzy match against
   window.SARGE_KB. Pricing pre-filter forces route-to-form
   regardless of search score. State persisted in localStorage.

   Formspree endpoint is public-safe by design.
   ============================================================ */

const FORMSPREE_FORM_ID = 'mgoqkqqd';
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

const STORAGE_KEY = 'sts.sarge.v1';
const STORAGE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const SUGGESTED_CHIPS = [
  { label: 'How much does it cost?', q: 'How much does it cost?' },
  { label: 'When can you come out?', q: 'How soon can you come out?' },
  { label: 'What is sealcoating?', q: 'What is sealcoating?' },
  { label: 'Do you do ADA striping?', q: 'Do you do ADA / handicap stalls?' },
  { label: 'Do you do snow plowing?', q: 'Do you do snow plowing?' },
  { label: 'Do you serve my town?', q: 'Do you serve my town?' },
];

// Any user input matching this regex skips the fuzzy match and routes to the
// estimate form — the bot must never quote a dollar amount.
const PRICE_REGEX = /(\$|\bprice\b|\bprices\b|\bpricing\b|\bcost\b|\bcosts\b|\bcosting\b|\bexpensive\b|\bcheap\b|\bcheaper\b|\bcheapest\b|\bafford\b|\baffordable\b|\bquote\b|\bquotes\b|\bball\s*park\b|\bballpark\b|\bestimate\s*(amount|number|price|cost|figure)\b|\bhow\s*much\b|\bper\s*(sq|square)\b|\bdollar(s)?\b|\bdeposit\b|\bfinanc\w*\b|\brate\b|\brates\b|\bcharg\w*\b|\bbid\b|\bdown\s*payment\b|\binvoice\b|\bbill\b)/i;

let state = {
  messages: [],
  view: 'chat',
  formDraft: {},
  panelOpen: false,
  nudgeSeen: false,
};

let fuse = null;
let elPanel, elMessages, elInput, elSendBtn, elFormView, elSuccess, elNudge, elLauncher;

/* ----------- STORAGE ----------- */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || !data.savedAt) return;
    if (Date.now() - data.savedAt > STORAGE_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    state.messages = Array.isArray(data.messages) ? data.messages : [];
    state.formDraft = data.formDraft || {};
    state.nudgeSeen = !!data.nudgeSeen;
  } catch { /* ignore */ }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        messages: state.messages.slice(-30),
        formDraft: state.formDraft,
        nudgeSeen: state.nudgeSeen,
      })
    );
  } catch { /* quota issues, ignore */ }
}

/* ----------- DOM HELPERS ----------- */
function timeStamp() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function pushMessage(role, content, opts = {}) {
  state.messages.push({ role, content, t: timeStamp(), ...opts });
  saveState();
  renderMessages();
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v !== false && v != null) node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

/* ----------- RENDERING ----------- */
function renderMessages() {
  if (!elMessages) return;
  elMessages.innerHTML = '';
  state.messages.forEach((m) => {
    if (m.role === 'chips') {
      const wrap = el('div', { class: 'sarge-chips' });
      m.content.forEach((c) => {
        const btn = el('button', {
          class: 'sarge-chip', type: 'button',
          onclick: () => onChipClick(c),
        });
        btn.appendChild(document.createTextNode(c.label));
        wrap.appendChild(btn);
      });
      elMessages.appendChild(wrap);
      return;
    }

    const wrap = el('div', { class: `sarge-msg ${m.role}` });
    wrap.appendChild(el('div', { class: 'bubble' }, m.content));
    if (m.t) wrap.appendChild(el('div', { class: 'time' }, m.t));
    elMessages.appendChild(wrap);
  });
  elMessages.scrollTop = elMessages.scrollHeight;
}

function showTyping() {
  if (!elMessages) return;
  const t = el('div', { class: 'sarge-typing', id: 'sarge-typing' });
  t.appendChild(el('span'));
  t.appendChild(el('span'));
  t.appendChild(el('span'));
  elMessages.appendChild(t);
  elMessages.scrollTop = elMessages.scrollHeight;
}
function hideTyping() {
  const t = document.getElementById('sarge-typing');
  if (t) t.remove();
}

/* ----------- FUSE SEARCH ----------- */
function buildFuse() {
  if (typeof window.Fuse !== 'function' || !window.SARGE_KB) {
    return null;
  }
  return new window.Fuse(window.SARGE_KB, {
    includeScore: true,
    threshold: 0.38,
    distance: 200,
    minMatchCharLength: 2,
    ignoreLocation: true,
    keys: [
      { name: 'question', weight: 0.7 },
      { name: 'keywords', weight: 0.28 },
      { name: 'category', weight: 0.02 },
    ],
  });
}

function findBestMatch(query) {
  if (!fuse) return null;
  const results = fuse.search(query);
  if (!results.length) return null;
  const best = results[0];
  if (best.score > 0.55) return null; // below confidence threshold
  return best.item;
}

/* ----------- CORE FLOW ----------- */
function handleUserInput(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  pushMessage('user', trimmed);

  // PRICE GUARD: any mention of money/quotes hard-routes to the form.
  if (PRICE_REGEX.test(trimmed)) {
    respondAndRoute({
      answer:
        "Fair question, recruit — but every job's different. Price depends on size, condition, prep, and which services you want. I won't throw out a number that's wrong. Two minutes on the estimate form and the crew will get you an accurate quote.",
    });
    return;
  }

  const match = findBestMatch(trimmed);
  if (match) {
    showTyping();
    setTimeout(() => {
      hideTyping();
      if (match.routeToForm) {
        respondAndRoute({ answer: match.answer });
      } else {
        pushMessage('bot', match.answer);
        offerFollowup();
      }
    }, 320);
    return;
  }

  // No good match — friendly fallback with chips + route hint.
  showTyping();
  setTimeout(() => {
    hideTyping();
    pushMessage('bot',
      "I didn't catch that one. Try one of these — or hit Free Estimate and the crew will get back to you straight."
    );
    pushMessage('chips', SUGGESTED_CHIPS);
    pushMessage('chips', [
      { label: '→ Get a Free Estimate', action: 'open-form' },
    ]);
  }, 340);
}

function respondAndRoute({ answer }) {
  pushMessage('bot', answer);
  pushMessage('chips', [
    { label: '→ Get a Free Estimate', action: 'open-form' },
    { label: 'Ask another question', action: 'continue' },
  ]);
}

function offerFollowup() {
  // After answering, offer related options including the form.
  pushMessage('chips', [
    { label: 'Get a Free Estimate', action: 'open-form' },
    { label: 'Ask another question', action: 'continue' },
  ]);
}

function onChipClick(chip) {
  if (chip.action === 'open-form') {
    openFormView('Roger that. Drop your details and the crew will reach out within 24 hours.');
    return;
  }
  if (chip.action === 'continue') {
    pushMessage('bot', "Fire away — what else?");
    if (elInput) elInput.focus();
    return;
  }
  if (chip.q) handleUserInput(chip.q);
}

/* ----------- WELCOME ----------- */
function greetIfNeeded() {
  if (state.messages.length > 0) {
    renderMessages();
    return;
  }
  pushMessage('bot',
    "Sarge here, Seal Team Six. Ask me anything — sealcoating, striping, snow plowing, timing, service area. Or hit Free Estimate and the crew will reach out within 24 hours."
  );
  pushMessage('chips', SUGGESTED_CHIPS);
}

/* ----------- PANEL OPEN/CLOSE ----------- */
function openPanel() {
  if (!elPanel) return;
  state.panelOpen = true;
  elPanel.classList.add('is-open');
  elPanel.setAttribute('aria-hidden', 'false');
  // Hide nudge if visible
  if (elNudge) elNudge.classList.remove('is-visible');
  // Hide launcher while panel is open
  if (elLauncher) elLauncher.classList.add('is-hidden');
  // Focus the input
  setTimeout(() => elInput && elInput.focus(), 60);
  greetIfNeeded();
}

function closePanel() {
  if (!elPanel) return;
  state.panelOpen = false;
  elPanel.classList.remove('is-open');
  elPanel.setAttribute('aria-hidden', 'true');
  if (elLauncher) elLauncher.classList.remove('is-hidden');
  if (elLauncher) elLauncher.focus();
}

/* ----------- ESTIMATE FORM VIEW ----------- */
function openFormView(introMessage) {
  if (!elFormView) return;
  // Hide chat view, show form view
  document.querySelector('.sarge-chat-view')?.classList.add('is-hidden');
  elFormView.classList.add('is-active');
  elSuccess?.classList.remove('is-active');
  // Inject intro message if provided
  const intro = elFormView.querySelector('.intro');
  if (intro && introMessage) intro.textContent = introMessage;
  // Restore draft into fields
  if (state.formDraft) {
    Object.entries(state.formDraft).forEach(([k, v]) => {
      const f = elFormView.querySelector(`[name="${k}"]`);
      if (f) f.value = v;
    });
  }
  // Focus first empty input
  const inputs = elFormView.querySelectorAll('input, textarea, select');
  for (const i of inputs) {
    if (!i.value) { i.focus(); break; }
  }
}

function backToChat() {
  document.querySelector('.sarge-chat-view')?.classList.remove('is-hidden');
  elFormView?.classList.remove('is-active');
  elSuccess?.classList.remove('is-active');
  elInput?.focus();
}

/* ----------- FORMSPREE SUBMIT ----------- */
async function submitForm(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const submitBtn = form.querySelector('button[type=submit]');
  const errorEl = form.querySelector('.form-error');

  if (form.dataset.submitting === 'true') return;

  // Save draft
  const fd = new FormData(form);
  state.formDraft = Object.fromEntries(fd.entries());
  saveState();

  // Honeypot check (anti-spam)
  if (state.formDraft._gotcha) return; // bot caught

  // Per-field validation with focus moved to the first problem.
  if (window.STSForms && !window.STSForms.validate(form)) {
    if (errorEl) {
      errorEl.classList.add('is-active');
      errorEl.textContent = 'Check the highlighted fields, recruit.';
    }
    return;
  }

  if (errorEl) errorEl.classList.remove('is-active');
  form.dataset.submitting = 'true';
  const originalLabel = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.textContent = 'SENDING…';

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('formspree returned ' + res.status);
    showSuccess();
    state.formDraft = {};
    saveState();
    form.reset();
    window.STSForms?.clear(form);
  } catch (err) {
    if (errorEl) {
      errorEl.classList.add('is-active');
      errorEl.innerHTML =
        'Submission hiccup. Call or text us directly at <a href="tel:7169078259" style="color:var(--yellow)">716-907-8259</a> or email <a href="mailto:Seal.Team.Six.Snow@gmail.com" style="color:var(--yellow)">Seal.Team.Six.Snow@gmail.com</a>.';
    }
  } finally {
    delete form.dataset.submitting;
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalLabel;
  }
}

function showSuccess() {
  elFormView?.classList.remove('is-active');
  document.querySelector('.sarge-chat-view')?.classList.add('is-hidden');
  elSuccess?.classList.add('is-active');
}

/* ----------- LAUNCHER + NUDGE TIMING ----------- */
function maybeShowLauncher() {
  if (!elLauncher) return;
  const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 500 : 2500;
  setTimeout(() => {
    elLauncher.classList.add('is-visible');
    if (!state.nudgeSeen && !state.panelOpen) {
      setTimeout(showNudge, 800);
    }
  }, delay);
}

function showNudge() {
  if (!elNudge || state.panelOpen) return;
  elNudge.classList.add('is-visible');
  // auto-dismiss after 10s if not interacted
  setTimeout(() => {
    if (elNudge.classList.contains('is-visible')) {
      elNudge.classList.remove('is-visible');
    }
  }, 10000);
}

function dismissNudge() {
  if (!elNudge) return;
  elNudge.classList.remove('is-visible');
  state.nudgeSeen = true;
  saveState();
}

/* ----------- BIND ----------- */
function bindUI() {
  elPanel = document.getElementById('sarge-panel');
  elMessages = document.getElementById('sarge-messages');
  elInput = document.getElementById('sarge-input');
  elSendBtn = document.getElementById('sarge-send');
  elFormView = document.getElementById('sarge-form-view');
  elSuccess = document.getElementById('sarge-success');
  elNudge = document.getElementById('sarge-nudge');
  elLauncher = document.getElementById('sarge-launcher');

  if (!elLauncher || !elPanel) return;

  // Launcher click
  elLauncher.addEventListener('click', openPanel);

  // Any [data-sarge-open] element opens the panel (Free Estimate buttons, CTAs)
  document.querySelectorAll('[data-sarge-open]').forEach((b) => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      openPanel();
      // If it's specifically requesting form view, open form
      if (b.dataset.sargeOpen === 'form') {
        setTimeout(() => openFormView(), 100);
      }
    });
  });

  // Nudge dismiss + click-to-open
  if (elNudge) {
    const dismiss = elNudge.querySelector('.dismiss');
    if (dismiss) dismiss.addEventListener('click', (e) => { e.stopPropagation(); dismissNudge(); });
    elNudge.addEventListener('click', () => {
      dismissNudge();
      openPanel();
    });
  }

  // Close button
  elPanel.querySelector('.close')?.addEventListener('click', closePanel);

  // ESC to close panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.panelOpen) closePanel();
  });

  // Input submit
  const form = document.getElementById('sarge-input-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = elInput.value;
      elInput.value = '';
      handleUserInput(text);
    });
  }

  // Estimate form submit. The form element *is* elFormView — there has never
  // been a separate #sarge-estimate-form, so the old lookup silently returned
  // null and no submit handler was ever attached.
  if (elFormView instanceof HTMLFormElement) {
    elFormView.addEventListener('submit', submitForm);
    window.STSForms?.watch(elFormView);
  }

  // Back-to-chat button in form view
  document.querySelectorAll('.sarge-back').forEach((b) => {
    b.addEventListener('click', backToChat);
  });
}

/* ----------- INIT ----------- */
function init() {
  loadState();
  bindUI();
  // Build fuse async-ish in case Fuse hasn't loaded yet (script defer order)
  if (window.Fuse) {
    fuse = buildFuse();
  } else {
    const tryBuild = () => {
      if (window.Fuse) { fuse = buildFuse(); }
      else setTimeout(tryBuild, 100);
    };
    tryBuild();
  }
  maybeShowLauncher();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Expose a few helpers for debugging in the browser console.
window.Sarge = {
  open: openPanel,
  close: closePanel,
  ask: handleUserInput,
  state: () => state,
  kb: () => window.SARGE_KB,
};
