// Sticky navigation state. The header collapses to a brand mark plus the
// Messenger/Zalo contact buttons, so there is no menu to toggle.

export function initNav() {
  const header = document.getElementById('siteHeader');

  const syncHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  window.addEventListener('scroll', syncHeaderState, { passive: true });
  syncHeaderState();
}
