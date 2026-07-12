// Product-story motion. Hidden states are applied only after GSAP is ready,
// so all content remains available when scripts or the CDN are unavailable.

export function initMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.product-eyebrow', { y: 18, duration: 0.65 })
    .from('.product-hero h1', { y: 34, duration: 1 }, '-=0.35')
    .from('.hero-summary', { y: 22, duration: 0.75 }, '-=0.55')
    .from('.hero-actions > *', { y: 16, duration: 0.55, stagger: 0.09 }, '-=0.4')
    .from('.hero-device', { y: 58, scale: 0.97, duration: 1.05 }, '-=0.2')
    .from('.kpi-row article', { y: 18, duration: 0.45, stagger: 0.07 }, '-=0.45');

  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.18 }
  });

  gsap.to('.hero-shot', {
    yPercent: 6,
    ease: 'none',
    scrollTrigger: {
      trigger: '.product-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.45
    }
  });

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      y: 42,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 84%', once: true }
    });
  });

  document.querySelectorAll('[data-product-visual]').forEach((element) => {
    gsap.from(element, {
      y: 48,
      opacity: 0,
      scale: 0.975,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 86%', once: true }
    });
  });

  gsap.from('#lifecycle > li', {
    y: 22,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#lifecycle', start: 'top 82%', once: true }
  });

  document.querySelectorAll('.ecosystem-grid, .assurance-grid').forEach((grid) => {
    gsap.from(grid.children, {
      y: 34,
      opacity: 0,
      duration: 0.72,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 84%', once: true }
    });
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
