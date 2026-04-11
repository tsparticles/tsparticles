/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { tsParticles } from '@tsparticles/engine';
import { getAllPlugins, loadWordpressParticles } from './load';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

document.addEventListener('DOMContentLoaded', async () => {
	await loadWordpressParticles(tsParticles, getAllPlugins());
});

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const plugins = getAllPlugins(attributes).map((t) => t.name);

	setTimeout(async () => {
		await tsParticles.load('tsparticles', JSON.parse(attributes.options));
	});

	const getLoadPLuginGroup = (group) => {
		const groupPlugins = allPlugins
			.filter((t) => t.group === group)
			.map((plugin) =>
				getLoadPluginField(plugin.name, plugin.description)
			);

		return (
			<Panel key={group}>
				<PanelBody
					title={`${group} ${__('Settings')}`}
					initialOpen={false}
				>
					{groupPlugins}
				</PanelBody>
			</Panel>
		);
	};

	const getLoadPluginField = (name, description) => {
		return (
			<PanelRow key={name}>
				<ToggleControl
					label={`${__('Load')} ${description}`}
					checked={attributes[name]}
					onChange={() =>
						setAttributes({ [name]: !attributes[name] })
					}
				></ToggleControl>
			</PanelRow>
		);
	};

	const allPlugins = getAllPlugins();

	const pluginsFieldGroups = Array.from(
		new Set(allPlugins.map((t) => t.group))
	).map((group) => getLoadPLuginGroup(group));

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="setting">
				<Panel>
					<PanelBody title={`${__('Particles')} ${__('Settings')}`}>
						<fieldset>
							<TextControl
								label={__('Width')}
								value={attributes.width}
								onChange={(e) => setAttributes({ width: e })}
							/>
						</fieldset>
						<fieldset>
							<TextControl
								label={__('Height')}
								value={attributes.height}
								onChange={(e) => setAttributes({ height: e })}
							/>
						</fieldset>
						<fieldset>
							<TextControl
								label={__('Id')}
								value={attributes.id}
								onChange={(e) => setAttributes({ id: e })}
							/>
						</fieldset>
						<fieldset>
							<TextareaControl
								style={{ height: '300px' }}
								label={__('Options')}
								value={attributes.options}
								onChange={(e) => setAttributes({ options: e })}
							/>
						</fieldset>
					</PanelBody>
				</Panel>
				{pluginsFieldGroups}
			</InspectorControls>
			<div
				id={attributes.id || 'tsparticles'}
				style={{
					height: attributes.height || '500px',
					width: attributes.width || '100%',
				}}
				data-options={attributes.options}
				data-plugins={plugins.join(',')}
			></div>
		</div>
	);
}
