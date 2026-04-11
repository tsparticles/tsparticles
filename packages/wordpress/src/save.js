/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { tsParticles } from '@tsparticles/engine';
import { getAllPlugins, loadWordpressParticles } from './load';

document.addEventListener('DOMContentLoaded', async () => {
	await loadWordpressParticles(tsParticles, getAllPlugins());
});

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param  root0
 * @param  root0.attributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	setTimeout(async () => {
		await tsParticles.load({
			id: attributes.id,
			options: JSON.parse(attributes.options)
		});
	});

	const width = attributes.width ? attributes.width : '100%',
		height = attributes.height ? attributes.height : '500px',
		plugins = getAllPlugins(attributes).map((t) => t.name);

	return (
		<div
			id={attributes.id}
			style={{ width, height }}
			data-options={attributes.options}
			data-plugins={plugins.join(',')}
			{...useBlockProps.save()}
		></div>
	);
}
