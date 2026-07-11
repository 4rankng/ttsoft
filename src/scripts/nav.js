// Sticky navigation state + accessible mobile menu.

export function initNav() {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobilePanel = document.getElementById('mobilePanel');
  const mobileLinks = mobilePanel.querySelectorAll('a');

  const syncHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Mở menu');
    mobilePanel.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const nextState = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(nextState));
    menuToggle.setAttribute('aria-label', nextState ? 'Đóng menu' : 'Mở menu');
    mobilePanel.classList.toggle('is-open', nextState);
    document.body.classList.toggle('menu-open', nextState);
  });

  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('scroll', syncHeaderState, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeMenu();
  });
  syncHeaderState();
}
