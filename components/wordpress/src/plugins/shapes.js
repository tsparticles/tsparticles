import { __ } from '@wordpress/i18n';
import { handlePlugin, transformLoadableObject } from '../utils';

const group = __('Shapes'),
	shapes = [
		{
			name: 'shape-bubble',
			description: __('Bubble'),
			group,
			load: async (engine) => {
				const { loadBubbleShape } = await import(
					'tsparticles-shape-bubble'
					);

				await loadBubbleShape(engine);
			},
		},
		{
			name: 'shape-cards',
			description: __('Cards'),
			group,
			load: async (engine) => {
				const { loadCardsShape } = await import(
					'tsparticles-shape-cards'
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
					'tsparticles-shape-circle'
					);

				await loadCircleShape(engine);
			},
		},
		{
			name: 'shape-heart',
			description: __('Heart'),
			group,
			load: async (engine) => {
				const { loadHeartShape } = await import(
					'tsparticles-shape-heart'
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
					'tsparticles-shape-image'
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
					'tsparticles-shape-line'
					);

				await loadLineShape(engine);
			},
		},
		{
			name: 'shape-multiline-text',
			description: `${__('Multiline')} ${__('Text')}`,
			group,
			load: async (engine) => {
				const { loadMultilineTextShape } = await import(
					'tsparticles-shape-multiline-text'
					);

				await loadMultilineTextShape(engine);
			},
		},
		{
			name: 'shape-polygon',
			description: __('Polygon'),
			group,
			load: async (engine) => {
				const { loadPolygonShape } = await import(
					'tsparticles-shape-polygon'
					);

				await loadPolygonShape(engine);
			},
		},
		{
			name: 'shape-rounded-rect',
			description: `${__('Rounded')} ${__('Rectangle')}`,
			group,
			load: async (engine) => {
				const { loadRoundedRectShape } = await import(
					'tsparticles-shape-rounded-rect'
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
					'tsparticles-shape-spiral'
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
					'tsparticles-shape-square'
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
					'tsparticles-shape-star'
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
					'tsparticles-shape-text'
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
