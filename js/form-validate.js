/* ============================================================
   Shared estimate-form validation.

   Both estimate forms carry `novalidate`, so the browser's own bubbles are
   suppressed — but the Constraint Validation API still reports state, so the
   rules stay declared in the HTML (`required`, `type="email"`) rather than
   duplicated here. This adds the accessible reporting the native UI would
   otherwise have provided: per-field messages, aria-invalid, aria-describedby,
   and focus moved to the first problem.

   Loaded before sarge.js and main.js; exposes window.STSForms.
   ============================================================ */
(function () {
  'use strict';

  var SKIP = ['_gotcha', '_subject', 'source'];

  function wrapOf(el) {
    return el.closest('.field') || el.parentElement;
  }

  function labelOf(el) {
    var lab = null;
    if (el.id) {
      try {
        lab = document.querySelector('label[for="' + CSS.escape(el.id) + '"]');
      } catch (e) { lab = null; }
    }
    if (!lab) {
      var wrap = wrapOf(el);
      lab = wrap && wrap.querySelector('label');
    }
    if (!lab) return 'This field';
    return lab.textContent.replace(/\(optional\)/i, '').replace(/[*:]/g, '').trim();
  }

  function errorNodeFor(el) {
    var wrap = wrapOf(el);
    if (!wrap) return null;
    var node = wrap.querySelector('.field-error');
    if (!node) {
      node = document.createElement('p');
      node.className = 'field-error';
      node.id = (el.id || el.name) + '-error';
      wrap.appendChild(node);
    }
    return node;
  }

  function setError(el, msg) {
    var node = errorNodeFor(el);
    el.setAttribute('aria-invalid', 'true');
    if (!node) return;
    node.textContent = msg;
    node.hidden = false;
    var ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (ids.indexOf(node.id) === -1) ids.push(node.id);
    el.setAttribute('aria-describedby', ids.join(' '));
  }

  function clearError(el) {
    el.removeAttribute('aria-invalid');
    var wrap = wrapOf(el);
    var node = wrap && wrap.querySelector('.field-error');
    if (node) { node.textContent = ''; node.hidden = true; }
  }

  /** Returns an error string, or '' when the control is acceptable. */
  function problemWith(el) {
    var value = (el.value || '').trim();

    if (el.validity && el.validity.valueMissing) {
      return labelOf(el) + ' is required.';
    }
    if (!value) return '';

    if (el.type === 'email' && el.validity && el.validity.typeMismatch) {
      return 'Enter a valid email address, e.g. name@example.com.';
    }
    if (el.type === 'tel') {
      var digits = value.replace(/\D/g, '');
      // Allow a leading US country code.
      if (digits.length === 11 && digits.charAt(0) === '1') digits = digits.slice(1);
      if (digits.length !== 10) {
        return 'Enter a 10-digit phone number, e.g. 716-555-0000.';
      }
    }
    return '';
  }

  function controlsOf(form) {
    return Array.prototype.filter.call(form.elements, function (el) {
      return el.name &&
        SKIP.indexOf(el.name) === -1 &&
        !el.disabled &&
        el.type !== 'hidden' &&
        /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    });
  }

  /** Validate every control; report problems and focus the first. */
  function validate(form) {
    var firstBad = null;
    controlsOf(form).forEach(function (el) {
      var msg = problemWith(el);
      if (msg) {
        setError(el, msg);
        if (!firstBad) firstBad = el;
      } else {
        clearError(el);
      }
    });
    form.dataset.validated = 'true';
    if (firstBad) {
      if (typeof firstBad.scrollIntoView === 'function') {
        firstBad.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
      firstBad.focus({ preventScroll: true });
      return false;
    }
    return true;
  }

  function clear(form) {
    controlsOf(form).forEach(clearError);
    delete form.dataset.validated;
  }

  /** After a failed attempt, keep messages honest as the user corrects them. */
  function watch(form) {
    form.addEventListener('input', function (e) {
      if (form.dataset.validated !== 'true') return;
      var el = e.target;
      if (!el.name || SKIP.indexOf(el.name) !== -1) return;
      if (!problemWith(el)) clearError(el);
    });
    form.addEventListener('blur', function (e) {
      if (form.dataset.validated !== 'true') return;
      var el = e.target;
      if (!el.name || SKIP.indexOf(el.name) !== -1) return;
      var msg = problemWith(el);
      if (msg) setError(el, msg); else clearError(el);
    }, true);
  }

  window.STSForms = {
    validate: validate,
    clear: clear,
    watch: watch,
    problemWith: problemWith,
  };
})();
