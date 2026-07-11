import { defineConfig } from 'vite';

// Ting Ting Soft — Vietnamese-first static landing page.
// The page is a single self-contained index.html (CSS + inline JS, with GSAP
// loaded via CDN). Vite processes the root index.html and copies public/
// assets into dist for Netlify.
export default defineConfig({
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
  },
});
