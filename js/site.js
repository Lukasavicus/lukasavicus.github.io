// Global components for lukasavicus.github.io (version A). Vanilla JS, no deps.
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var body = document.body;
  // Same order as NAV in _build/build.js (absolute: the site lives at the domain root).
  var PAGES = ['/', '/about.html', '/experience.html', '/projects.html', '/articles/', '/personal.html', '/contact.html'];

  // Dark mode (applied ASAP to avoid flash)
  if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
  var dark = $('#darktoggle');
  if (dark) {
    var sync = function () { var on = document.documentElement.classList.contains('dark'); dark.setAttribute('aria-pressed', on); dark.textContent = on ? 'Light mode' : 'Dark mode'; };
    dark.addEventListener('click', function () { document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); sync(); });
    sync();
  }

  // Hamburger (mobile nav)
  var menu = $('#mobileMenuLink a'), mnav = $('#mobileNav');
  if (menu && mnav) menu.addEventListener('click', function () { var open = mnav.classList.toggle('menu-open'); menu.setAttribute('aria-expanded', open); });

  // Scroll progress + back to top
  var bar = $('#progress'), totop = $('#totop');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? Math.min(100, y / h * 100) : 0) + '%';
    if (totop) totop.hidden = y < 600;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (totop) totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // Keyboard navigation: ↑/↓ or j/k between sections, ←/→ between nav pages
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target, tag = (t.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || t.isContentEditable || t.closest('dialog')) return;
    if ($('dialog[open]')) return;
    var k = e.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') {
      var i = parseInt(body.getAttribute('data-nav'), 10);
      if (isNaN(i) || i < 0) i = 0;
      var n = i + (k === 'ArrowRight' ? 1 : -1);
      if (n >= 0 && n < PAGES.length) location.href = PAGES[n];
      return;
    }
    var dir = (k === 'ArrowDown' || k === 'j') ? 1 : (k === 'ArrowUp' || k === 'k') ? -1 : 0;
    if (!dir) return;
    var secs = $$('#page section');
    if (!secs.length) return;
    e.preventDefault();
    var y = window.scrollY + 1, cur = -1;
    secs.forEach(function (s, idx) { if (s.getBoundingClientRect().top + window.scrollY <= y + 8) cur = idx; });
    var next = Math.max(0, Math.min(secs.length - 1, cur + dir));
    secs[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Ticker (game loading-screen style)
  var ticker = $('.ticker');
  if (ticker) {
    var items = $$('li', ticker), cur = 0;
    if (items.length > 1) setInterval(function () { items[cur].classList.remove('on'); cur = (cur + 1) % items.length; items[cur].classList.add('on'); }, 4000);
  }

  // Modal openers: <a data-open="dialogId">
  $$('[data-open]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); var d = document.getElementById(a.getAttribute('data-open')); if (d && d.showModal) d.showModal(); });
  });
  $$('dialog').forEach(function (d) { d.addEventListener('click', function (e) { if (e.target === d) d.close(); }); });

  // Share buttons
  var url = location.href, title = document.title;
  $$('[data-share]').forEach(function (el) {
    var kind = el.getAttribute('data-share');
    if (kind === 'linkedin') el.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
    else if (kind === 'x') el.href = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
    else if (kind === 'copy') el.addEventListener('click', function () { copyText(url, el, 'Copied!'); });
  });

  // Copy snippets (code shop)
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () { var pre = btn.parentNode.querySelector('pre'); if (pre) copyText(pre.textContent, btn, 'Copied!'); });
  });
  function copyText(text, el, msg) {
    var done = function () { var old = el.textContent; el.textContent = msg; setTimeout(function () { el.textContent = old; }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
  }

  // Footer search: filters sitemap links
  var search = $('#sitesearch'), sitemap = $('#sitemap'), nomatch = $('#nomatch');
  if (search && sitemap) search.addEventListener('input', function () {
    var q = search.value.trim().toLowerCase(), any = false;
    $$('li', sitemap).forEach(function (li) { var hit = !q || li.textContent.toLowerCase().indexOf(q) > -1; li.hidden = !hit; any = any || hit; });
    $$('div', sitemap).forEach(function (col) { col.hidden = !$$('li:not([hidden])', col).length; });
    if (nomatch) nomatch.hidden = any;
  });

  // Carousel: native scroll-snap track; JS only wires arrows + dots (one dot per scroll position)
  $$('[data-carousel]').forEach(function (car) {
    var track = $('.car-track', car), cards = $$('.card', track), dots = $('.car-dots', car), prev = $('.prev', car), next = $('.next', car);
    if (!track || cards.length < 2) { if (prev) prev.hidden = true; if (next) next.hidden = true; return; }
    var step = function () { return cards[0].offsetWidth + (cards[1].offsetLeft - cards[0].offsetLeft - cards[0].offsetWidth); };
    var pages = function () { return Math.max(1, cards.length - Math.round(track.clientWidth / step()) + 1); };
    var idx = function () { return Math.round(track.scrollLeft / step()); };
    var go = function (i) { track.scrollTo({ left: i * step(), behavior: 'smooth' }); };
    function render() {
      var n = pages(), cur = Math.min(idx(), n - 1);
      if (dots) dots.innerHTML = '';
      for (var i = 0; i < n; i++) {
        var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-label', 'Go to position ' + (i + 1)); b.setAttribute('aria-selected', i === cur);
        b.addEventListener('click', go.bind(null, i)); if (dots) dots.appendChild(b);
      }
      if (prev) prev.disabled = cur <= 0;
      if (next) next.disabled = cur >= n - 1;
    }
    if (prev) prev.addEventListener('click', function () { go(idx() - 1); });
    if (next) next.addEventListener('click', function () { go(idx() + 1); });
    var t; track.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(render, 80); }, { passive: true });
    window.addEventListener('resize', render);
    render();
  });

  // Contact form → mailto
  var form = $('#mailform');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements, name = f.name.value.trim(), email = f.email.value.trim(), msg = f.message.value.trim();
    location.href = 'mailto:lukasavicus@gmail.com?subject=' + encodeURIComponent('[A] Hello from your site — ' + name) + '&body=' + encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
  });
})();
