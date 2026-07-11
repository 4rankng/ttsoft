// Pointer-based perspective tilt. It is intentionally subtle, disabled
// on touch devices, and additive to the static 3D transforms in CSS.

export function initTilt() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover || reduceMotion) return;

  document.querySelectorAll('.tilt-card').forEach((card) => {
    const strength = Number(card.dataset.tiltStrength || 4);
    const initialTransform = getComputedStyle(card).transform;

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = 'transform 80ms linear';
      card.style.transform = `${initialTransform === 'none' ? '' : initialTransform} rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg) translateZ(2px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transition = 'transform 450ms cubic-bezier(.2,.8,.2,1)';
      card.style.transform = initialTransform === 'none' ? '' : initialTransform;
    });
  });
}
