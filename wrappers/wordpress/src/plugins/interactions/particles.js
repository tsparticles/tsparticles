import { __ } from '@wordpress/i18n';

export function getParticlesInteractions(group, localizeFn) {
	return [
		{
			name: 'interaction-particles-attract',
			description: localizeFn(__('Attract')),
			group,
			load: async (engine) => {
				const { loadParticlesAttractInteraction } = await import(
					'@tsparticles/interaction-particles-attract'
				);

				await loadParticlesAttractInteraction(engine);
			},
		},
		{
			name: 'interaction-particles-collisions',
			description: localizeFn(__('Collisions')),
			group,
			load: async (engine) => {
				const { loadParticlesCollisionsInteraction } = await import(
					'@tsparticles/interaction-particles-collisions'
				);

				await loadParticlesCollisionsInteraction(engine);
			},
		},
		{
			name: 'interaction-particles-links',
			description: localizeFn(__('Links')),
			group,
			load: async (engine) => {
				const { loadParticlesLinksInteraction } = await import(
					'@tsparticles/interaction-particles-links'
				);

				await loadParticlesLinksInteraction(engine);
			},
		},
		{
			name: 'interaction-particles-repulse',
			description: localizeFn(__('Repulse')),
			group,
			load: async (engine) => {
				const { loadParticlesRepulseInteraction } = await import(
					'@tsparticles/interaction-particles-repulse'
				);

				await loadParticlesRepulseInteraction(engine);
			},
		},
	];
}
