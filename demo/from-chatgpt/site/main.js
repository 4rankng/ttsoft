const root = document.documentElement;
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');
const progress = document.querySelector('.page-progress span');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const updateScrollUI = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 18);
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (progress) progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
};

updateScrollUI();
window.addEventListener('scroll', updateScrollUI, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
  }
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const revealNodes = [...document.querySelectorAll('.reveal')];
if (reducedMotion.matches || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealNodes.forEach((node) => revealObserver.observe(node));
}

// The 3D scene is decorative and deliberately loaded after the core HTML/CSS.
// This keeps the headline and primary call-to-action independent of WebGL and Three.js.
const sceneWrap = document.querySelector('[data-scene-wrap]');
const canUseWebGL = (() => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
})();

const sceneDisabled = new URLSearchParams(window.location.search).has('no3d');

if (sceneWrap && canUseWebGL && !sceneDisabled) {
  let requested = false;
  const loadScene = () => {
    if (requested) return;
    requested = true;
    import('./scene.js').catch((error) => {
      console.info('Không tải được hiệu ứng 3D; đang dùng minh họa CSS.', error);
    });
  };

  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadScene();
        observer.disconnect();
      }
    }, { rootMargin: '250px' });
    sceneObserver.observe(sceneWrap);
  } else if ('requestIdleCallback' in window) {
    requestIdleCallback(loadScene, { timeout: 1400 });
  } else {
    window.setTimeout(loadScene, 500);
  }
}
