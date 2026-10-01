/* site.js — Lucas's small layer: scroll progress, back to top, keyboard navigation,
   timeline hover, copy buttons, contact form (mailto), dialogs. No dependencies. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* progress bar (C18, horizontal) + back to top (C9) */
  var bar = $('#progress'), top = $('#totop');
  var onScroll = function () {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (top) top.classList.toggle('show', window.scrollY > 600);
  };
  if (top) top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* keyboard (C19): ↑/↓ = sections of this page, ←/→ = pages in nav order */
  var PAGES = ['index.html', 'about.html', 'experience.html', 'projects.html', 'personal.html', 'contact.html'];
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if ($('dialog[open]')) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      var cur = location.pathname.split('/').pop() || 'index.html', i = PAGES.indexOf(cur);
      if (i < 0) return;
      var n = i + (e.key === 'ArrowRight' ? 1 : -1);
      if (n < 0 || n >= PAGES.length) return;
      e.preventDefault();
      location.href = PAGES[n];
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      var secs = $$('main section');
      if (!secs.length) return;
      e.preventDefault();
      var y = window.scrollY, tops = secs.map(function (s) { return Math.round(s.getBoundingClientRect().top + y); });
      var idx = -1;
      tops.forEach(function (st, k) { if (st <= y + 8) idx = k; });
      var n2 = e.key === 'ArrowDown' ? idx + 1 : (idx >= 0 && tops[idx] < y - 8 ? idx : idx - 1);
      if (n2 < 0) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      if (n2 >= secs.length) return;
      secs[n2].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* experience & education timeline: a step lights the chips with the same key;
     chips animate once when the grid scrolls into view (same classes the Astro CSS expects) */
  $$('[data-ha]').forEach(function (n) {
    var steps = $$('.ha-step', n), chips = $$('.ha-chip', n), sticky = '';
    var set = function (k) {
      if (k) n.dataset.hl = k; else delete n.dataset.hl;
      steps.forEach(function (s) { s.classList.toggle('on', s.dataset.key === k); });
      chips.forEach(function (c) { c.classList.toggle('lit', !!k && c.dataset.step === k); });
    };
    steps.forEach(function (s) {
      var k = s.dataset.key;
      s.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') set(k); });
      s.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') set(sticky); });
      s.addEventListener('click', function () { sticky = sticky === k ? '' : k; set(sticky || k); });
    });
    var g = $('.ha-grid', n);
    if (!g || g.getBoundingClientRect().top < window.innerHeight * 0.75) return;
    n.classList.add('ha-armed');
    var io = new IntersectionObserver(function (es) {
      if (es.some(function (x) { return x.isIntersecting; })) { n.classList.add('ha-play'); io.disconnect(); }
    }, { rootMargin: '0px 0px -25% 0px' });
    io.observe(g);
  });

  /* copy snippet (C13) */
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = $('[data-code="' + b.dataset.copy + '"]');
      if (!el || !navigator.clipboard) return;
      navigator.clipboard.writeText(el.textContent).then(function () {
        var t = b.textContent; b.textContent = 'Copied'; setTimeout(function () { b.textContent = t; }, 1500);
      });
    });
  });

  /* contact form (C5): builds a mailto, nothing is sent from the page */
  var f = $('#contact-form');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(f);
    location.href = 'mailto:lukasavicus@gmail.com?subject=' + encodeURIComponent('[B] Hello from your site — ' + d.get('name')) +
      '&body=' + encodeURIComponent(d.get('message') + '\n\n— ' + d.get('name') + ' <' + d.get('email') + '>');
  });

  /* dialogs (How it's calculated) */
  $$('[data-dialog]').forEach(function (b) { b.addEventListener('click', function () { var d = $(b.dataset.dialog); if (d) d.showModal(); }); });
  $$('dialog [data-close]').forEach(function (b) { b.addEventListener('click', function () { b.closest('dialog').close(); }); });
  var sel = $('#skill-pick'), out = $('#skill-name');
  if (sel && out) { var upd = function () { out.textContent = sel.value; }; sel.addEventListener('change', upd); upd(); }
})();
