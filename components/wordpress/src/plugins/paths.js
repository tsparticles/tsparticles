import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../utils';

const group = __('Paths'),
	paths = [
		{
			name: 'path-curves',
			description: __('Curves'),
			group,
			load: async (engine) => {
				const { loadCurvesPath } = await import(
					'tsparticles-path-curves'
					);

				await loadCurvesPath(engine);
			},
		},
		{
			name: 'path-perlin-noise',
			description: `${__('Perlin')} ${__('Noise')}`,
			group,
			load: async (engine) => {
				const { loadPerlinNoisePath } = await import(
					'tsparticles-path-perlin-noise'
					);

				await loadPerlinNoisePath(engine);
			},
		},
		{
			name: 'path-polygon',
			description: __('Polygon'),
			group,
			load: async (engine) => {
				const { loadPolygonPath } = await import(
					'tsparticles-path-polygon'
					);

				await loadPolygonPath(engine);
			},
		},
		{
			name: 'path-simplex-noise',
			description: `${__('Simplex')} ${__('Noise')}`,
			group,
			load: async (engine) => {
				const { loadSimplexNoisePath } = await import(
					'tsparticles-path-simplex-noise'
					);

				await loadSimplexNoisePath(engine);
			},
		},
	];

export function getPaths() {
	return transformLoadableObject(paths);
}

export async function handlePaths(pluginName, engine) {
	return handlePlugin(paths, pluginName, engine);
}
