import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.paglyph.app',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
