/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { PanelBody, TextControl, TextareaControl } from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

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
export default function Edit({ attributes, setAttributes }) {
	console.log("edit");

	setTimeout(async () => {
		await tsParticles.load("tsparticles", JSON.parse(attributes.options));
	});

	const widthChange = (e) => {
		setAttributes({ width: e });
	};

	const heightChange = (e) => {
		setAttributes({ height: e });
	};

	const idChange = (e) => {
		setAttributes({ id: e });
	};

	const optionsChange = (e) => {
		setAttributes({ options: e });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="setting">
				<PanelBody title={__("Particles Settings")}>
					<fieldset>
						<TextControl
							label="Width"
							value={attributes.width}
							onChange={widthChange}
						/>
					</fieldset>
					<fieldset>
						<TextControl
							label="Height"
							value={attributes.height}
							onChange={heightChange}
						/>
					</fieldset>
					<fieldset>
						<TextControl label="Id" value={attributes.id} onChange={idChange} />
					</fieldset>
					<fieldset>
						<TextareaControl
							label="Options"
							value={attributes.options}
							onChange={optionsChange}
						/>
					</fieldset>
				</PanelBody>
			</InspectorControls>
			<div
				id={attributes.id || "tsparticles"}
				style={{
					height: attributes.height || "500px",
					width: attributes.width || "100%",
				}}
				data-options={attributes.options}
			></div>
		</div>
	);
}
