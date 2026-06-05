import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

const confettiPkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default defineConfig({
  plugins: [
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/__CONFETTI_VERSION__/g, confettiPkg.version);
      },
    },
  ],
  build: {
    outDir: 'dist',
    minify: false,
  },
});
