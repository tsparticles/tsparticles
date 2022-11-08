import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../utils';

const group = __('Plugins'),
	plugins = [
		{
			name: 'plugin-absorbers',
			description: __('Absorbers'),
			group,
			load: async (engine) => {
				const { loadAbsorbersPlugin } = await import(
					'tsparticles-plugin-absorbers'
				);

				await loadAbsorbersPlugin(engine);
			},
		},
		{
			name: 'plugin-canvas-mask',
			description: __('Canvas Mask'),
			group,
			load: async (engine) => {
				const { loadCanvasMaskPlugin } = await import(
					'tsparticles-plugin-canvas-mask'
				);

				await loadCanvasMaskPlugin(engine);
			},
		},
		{
			name: 'plugin-emitters',
			description: __('Emitters'),
			group,
			load: async (engine) => {
				const { loadEmittersPlugin } = await import(
					'tsparticles-plugin-emitters'
				);

				await loadEmittersPlugin(engine);
			},
		},
		{
			name: 'plugin-hsv-color',
			description: __('HSV Color'),
			group,
			load: async () => {
				const { loadHsvColorPlugin } = await import(
					'tsparticles-plugin-hsv-color'
				);

				await loadHsvColorPlugin();
			},
		},
		{
			name: 'plugin-infection',
			description: __('Infection'),
			group,
			load: async (engine) => {
				const { loadInfectionPlugin } = await import(
					'tsparticles-plugin-infection'
				);

				await loadInfectionPlugin(engine);
			},
		},
		{
			name: 'plugin-polygon-mask',
			description: __('Polygon Mask'),
			group,
			load: async (engine) => {
				const { loadPolygonMaskPlugin } = await import(
					'tsparticles-plugin-polygon-mask'
				);

				await loadPolygonMaskPlugin(engine);
			},
		},
	];

export function getPlugins() {
	return transformLoadableObject(plugins);
}

export async function handlePlugins(pluginName, engine) {
	return handlePlugin(plugins, pluginName, engine);
}
