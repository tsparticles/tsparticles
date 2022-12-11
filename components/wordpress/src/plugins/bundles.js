import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../utils';

const group = __('Bundles'),
	bundles = [
		{
			name: 'bundle-full',
			description: 'tsParticles',
			group,
			load: async (engine) => {
				const { loadFull } = await import('tsparticles');

				await loadFull(engine);
			},
		},
		{
			name: 'bundle-slim',
			description: `tsParticles ${__('Slim')}`,
			group,
			load: async (engine) => {
				const { loadSlim } = await import('tsparticles-slim');

				await loadSlim(engine);
			},
		},
		{
			name: 'particles.js',
			description: `tsParticles-Particles.js ${__('interoperability')}`,
			group,
			load: async (engine) => {
				const { initPjs } = await import('tsparticles-particles.js');

				await initPjs(engine);
			},
		},
	];

export function getBundles() {
	return transformLoadableObject(bundles);
}

export async function handleBundles(pluginName, engine) {
	return handlePlugin(bundles, pluginName, engine);
}
