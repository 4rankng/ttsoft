import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll hook. Adds `is-visible` to `.reveal` nodes when they enter
 * the viewport, mirroring the demo's IntersectionObserver behavior. Falls back
 * to immediately visible when IntersectionObserver is unavailable or the user
 * prefers reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveal = (target: Element) => target.classList.add('is-visible');

    if (reduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    // Observe every `.reveal` currently in the DOM. Section components mount
    // synchronously on first paint, so this catches all of them.
    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Tracks the document scroll progress and toggles the `is-scrolled` class on
 * the header, plus drives the `.page-progress` bar — matches main.js.
 */
export function useScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector('[data-header]');
    const progress = document.querySelector<HTMLSpanElement>('.page-progress span');

    const update = () => {
      const y = window.scrollY;
      header?.classList.toggle('is-scrolled', y > 18);
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      if (progress) progress.style.transform = `scaleX(${Math.min(1, y / max)})`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Returns the current year for footer copyright — replaces `[data-year]`.
 */
export function useCurrentYear() {
  const [year] = useState(() => new Date().getFullYear());
  return year;
}

/**
 * Returns true when the target enters the viewport. Used to lazy-mount the
 * 3D scene only when the hero is near (rootMargin 250px, like main.js).
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.02 },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      options,
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

/**
 * Detects WebGL2 support, mirroring main.js's canUseWebGL check. Also respects
 * a `?no3d` query flag for debugging / accessibility.
 */
export function useWebGLSupport() {
  const [supported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      if (new URLSearchParams(window.location.search).has('no3d')) return false;
      const canvas = document.createElement('canvas');
      return Boolean(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
    } catch {
      return false;
    }
  });
  return supported;
}

/**
 * Pauses an animation loop when the tab is hidden. Returns a boolean that is
 * false while `document.hidden` is true.
 */
export function useTabVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}

/** True when the user prefers reduced motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
}
