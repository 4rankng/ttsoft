import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Ting Ting Soft — Vietnamese-first static landing page.
// index.html holds the markup and pulls styles from /src/styles/main.css
// and behavior from /src/scripts/main.js (ES modules). GSAP loads via CDN.
// Vite bundles both into dist/ and copies public/ assets for Netlify.
// Tailwind v4 is layered in (preflight disabled to preserve the bespoke
// design system in base.css) and used purely for utility classes on
// upgraded Tailkit-style sections.
export default defineConfig({
  plugins: [tailwindcss()],
  // The demo/*.html files are standalone design explorations that import
  // `three` via a browser importmap (CDN URL). Vite's dep scanner cannot
  // resolve bare specifiers from importmaps, so it logged a noisy
  // "three could not be resolved" error on startup. These demo files are
  // opened directly in a browser, never bundled — so we tell Vite's scanner
  // to only look at the real entry point. The demo files still work fine
  // when opened via file:// or served as static files.
  optimizeDeps: {
    entries: ['index.html'],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
  },
});
