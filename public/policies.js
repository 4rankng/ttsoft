// TingHire policies page — language toggle + scrollspy.
// External file (not inline) because the site's CSP allows scripts only
// from 'self'; content matches the user's reference document.
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll('[data-setlang]');

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-setlang') === lang ? 'true' : 'false');
    });
    try { localStorage.setItem('tinghire-lang', lang); } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-setlang')); });
  });

  var saved = null;
  try { saved = localStorage.getItem('tinghire-lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'vi'); // Vietnamese-first by default.

  var links = document.querySelectorAll('.navlink[data-section]');
  var sections = Array.prototype.map.call(links, function (l) {
    return document.querySelector(l.getAttribute('href'));
  });
  function onScroll() {
    var pos = window.scrollY + 120;
    var current = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= pos) current = i; });
    links.forEach(function (l, i) { l.classList.toggle('active', i === current); });
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
