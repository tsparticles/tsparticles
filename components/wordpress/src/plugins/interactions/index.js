import { getExternalInteractions } from './external';
import { getParticlesInteractions } from './particles';
import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../../utils';

const group = __('Interactions'),
	interactions = [
		...getExternalInteractions(
			group,
			(name) => `${__('External')} ${name}`
		),
		{
			name: 'interaction-light',
			description: `${__('Mouse')} ${__('Light')}`,
			group,
			load: async (engine) => {
				const { loadLightInteraction } = await import(
					'tsparticles-interaction-light'
					);

				await loadLightInteraction(engine);
			},
		},
		...getParticlesInteractions(
			group,
			(name) => `${__('Particles')} ${name}`
		),
	];

export function getInteractions() {
	return transformLoadableObject(interactions);
}

export async function handleInteractions(pluginName, engine) {
	return handlePlugin(interactions, pluginName, engine);
}
