import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const ribbonsPkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default defineConfig({
  plugins: [
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/__RIBBONS_VERSION__/g, ribbonsPkg.version);
      },
    },
  ],
  build: {
    outDir: 'dist',
    minify: false,
  },
});
