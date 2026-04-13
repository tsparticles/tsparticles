import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../utils';

const group = __('Movers'),
	movers = [
		{
			name: 'move-base',
			description: __('Base'),
			group,
			load: async (engine) => {
				const { loadBaseMover } = await import('@tsparticles/move-base');

				await loadBaseMover(engine);
			},
		},
		{
			name: 'move-parallax',
			description: __('Parallax'),
			group,
			load: async (engine) => {
				const { loadParallaxMover } = await import(
					'@tsparticles/move-parallax'
				);

				await loadParallaxMover(engine);
			},
		},
	];

export function getMovers() {
	return transformLoadableObject(movers);
}

export async function handleMovers(pluginName, engine) {
	return handlePlugin(movers, pluginName, engine);
}
