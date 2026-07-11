import { defineConfig } from 'vite';

// Ting Ting Soft — Vietnamese-first static landing page.
// index.html holds the markup and pulls styles from /src/styles/main.css
// and behavior from /src/scripts/main.js (ES modules). GSAP loads via CDN.
// Vite bundles both into dist/ and copies public/ assets for Netlify.
export default defineConfig({
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
  },
});
