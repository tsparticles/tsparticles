import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../utils';

const group = __('Effects'),
	effects = [
		{
			name: 'effect-bubble',
			description: __('Bubble'),
			group,
			load: async (engine) => {
				const { loadBubbleEffect } = await import(
					'@tsparticles/effect-bubble'
					);

				await loadBubbleEffect(engine);
			},
		},
		{
			name: 'effect-trail',
			description: __('Trail'),
			group,
			load: async (engine) => {
				const { loadTrailEffect } = await import(
					'@tsparticles/effect-trail'
					);

				await loadTrailEffect(engine);
			},
		},
	];

export function getEffects() {
	return transformLoadableObject(effects);
}

export async function handleEffects(pluginName, engine) {
	return handlePlugin(effects, pluginName, engine);
}
