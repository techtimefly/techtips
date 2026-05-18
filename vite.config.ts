import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // host: true binds to 0.0.0.0 so the site is reachable from other
  // devices on the LAN, not just localhost.
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  build: {
    // three.js is intentionally code-split into the lazy HeroScene chunk,
    // so the >500 kB default warning isn't actionable here.
    chunkSizeWarningLimit: 900,
  },
});
