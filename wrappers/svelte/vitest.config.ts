import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: { conditions: ['browser'] },
	plugins: [svelte({ configFile: false, preprocess: vitePreprocess() })],
	test: {
		environment: 'jsdom',
		include: ['tests/**/*.test.ts']
	}
});
