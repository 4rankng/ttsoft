// TransTing manual — sidebar scroll-spy + mobile navigation drawer.
(() => {
  const layout = document.getElementById('manLayout');
  const nav = document.getElementById('manSidenav');
  const toggle = document.getElementById('manNavToggle');
  if (!layout || !nav || !toggle) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const targets = links
    .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  // ── Mobile drawer ────────────────────────────────────────────────────
  const setOpen = (open) => {
    layout.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      const first = nav.querySelector('a');
      if (first) first.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => setOpen(!layout.classList.contains('nav-open')));
  document.getElementById('manNavScrim')?.addEventListener('click', () => setOpen(false));
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && layout.classList.contains('nav-open')) setOpen(false);
  });

  // ── Scroll-spy ───────────────────────────────────────────────────────
  const setActive = (id) => {
    for (const a of links) {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    }
  };

  const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;

  const visible = () => {
    const line = window.scrollY + 140;
    let current = targets[0]?.id;
    for (const t of targets) {
      if (docTop(t) <= line) current = t.id;
    }
    return current;
  };

  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActive(visible()));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
