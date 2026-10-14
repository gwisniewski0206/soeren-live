import { defineConfig } from 'astro/config';
// The GitHub Pages workflow sets these: at https://<user>.github.io/<repo>/ the base is "/<repo>",
// once a custom domain is set in the repo's Pages settings it is "/" again. Locally: soeren.live at the root.
export default defineConfig({
  site: process.env.SITE_ORIGIN || 'https://soeren.live',
  base: process.env.SITE_BASE || '/',
  // hls.js is imported on demand; pre-bundle it so the dev server does not re-optimise mid-session
  vite: { optimizeDeps: { include: ['hls.js'] } },
});
