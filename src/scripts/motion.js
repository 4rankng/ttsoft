// GSAP cinematic choreography. Every initial hidden state is applied by
// JavaScript, so the page remains fully legible if the CDN is blocked.

export function initMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  // Hero hook: staggered fade-up with the requested power3 choreography.
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTimeline
    .from('.nav-shell', { y: -22, opacity: 0, duration: 0.8 })
    .from('.hero-kicker', { y: 20, opacity: 0, duration: 0.8 }, '-=0.35')
    .from('.hero-title .line', { y: 30, opacity: 0, duration: 1.2, stagger: 0.11 }, '-=0.45')
    .from('.hero-lead', { y: 24, opacity: 0, duration: 0.9 }, '-=0.75')
    .from('.hero-actions > *', { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 }, '-=0.6')
    .from('.hero-note span', { y: 12, opacity: 0, duration: 0.55, stagger: 0.06 }, '-=0.4')
    .from('.hero-benefit', { y: 20, opacity: 0, duration: 0.65, stagger: 0.08 }, '-=0.4');

  // Excel fragments begin scattered, assemble, then hand off to dashboard.
  gsap.set('.dashboard-card', { opacity: 0, y: 64, scale: 0.94 });
  gsap.set('.floating-label, .system-ribbon', { opacity: 0, scale: 0.86 });

  const visualTimeline = gsap.timeline({ delay: 0.35, defaults: { ease: 'power3.out' } });
  visualTimeline
    .from('.excel-card', { x: 70, y: -42, rotation: 7, opacity: 0, duration: 1.05 })
    .from('[data-fragment]', {
      x: () => gsap.utils.random(-180, 190),
      y: () => gsap.utils.random(-150, 170),
      rotation: () => gsap.utils.random(-55, 55),
      opacity: 0,
      scale: () => gsap.utils.random(0.55, 1.25),
      duration: 1.15,
      stagger: 0.08,
      ease: 'back.out(1.35)'
    }, '-=0.55')
    .to('[data-fragment]', { x: -38, y: 58, opacity: 0.12, scale: 0.62, duration: 0.85, stagger: 0.045, ease: 'power2.inOut' }, 'handoff')
    .to('.excel-card', { y: -18, scale: 0.94, opacity: 0.86, duration: 0.85 }, 'handoff')
    .to('.dashboard-card', { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'back.out(1.22)' }, 'handoff-=0.15')
    .to('.floating-label', { opacity: 1, scale: 1, duration: 0.75, stagger: 0.11, ease: 'back.out(1.6)' }, '-=0.55')
    .to('.system-ribbon', { opacity: 1, scale: 1, duration: 0.65 }, '-=0.45')
    .from('.bar-chart i', { scaleY: 0, duration: 0.9, stagger: 0.055, ease: 'power3.out' }, '-=0.55');

  // Gentle idle breathing keeps the hero system feeling alive.
  gsap.to('.excel-card', { y: '-=7', duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.dashboard-card', { y: '+=6', duration: 4.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });
  gsap.to('.floating-label', {
    y: (index) => index % 2 ? 7 : -7,
    duration: (index) => 3.2 + index * 0.35,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.15
  });

  // Generic reveal utility for narrative copy and supporting panels.
  document.querySelectorAll('[data-reveal]').forEach((element) => {
    element.classList.add('reveal-ready');
    gsap.from(element, {
      y: 44,
      opacity: 0,
      duration: 0.95,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 86%',
        once: true
      }
    });
  });

  // "Cách đồng hành" cards assemble from alternating lateral directions.
  gsap.from('#approachGrid .approach-card', {
    x: (index) => (index - 1) * 56,
    y: 56,
    rotation: (index) => (index - 1) * 2.5,
    opacity: 0,
    scale: 0.94,
    duration: 1,
    stagger: 0.12,
    ease: 'back.out(1.28)',
    scrollTrigger: {
      trigger: '#approachGrid',
      start: 'top 80%',
      once: true
    }
  });

  // Service cards dynamically assemble rather than merely fading in.
  gsap.from('#servicesGrid .service-card', {
    x: (index) => index % 2 === 0 ? -80 : 80,
    y: 70,
    rotation: (index) => index % 2 === 0 ? -2.2 : 2.2,
    opacity: 0,
    scale: 0.92,
    duration: 1.05,
    stagger: 0.11,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#servicesGrid',
      start: 'top 82%',
      once: true
    }
  });

  // Solution dashboard rises while its inner metrics and chart draw in.
  const solutionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#featuredSolution',
      start: 'top 78%',
      once: true
    }
  });
  solutionTimeline
    .from('#featuredSolution', { y: 70, opacity: 0, scale: 0.97, duration: 1.05, ease: 'power3.out' })
    .from('.solution-dashboard', { y: 65, rotation: 2, opacity: 0, duration: 1, ease: 'back.out(1.25)' }, '-=0.65')
    .from('.solution-metric', { y: 24, opacity: 0, duration: 0.65, stagger: 0.08 }, '-=0.55')
    .from('.chart-line', { strokeDasharray: 700, strokeDashoffset: 700, duration: 1.4, ease: 'power2.inOut' }, '-=0.45')
    .from('.activity-item', { x: 24, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.8');

  gsap.from('#secondarySolutions .solution-card', {
    y: 64,
    opacity: 0,
    scale: 0.95,
    duration: 0.95,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#secondarySolutions',
      start: 'top 84%',
      once: true
    }
  });

  // The vertical process line fills in direct proportion to scroll.
  gsap.to('#timelineProgress', {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#processList',
      start: 'top 68%',
      end: 'bottom 62%',
      scrub: 0.35
    }
  });

  gsap.from('#processList .process-card', {
    x: 56,
    y: 28,
    opacity: 0,
    scale: 0.96,
    duration: 0.9,
    stagger: 0.14,
    ease: 'back.out(1.35)',
    scrollTrigger: {
      trigger: '#processList',
      start: 'top 78%',
      once: true
    }
  });

  // Continuous, low-amplitude oscillation for the technology cluster.
  document.querySelectorAll('.tech-pill').forEach((pill, index) => {
    gsap.to(pill, {
      y: index % 2 ? 11 : -11,
      x: index % 3 === 0 ? 4 : -3,
      rotation: index % 2 ? 1.2 : -1.2,
      duration: 2.8 + index * 0.22,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * -0.23
    });
  });

  gsap.to('.tech-ring', {
    rotationZ: '+=360',
    duration: 46,
    repeat: -1,
    ease: 'none'
  });

  gsap.from('.tech-stage', {
    scale: 0.86,
    opacity: 0,
    rotation: -2,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tech-stage',
      start: 'top 84%',
      once: true
    }
  });

  // Background geometry moves at a different scroll rate for depth.
  document.querySelectorAll('[data-parallax]').forEach((shape) => {
    const amount = Number(shape.dataset.parallax || 20);
    gsap.to(shape, {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: {
        trigger: shape.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Hero visual drifts against page scroll to create a cinematic layer.
  gsap.to('#heroVisual', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Recalculate trigger geometry after fonts, layout, and CDN CSS settle.
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
