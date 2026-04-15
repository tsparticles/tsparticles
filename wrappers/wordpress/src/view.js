import { tsParticles } from '@tsparticles/engine';
import { loadWordpressParticles } from './load';

document.addEventListener('DOMContentLoaded', async () => {
	const els = Array.from(
			document.querySelectorAll(
				'.wp-block-tsparticles-tsparticles-wp-block'
			)
		),
		plugins = new Set();

	for (const el of els) {
		for (const plugin of el.dataset.plugins.split(',')) {
			if (!plugins.has(plugin)) {
				plugins.add(plugin);
			}
		}
	}

	await loadWordpressParticles(tsParticles, plugins);

	for (const el of els) {
		await tsParticles.load({
			id: el.id,
			options: JSON.parse(el.dataset.options)
		});
	}
});
