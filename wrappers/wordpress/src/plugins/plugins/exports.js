import { __ } from "@wordpress/i18n";

export function getExports(group, localizeFn) {
	return [
		{
			name: "plugin-export-image",
			description: localizeFn(__("Image")),
			group,
			load: async (engine) => {
				const { loadExportImagePlugin } = await import(
					"@tsparticles/plugin-export-image"
					);

				await loadExportImagePlugin(engine);
			}
		},
		{
			name: "plugin-export-json",
			description: localizeFn(__("JSON")),
			group,
			load: async (engine) => {
				const { loadExportJSONPlugin } = await import(
					"@tsparticles/plugin-export-json"
					);

				await loadExportJSONPlugin(engine);
			}
		},
		{
			name: "plugin-export-video",
			description: localizeFn(__("Video")),
			group,
			load: async (engine) => {
				const { loadExportVideoPlugin } = await import(
					"@tsparticles/plugin-export-video"
					);

				await loadExportVideoPlugin(engine);
			}
		}
	];
}
