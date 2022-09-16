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
export default function save() {
	setTimeout(async () => {
		await loadFull(tsParticles);

		await tsParticles.load("tsparticles", {
			background: {
				color: "#000",
			},
			fullScreen: {
				enable: false,
			},
			particles: {
				move: {
					enable: true,
				},
			},
		});
	}, 500);

	return <div id={"tsparticles"} style={{ height: "500px"}} {...useBlockProps.save()}></div>;
}
