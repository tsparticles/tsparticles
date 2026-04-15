import { __ } from "@wordpress/i18n";

export function getEasings(group, localizeFn) {
	return [
		{
			name: 'plugin-easing-back',
			description: localizeFn(__('Back')),
			group,
			load: async (engine) => {
				const { loadEasingBackPlugin } = await import(
					'@tsparticles/plugin-easing-back'
					);

				await loadEasingBackPlugin(engine);
			},
		},
		{
			name: 'plugin-easing-circ',
			description: localizeFn(__('Circ')),
			group,
			load: async (engine) => {
				const { loadEasingCircPlugin } = await import(
					'@tsparticles/plugin-easing-circ'
					);

				await loadEasingCircPlugin(engine);
			},
		},
		{
			name: 'plugin-easing-cubic',
			description: localizeFn(__('Cubic')),
			group,
			load: async (engine) => {
				const { loadEasingCubicPlugin } = await import(
					'@tsparticles/plugin-easing-cubic'
					);

				await loadEasingCubicPlugin(engine);
			},
		},
		{
			name: 'plugin-easing-expo',
			description: localizeFn(__('Expo')),
			group,
			load: async (engine) => {
				const { loadEasingExpoPlugin } = await import(
					'@tsparticles/plugin-easing-expo'
					);

				await loadEasingExpoPlugin(engine);
			},
		},
		{
			name: 'plugin-easing-linear',
			description: localizeFn(__('Linear')),
			group,
			load: async (engine) => {
				const { loadEasingLinearPlugin } = await import(
					'@tsparticles/plugin-easing-linear'
					);

				await loadEasingLinearPlugin(engine);
			},
		},
		{
			name: 'plugin-easing-quad',
			description: localizeFn(__('Quad')),
			group,
			load: async (engine) => {
				const { loadEasingQuadPlugin } = await import(
					'@tsparticles/plugin-easing-quad'
					);

				await loadEasingQuadPlugin(engine);
			},
		},
		{
			name: 'plugin-easing-quart',
			description: localizeFn(__('Quart')),
			group,
			load: async (engine) => {
				const { loadEasingQuartPlugin } = await import(
					'@tsparticles/plugin-easing-quart'
					);

				await loadEasingQuartPlugin(engine);
			},
		},
		{
			name: 'plugin-easing-quint',
			description: localizeFn(__('Quint')),
			group,
			load: async (engine) => {
				const { loadEasingQuintPlugin } = await import(
					'@tsparticles/plugin-easing-quint'
					);

				await loadEasingQuintPlugin(engine);
			},
		},
		{
			name: 'plugin-easing-sine',
			description: localizeFn(__('Sine')),
			group,
			load: async (engine) => {
				const { loadEasingSinePlugin } = await import(
					'@tsparticles/plugin-easing-sine'
					);

				await loadEasingSinePlugin(engine);
			},
		},
	];
}
