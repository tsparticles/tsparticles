import { __ } from "@wordpress/i18n";
import { handlePlugin, transformLoadableObject } from "../../utils";
import { getEasings } from "./easings";
import { getExports } from "./exports";
import { getEmitterShapes } from "./emittersShapes.js";

const group = __("Plugins"),
	plugins = [
		{
			name: "plugin-absorbers",
			description: __("Absorbers"),
			group,
			load: async (engine) => {
				const { loadAbsorbersPlugin } = await import(
					"@tsparticles/plugin-absorbers"
					);

				await loadAbsorbersPlugin(engine);
			}
		},
		{
			name: "plugin-canvas-mask",
			description: `${__("Canvas")} ${__("Mask")}`,
			group,
			load: async (engine) => {
				const { loadCanvasMaskPlugin } = await import(
					"@tsparticles/plugin-canvas-mask"
					);

				await loadCanvasMaskPlugin(engine);
			}
		},
		...getEasings(group, (name) => `${__("Easing")} ${name}`),
		{
			name: "plugin-emitters",
			description: __("Emitters"),
			group,
			load: async (engine) => {
				const { loadEmittersPlugin } = await import(
					"@tsparticles/plugin-emitters"
					);

				await loadEmittersPlugin(engine);
			}
		},
		...getEmitterShapes(group, (name) => `${__("Emitters")} ${__("Shape")} ${name}`),
		...getExports(group, (name) => `${__("Export")} ${name}`),
		{
			name: "plugin-hsv-color",
			description: `${__("HSV")} ${__("Color")}`,
			group,
			load: async () => {
				const { loadHsvColorPlugin } = await import(
					"@tsparticles/plugin-hsv-color"
					);

				await loadHsvColorPlugin();
			}
		},
		{
			name: "plugin-infection",
			description: __("Infection"),
			group,
			load: async (engine) => {
				const { loadInfectionPlugin } = await import(
					"@tsparticles/plugin-infection"
					);

				await loadInfectionPlugin(engine);
			}
		},
		{
			name: "plugin-motion",
			description: __("Motion"),
			group,
			load: async (engine) => {
				const { loadMotionPlugin } = await import(
					"@tsparticles/plugin-motion"
					);

				await loadMotionPlugin(engine);
			}
		},
		{
			name: "plugin-polygon-mask",
			description: `${__("Polygon")} ${__("Mask")}`,
			group,
			load: async (engine) => {
				const { loadPolygonMaskPlugin } = await import(
					"@tsparticles/plugin-polygon-mask"
					);

				await loadPolygonMaskPlugin(engine);
			}
		},
		{
			name: "plugin-sounds",
			description: __("Sounds"),
			group,
			load: async (engine) => {
				const { loadSoundsPlugin } = await import(
					"@tsparticles/plugin-sounds"
					);

				await loadSoundsPlugin(engine);
			}
		}
	];

export function getPlugins() {
	return transformLoadableObject(plugins);
}

export async function handlePlugins(pluginName, engine) {
	return handlePlugin(plugins, pluginName, engine);
}
