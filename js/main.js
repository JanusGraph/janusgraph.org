/* janusgraph.org — progressive enhancements (no dependencies) */
(function () {
  'use strict';

  var d = document;
  var root = d.documentElement;
  var w = window;

  /* Sticky header: add a border/shadow once the page is scrolled */
  var header = d.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', w.scrollY > 8);
  }
  onScroll();
  w.addEventListener('scroll', onScroll, { passive: true });

  /* Theme switcher: system -> light -> dark -> system. The saved choice is applied
     before first paint by the inline script in _includes/head.html. */
  var THEME_KEY = 'theme';
  var THEME_ORDER = ['system', 'light', 'dark'];
  var THEME_COLORS = { light: '#ffffff', dark: '#0b1512' };
  var themeButton = d.querySelector('[data-theme-toggle]');
  var themeMetas = d.querySelectorAll('meta[name="theme-color"]');
  var prefersDark = w.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') || 'system';
  }
  function applyTheme(theme) {
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
    try {
      if (theme === 'system') localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, theme);
    } catch (e) { /* storage unavailable */ }
    syncThemeUI();
  }
  function syncThemeUI() {
    var theme = currentTheme();
    var next = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length];
    var effective = theme === 'system' ? (prefersDark.matches ? 'dark' : 'light') : theme;
    if (themeButton) {
      var label = 'Theme: ' + theme + '. Switch to ' + next;
      themeButton.setAttribute('aria-label', label);
      themeButton.setAttribute('title', label);
    }
    themeMetas.forEach(function (m) { m.setAttribute('content', THEME_COLORS[effective]); });
  }
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      applyTheme(THEME_ORDER[(THEME_ORDER.indexOf(currentTheme()) + 1) % THEME_ORDER.length]);
    });
  }
  var onSchemeChange = function () { syncThemeUI(); };
  if (prefersDark.addEventListener) prefersDark.addEventListener('change', onSchemeChange);
  else if (prefersDark.addListener) prefersDark.addListener(onSchemeChange);
  syncThemeUI();

  /* Mobile navigation */
  var toggle = d.querySelector('.nav-toggle');
  function setNav(open) {
    root.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setNav(!root.classList.contains('nav-open'));
    });
    d.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
    var desktop = w.matchMedia('(min-width: 1024px)');
    var onDesktop = function (e) { if (e.matches) setNav(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
  }

  /* Reveal sections as they scroll into view */
  var reduceMotion = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in w && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  /* Copy the quick-start commands */
  d.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var scope = d.querySelector(btn.getAttribute('data-copy'));
      if (!scope || !navigator.clipboard) return;
      var text = Array.prototype.map.call(scope.querySelectorAll('[data-cmd]'), function (el) {
        return el.getAttribute('data-cmd');
      }).join('\n');
      navigator.clipboard.writeText(text).then(function () {
        var label = btn.querySelector('.code-copy-label');
        btn.classList.add('copied');
        if (label) label.textContent = 'Copied';
        setTimeout(function () {
          btn.classList.remove('copied');
          if (label) label.textContent = 'Copy';
        }, 1800);
      }).catch(function () {});
    });
  });

  /* GitHub stars and latest release, cached for the session */
  var repo = d.body.getAttribute('data-repo');
  if (repo && w.fetch) {
    var api = 'https://api.github.com/repos/' + repo;

    getJSON(api, function (r) { return { stars: r.stargazers_count }; }).then(function (r) {
      if (!r || typeof r.stars !== 'number') return;
      d.querySelectorAll('[data-stars]').forEach(function (el) {
        el.textContent = compact(r.stars);
        el.hidden = false;
      });
    });

    getJSON(api + '/releases/latest', function (r) { return { tag: r.tag_name, url: r.html_url }; }).then(function (r) {
      if (!r || !r.tag) return;
      d.querySelectorAll('[data-release-tag]').forEach(function (el) { el.textContent = r.tag; });
      if (r.url) {
        d.querySelectorAll('[data-release]').forEach(function (el) { el.setAttribute('href', r.url); });
      }
    });
  }

  function compact(n) {
    return n >= 1000 ? (Math.round(n / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
  }

  function getJSON(url, pick) {
    var key = 'janusgraph:' + url;
    var now = Date.now();
    try {
      var cached = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (cached && now - cached.t < 60 * 60 * 1000) return Promise.resolve(cached.v);
    } catch (e) { /* storage unavailable */ }
    return fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (json) {
        var v = json ? pick(json) : null;
        try { if (v) sessionStorage.setItem(key, JSON.stringify({ t: now, v: v })); } catch (e) { /* ignore */ }
        return v;
      })
      .catch(function () { return null; });
  }
})();
