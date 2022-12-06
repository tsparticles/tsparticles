import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../utils';

const group = __('Updaters'),
	updaters = [
		{
			name: 'updater-angle',
			description: __('Angle'),
			group,
			load: async (engine) => {
				const { loadAngleUpdater } = await import(
					'tsparticles-updater-angle'
					);

				await loadAngleUpdater(engine);
			},
		},
		{
			name: 'updater-color',
			description: __('Color'),
			group,
			load: async (engine) => {
				const { loadColorUpdater } = await import(
					'tsparticles-updater-color'
					);

				await loadColorUpdater(engine);
			},
		},
		{
			name: 'updater-destroy',
			description: __('Destroy'),
			group,
			load: async (engine) => {
				const { loadDestroyUpdater } = await import(
					'tsparticles-updater-destroy'
					);

				await loadDestroyUpdater(engine);
			},
		},
		{
			name: 'updater-gradient',
			description: __('Gradient'),
			group,
			load: async (engine) => {
				const { loadGradientUpdater } = await import(
					'tsparticles-updater-gradient'
					);

				await loadGradientUpdater(engine);
			},
		},
		{
			name: 'updater-life',
			description: __('Life'),
			group,
			load: async (engine) => {
				const { loadLifeUpdater } = await import(
					'tsparticles-updater-life'
					);

				await loadLifeUpdater(engine);
			},
		},
		{
			name: 'updater-opacity',
			description: __('Opacity'),
			group,
			load: async (engine) => {
				const { loadOpacityUpdater } = await import(
					'tsparticles-updater-opacity'
					);

				await loadOpacityUpdater(engine);
			},
		},
		{
			name: 'updater-orbit',
			description: __('Orbit'),
			group,
			load: async (engine) => {
				const { loadOrbitUpdater } = await import(
					'tsparticles-updater-orbit'
					);

				await loadOrbitUpdater(engine);
			},
		},
		{
			name: 'updater-out-modes',
			description: `${__('Out')} ${__('Modes')}`,
			group,
			load: async (engine) => {
				const { loadOutModesUpdater } = await import(
					'tsparticles-updater-out-modes'
					);

				await loadOutModesUpdater(engine);
			},
		},
		{
			name: 'updater-roll',
			description: __('Roll'),
			group,
			load: async (engine) => {
				const { loadRollUpdater } = await import(
					'tsparticles-updater-roll'
					);

				await loadRollUpdater(engine);
			},
		},
		{
			name: 'updater-size',
			description: __('Size'),
			group,
			load: async (engine) => {
				const { loadSizeUpdater } = await import(
					'tsparticles-updater-size'
					);

				await loadSizeUpdater(engine);
			},
		},
		{
			name: 'updater-stroke-color',
			description: `${__('Stroke')} ${__('Color')}`,
			group,
			load: async (engine) => {
				const { loadStrokeColorUpdater } = await import(
					'tsparticles-updater-stroke-color'
					);

				await loadStrokeColorUpdater(engine);
			},
		},
		{
			name: 'updater-tilt',
			description: __('Tilt'),
			group,
			load: async (engine) => {
				const { loadTiltUpdater } = await import(
					'tsparticles-updater-tilt'
					);

				await loadTiltUpdater(engine);
			},
		},
		{
			name: 'updater-twinkle',
			description: __('Twinkle'),
			group,
			load: async (engine) => {
				const { loadTwinkleUpdater } = await import(
					'tsparticles-updater-twinkle'
					);

				await loadTwinkleUpdater(engine);
			},
		},
		{
			name: 'updater-wobble',
			description: __('Wobble'),
			group,
			load: async (engine) => {
				const { loadWobbleUpdater } = await import(
					'tsparticles-updater-wobble'
					);

				await loadWobbleUpdater(engine);
			},
		},
	];

export function getUpdaters() {
	return transformLoadableObject(updaters);
}

export async function handleUpdaters(pluginName, engine) {
	return handlePlugin(updaters, pluginName, engine);
}
