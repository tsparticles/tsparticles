import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			preprocess: [preprocess(), vitePreprocess()]
		})
	],
	ssr: {
		noExternal: ['tsparticles', '@tsparticles/engine', '@tsparticles/svelte']
	}
});
