import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ting Ting Soft — Vietnamese-first landing page.
// Production build emits a static SPA into ./dist for Netlify.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep the heavy 3D stack out of the main UI chunk so the
          // headline / hero copy paint independently of WebGL.
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
