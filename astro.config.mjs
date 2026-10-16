import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://paglyph.app',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
