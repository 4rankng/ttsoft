// Entry point. Modules are split by concern (nav, form, tilt, motion);
// each exports an init() that runs once the DOM is ready. Motion stays
// deferred to window.load so external GSAP scripts have a chance to run,
// matching the original inline timing.

import { initNav } from './nav.js';
import { initForm } from './form.js';
import { initTilt } from './tilt.js';
import { initMotion } from './motion.js';

window.addEventListener('DOMContentLoaded', () => {
  initNav();
  initForm();
  initTilt();

  // Defer until external scripts have had a chance to execute.
  window.addEventListener('load', initMotion, { once: true });
});
