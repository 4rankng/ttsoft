import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneContent } from './SceneContent';
import { usePrefersReducedMotion, useTabVisible } from '../hooks';

/**
 * Canvas wrapper for the hero 3D scene.
 *
 * Robustness gates (all required, must not regress vs. demo scene.js):
 *  - prefers-reduced-motion → render ONE static frame, no rAF loop
 *    (frameloop="demand" + a single invalidate()).
 *  - Hero offscreen → pause the loop (frameloop="never").
 *  - Tab hidden → pause the loop.
 *  - Pointer parallax via a ref-shared Vector2 (no re-renders).
 *  - On first render, add `.scene-ready` to the wrap so the canvas fades in
 *    over the CSS fallback (matching #system-scene opacity transition).
 */
export function SceneCanvas() {
  const reduced = usePrefersReducedMotion();
  const tabVisible = useTabVisible();

  const wrapRef = useRef<HTMLDivElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const pointerTarget = useRef(new THREE.Vector2(0, 0));

  // Observe the hero wrap to pause rendering when offscreen.
  useEffect(() => {
    const wrap = wrapRef.current?.parentElement; // `.canvas-wrap`
    if (!wrap || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      (entries) => setHeroInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.02 },
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);

  // Pointer parallax — write into refs (no React state churn). Skip under
  // reduced-motion, matching scene.js.
  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current?.parentElement;
    if (!wrap) return;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointerTarget.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerTarget.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => pointerTarget.current.set(0, 0);

    wrap.addEventListener('pointermove', onMove, { passive: true });
    wrap.addEventListener('pointerleave', onLeave);
    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  // Smoothly copy pointerTarget → pointer inside the frame loop is handled in
  // SceneContent via lerp; but we also need a tiny rAF to copy the raw target
  // when the loop is driven by demand (reduced-motion skips this entirely).
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      pointer.current.lerp(pointerTarget.current, 0.2);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Decide frameloop mode:
  //  - reduced motion → "demand" (one frame, then idle)
  //  - otherwise → "always" while hero in view AND tab visible, else "never"
  const frameloop: 'always' | 'demand' | 'never' = reduced
    ? 'demand'
    : heroInView && tabVisible
      ? 'always'
      : 'never';

  // After mount, fade the canvas in by tagging the wrap with `.scene-ready`.
  useEffect(() => {
    const wrap = wrapRef.current?.parentElement;
    if (!wrap) return;
    // Defer one frame so the first GL frame has rendered.
    const id = window.setTimeout(() => wrap.classList.add('scene-ready'), 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0, transition: 'opacity .8s ease' }}>
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        aria-hidden
      >
        <SceneContent reducedMotion={reduced} pointer={pointer} />
      </Canvas>
    </div>
  );
}
