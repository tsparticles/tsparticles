/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	setTimeout(async () => {
		await tsParticles.load(attributes.id, attributes.options);
	});

	const width = attributes.width < 0 ? "100%" : `${attributes.width}px`,
		height = attributes.height < 0 ? "100%" : `${attributes.height}px`;

	return (
		<div
			id={"tsparticles"}
			style={{ width, height }}
			{...useBlockProps.save()}
		></div>
	);
}
