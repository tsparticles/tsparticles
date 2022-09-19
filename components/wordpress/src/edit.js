/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

document.addEventListener("DOMContentLoaded", async () => {
	await loadFull(tsParticles);
});

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes }) {
	setTimeout(async () => {
		await tsParticles.load("tsparticles", attributes.options);
	});

	const width = attributes.width < 0 ? "100%" : `${attributes.width}px`,
		height = attributes.height < 0 ? "100%" : `${attributes.height}px`;

	return (
		<p {...useBlockProps()}>
			<div id={"tsparticles"} style={{ height, width }}></div>
		</p>
	);
}

