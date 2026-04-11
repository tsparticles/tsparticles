import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../utils';

const group = __('Shapes'),
	shapes = [
		{
			name: 'shape-arrow',
			description: __('Arrow'),
			group,
			load: async (engine) => {
				const { loadArrowShape } = await import(
					'@tsparticles/shape-arrow'
					);

				await loadArrowShape(engine);
			},
		},
		{
			name: 'shape-cards',
			description: __('Cards'),
			group,
			load: async (engine) => {
				const { loadCardsShape } = await import(
					'@tsparticles/shape-cards'
					);

				await loadCardsShape(engine);
			},
		},
		{
			name: 'shape-circle',
			description: __('Circle'),
			group,
			load: async (engine) => {
				const { loadCircleShape } = await import(
					'@tsparticles/shape-circle'
					);

				await loadCircleShape(engine);
			},
		},
		{
			name: 'shape-cog',
			description: __('Cog'),
			group,
			load: async (engine) => {
				const { loadCogShape } = await import(
					'@tsparticles/shape-cog'
					);

				await loadCogShape(engine);
			},
		},
		{
			name: 'shape-emoji',
			description: __('Emoji'),
			group,
			load: async (engine) => {
				const { loadEmojiShape } = await import(
					'@tsparticles/shape-emoji'
					);

				await loadEmojiShape(engine);
			},
		},
		{
			name: 'shape-heart',
			description: __('Heart'),
			group,
			load: async (engine) => {
				const { loadHeartShape } = await import(
					'@tsparticles/shape-heart'
					);

				await loadHeartShape(engine);
			},
		},
		{
			name: 'shape-image',
			description: __('Image'),
			group,
			load: async (engine) => {
				const { loadImageShape } = await import(
					'@tsparticles/shape-image'
					);

				await loadImageShape(engine);
			},
		},
		{
			name: 'shape-line',
			description: __('Line'),
			group,
			load: async (engine) => {
				const { loadLineShape } = await import(
					'@tsparticles/shape-line'
					);

				await loadLineShape(engine);
			},
		},
		{
			name: 'shape-path',
			description: __('Path'),
			group,
			load: async (engine) => {
				const { loadPathShape } = await import(
					'@tsparticles/shape-path'
					);

				await loadPathShape(engine);
			},
		},
		{
			name: 'shape-polygon',
			description: __('Polygon'),
			group,
			load: async (engine) => {
				const { loadPolygonShape } = await import(
					'@tsparticles/shape-polygon'
					);

				await loadPolygonShape(engine);
			},
		},
		{
			name: 'shape-rounded-polygon',
			description: `${__('Rounded')} ${__('Polygon')}`,
			group,
			load: async (engine) => {
				const { loadRoundedPolygonShape } = await import(
					'@tsparticles/shape-rounded-polygon'
					);

				await loadRoundedPolygonShape(engine);
			},
		},
		{
			name: 'shape-rounded-rect',
			description: `${__('Rounded')} ${__('Rectangle')}`,
			group,
			load: async (engine) => {
				const { loadRoundedRectShape } = await import(
					'@tsparticles/shape-rounded-rect'
					);

				await loadRoundedRectShape(engine);
			},
		},
		{
			name: 'shape-spiral',
			description: __('Spiral'),
			group,
			load: async (engine) => {
				const { loadSpiralShape } = await import(
					'@tsparticles/shape-spiral'
					);

				await loadSpiralShape(engine);
			},
		},
		{
			name: 'shape-square',
			description: __('Square'),
			group,
			load: async (engine) => {
				const { loadSquareShape } = await import(
					'@tsparticles/shape-square'
					);

				await loadSquareShape(engine);
			},
		},
		{
			name: 'shape-star',
			description: __('Star'),
			group,
			load: async (engine) => {
				const { loadStarShape } = await import(
					'@tsparticles/shape-star'
					);

				await loadStarShape(engine);
			},
		},
		{
			name: 'shape-text',
			description: __('Text'),
			group,
			load: async (engine) => {
				const { loadTextShape } = await import(
					'@tsparticles/shape-text'
					);

				await loadTextShape(engine);
			},
		},
	];

export function getShapes() {
	return transformLoadableObject(shapes);
}

export async function handleShapes(pluginName, engine) {
	return handlePlugin(shapes, pluginName, engine);
}
