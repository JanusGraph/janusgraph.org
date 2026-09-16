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

  /* Theme switcher: a small menu with Light / Dark / System. The saved choice is applied
     before first paint by the inline script in _includes/head.html. */
  var THEME_KEY = 'theme';
  var THEME_COLORS = { light: '#ffffff', dark: '#0b1512' };
  var themeMenu = d.querySelector('[data-theme-menu]');
  var themeButton = d.querySelector('[data-theme-toggle]');
  var themeOptions = d.querySelector('#theme-options');
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
    var effective = theme === 'system' ? (prefersDark.matches ? 'dark' : 'light') : theme;
    if (themeButton) {
      themeButton.setAttribute('aria-label', 'Theme: ' + theme);
      themeButton.setAttribute('title', 'Theme: ' + theme);
    }
    d.querySelectorAll('[data-theme-option]').forEach(function (opt) {
      opt.setAttribute('aria-checked', String(opt.getAttribute('data-theme-option') === theme));
    });
    themeMetas.forEach(function (m) { m.setAttribute('content', THEME_COLORS[effective]); });
  }
  function setThemeMenu(open) {
    if (!themeOptions || !themeButton) return;
    themeOptions.hidden = !open;
    themeButton.setAttribute('aria-expanded', String(open));
    if (open) {
      var checked = themeOptions.querySelector('[aria-checked="true"]') || themeOptions.querySelector('button');
      if (checked) checked.focus();
    }
  }
  if (themeMenu && themeButton && themeOptions) {
    themeButton.addEventListener('click', function () {
      setThemeMenu(themeOptions.hidden);
    });
    themeOptions.querySelectorAll('[data-theme-option]').forEach(function (opt) {
      opt.addEventListener('click', function () {
        applyTheme(opt.getAttribute('data-theme-option'));
        setThemeMenu(false);
        themeButton.focus();
      });
    });
    themeOptions.addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(themeOptions.querySelectorAll('[data-theme-option]'));
      var i = items.indexOf(d.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var step = e.key === 'ArrowDown' ? 1 : -1;
        items[(i + step + items.length) % items.length].focus();
      } else if (e.key === 'Tab') {
        /* Leaving the menu with Tab closes it; the browser moves focus as usual. */
        setThemeMenu(false);
      }
    });
    d.addEventListener('click', function (e) {
      if (!themeOptions.hidden && !themeMenu.contains(e.target)) setThemeMenu(false);
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !themeOptions.hidden) { setThemeMenu(false); themeButton.focus(); }
    });
  }
  var onSchemeChange = function () { syncThemeUI(); };
  if (prefersDark.addEventListener) prefersDark.addEventListener('change', onSchemeChange);
  else if (prefersDark.addListener) prefersDark.addListener(onSchemeChange);
  syncThemeUI();

  /* Mobile navigation */
  var toggle = d.querySelector('.nav-toggle');
  var navPanel = d.querySelector('.site-nav');
  function navFocusables() {
    return navPanel ? navPanel.querySelectorAll('a[href], button:not([disabled])') : [];
  }
  function setNav(open) {
    root.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    /* The panel precedes the toggle in the DOM, so move focus into it on open;
       otherwise Tab would skip straight past the menu into the page. */
    if (open) {
      var first = navFocusables()[0];
      if (first) first.focus();
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
      if (e.key === 'Escape' && root.classList.contains('nav-open')) {
        setNav(false);
        toggle.focus();
      }
    });
    if (navPanel) {
      navPanel.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab' || !root.classList.contains('nav-open')) return;
        var focusable = navFocusables();
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (!e.shiftKey && d.activeElement === last) {
          /* Tab past the last item: close and let focus continue to the header tools. */
          setNav(false);
        } else if (e.shiftKey && d.activeElement === first) {
          /* Shift+Tab from the first item: close and return to the button that opened it. */
          e.preventDefault();
          setNav(false);
          toggle.focus();
        }
      });
    }
    var desktop = w.matchMedia('(min-width: 1200px)');
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
        var item = el.closest('[data-stars-item]');
        if (item) item.hidden = false;
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
