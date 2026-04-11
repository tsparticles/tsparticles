import { __ } from '@wordpress/i18n';

export function getExternalInteractions(group, localizeFn) {
	return [
		{
			name: 'interaction-external-attract',
			description: localizeFn(__('Attract')),
			group,
			load: async (engine) => {
				const { loadExternalAttractInteraction } = await import(
					'@tsparticles/interaction-external-attract'
				);

				await loadExternalAttractInteraction(engine);
			},
		},
		{
			name: 'interaction-external-bounce',
			description: localizeFn(__('Bounce')),
			group,
			load: async (engine) => {
				const { loadExternalBounceInteraction } = await import(
					'@tsparticles/interaction-external-bounce'
				);

				await loadExternalBounceInteraction(engine);
			},
		},
		{
			name: 'interaction-external-bubble',
			description: localizeFn(__('Bubble')),
			group,
			load: async (engine) => {
				const { loadExternalBubbleInteraction } = await import(
					'@tsparticles/interaction-external-bubble'
				);

				await loadExternalBubbleInteraction(engine);
			},
		},
		{
			name: 'interaction-external-connect',
			description: localizeFn(__('Connect')),
			group,
			load: async (engine) => {
				const { loadExternalConnectInteraction } = await import(
					'@tsparticles/interaction-external-connect'
				);

				await loadExternalConnectInteraction(engine);
			},
		},
		{
			name: 'interaction-external-grab',
			description: localizeFn(__('Grab')),
			group,
			load: async (engine) => {
				const { loadExternalGrabInteraction } = await import(
					'@tsparticles/interaction-external-grab'
				);

				await loadExternalGrabInteraction(engine);
			},
		},
		{
			name: 'interaction-external-pause',
			description: localizeFn(__('Pause')),
			group,
			load: async (engine) => {
				const { loadExternalPauseInteraction } = await import(
					'@tsparticles/interaction-external-pause'
				);

				await loadExternalPauseInteraction(engine);
			},
		},
		{
			name: 'interaction-external-pop',
			description: localizeFn(__('Pop')),
			group,
			load: async (engine) => {
				const { loadExternalPopInteraction } = await import(
					'@tsparticles/interaction-external-pop'
					);

				await loadExternalPopInteraction(engine);
			},
		},
		{
			name: 'interaction-external-push',
			description: localizeFn(__('Push')),
			group,
			load: async (engine) => {
				const { loadExternalPushInteraction } = await import(
					'@tsparticles/interaction-external-push'
				);

				await loadExternalPushInteraction(engine);
			},
		},
		{
			name: 'interaction-external-remove',
			description: localizeFn(__('Remove')),
			group,
			load: async (engine) => {
				const { loadExternalRemoveInteraction } = await import(
					'@tsparticles/interaction-external-remove'
				);

				await loadExternalRemoveInteraction(engine);
			},
		},
		{
			name: 'interaction-external-repulse',
			description: localizeFn(__('Repulse')),
			group,
			load: async (engine) => {
				const { loadExternalRepulseInteraction } = await import(
					'@tsparticles/interaction-external-repulse'
				);

				await loadExternalRepulseInteraction(engine);
			},
		},
		{
			name: 'interaction-external-slow',
			description: localizeFn(__('Slow')),
			group,
			load: async (engine) => {
				const { loadExternalSlowInteraction } = await import(
					'@tsparticles/interaction-external-slow'
				);

				await loadExternalSlowInteraction(engine);
			},
		},
		{
			name: 'interaction-external-trail',
			description: localizeFn(__('Trail')),
			group,
			load: async (engine) => {
				const { loadExternalTrailInteraction } = await import(
					'@tsparticles/interaction-external-trail'
				);

				await loadExternalTrailInteraction(engine);
			},
		},
	];
}
