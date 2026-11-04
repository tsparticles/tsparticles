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
			load: async engine => {
				const { loadAbsorbersPlugin } = await import("@tsparticles/plugin-absorbers");

				await loadAbsorbersPlugin(engine);
			},
		},
		{
			name: "plugin-background-mask",
			description: `${__("Background")} ${__("Mask")}`,
			group,
			load: async engine => {
				const { loadBackgroundMaskPlugin } = await import("@tsparticles/plugin-background-mask");

				await loadBackgroundMaskPlugin(engine);
			},
		},
		{
			name: "plugin-blend",
			description: __("Blend"),
			group,
			load: async engine => {
				const { loadBlendPlugin } = await import("@tsparticles/plugin-blend");

				await loadBlendPlugin(engine);
			},
		},
		{
			name: "plugin-canvas-mask",
			description: `${__("Canvas")} ${__("Mask")}`,
			group,
			load: async engine => {
				const { loadCanvasMaskPlugin } = await import("@tsparticles/plugin-canvas-mask");

				await loadCanvasMaskPlugin(engine);
			},
		},
		...getEasings(group, name => `${__("Easing")} ${name}`),
		{
			name: "plugin-emitters",
			description: __("Emitters"),
			group,
			load: async engine => {
				const { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters");

				await loadEmittersPlugin(engine);
			},
		},
		...getEmitterShapes(group, name => `${__("Emitters")} ${__("Shape")} ${name}`),
		...getExports(group, name => `${__("Export")} ${name}`),
		{
			name: "plugin-hex-color",
			description: `${__("Hex")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadHexColorPlugin } = await import("@tsparticles/plugin-hex-color");

				await loadHexColorPlugin(engine);
			},
		},
		{
			name: "plugin-hsl-color",
			description: `${__("HSL")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadHslColorPlugin } = await import("@tsparticles/plugin-hsl-color");

				await loadHslColorPlugin(engine);
			},
		},
		{
			name: "plugin-hsv-color",
			description: `${__("HSV")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadHsvColorPlugin } = await import("@tsparticles/plugin-hsv-color");

				await loadHsvColorPlugin(engine);
			},
		},
		{
			name: "plugin-hwb-color",
			description: `${__("HWB")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadHwbColorPlugin } = await import("@tsparticles/plugin-hwb-color");

				await loadHwbColorPlugin(engine);
			},
		},
		{
			name: "plugin-infection",
			description: __("Infection"),
			group,
			load: async engine => {
				const { loadInfectionPlugin } = await import("@tsparticles/plugin-infection");

				await loadInfectionPlugin(engine);
			},
		},
		{
			name: "plugin-interactivity",
			description: `${__("Custom")} ${__("Interactivity")}`,
			group,
			load: async engine => {
				const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

				await loadInteractivityPlugin(engine);
			},
		},
		{
			name: "plugin-lab-color",
			description: `${__("LAB")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadLabColorPlugin } = await import("@tsparticles/plugin-lab-color");

				await loadLabColorPlugin(engine);
			},
		},
		{
			name: "plugin-lch-color",
			description: `${__("LCH")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadLchColorPlugin } = await import("@tsparticles/plugin-lch-color");

				await loadLchColorPlugin(engine);
			},
		},
		{
			name: "plugin-oklch-color",
			description: `${__("OKLCH")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadOklchColorPlugin } = await import("@tsparticles/plugin-oklch-color");

				await loadOklchColorPlugin(engine);
			},
		},
		{
			name: "plugin-rgb-color",
			description: `${__("RGB")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadRgbColorPlugin } = await import("@tsparticles/plugin-rgb-color");

				await loadRgbColorPlugin(engine);
			},
		},
		{
			name: "plugin-manual-particles",
			description: `${__("Manual")} ${__("Particles")}`,
			group,
			load: async engine => {
				const { loadManualParticlesPlugin } = await import("@tsparticles/plugin-manual-particles");

				await loadManualParticlesPlugin(engine);
			},
		},
		{
			name: "plugin-motion",
			description: __("Motion"),
			group,
			load: async engine => {
				const { loadMotionPlugin } = await import("@tsparticles/plugin-motion");

				await loadMotionPlugin(engine);
			},
		},
		{
			name: "plugin-move",
			description: __("Move"),
			group,
			load: async engine => {
				const { loadMovePlugin } = await import("@tsparticles/plugin-move");

				await loadMovePlugin(engine);
			},
		},
		{
			name: "plugin-named-color",
			description: `${__("Named")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadNamedColorPlugin } = await import("@tsparticles/plugin-named-color");

				await loadNamedColorPlugin(engine);
			},
		},
		{
			name: "plugin-oklab-color",
			description: `${__("OKLAB")} ${__("Color")}`,
			group,
			load: async engine => {
				const { loadOklabColorPlugin } = await import("@tsparticles/plugin-oklab-color");

				await loadOklabColorPlugin(engine);
			},
		},
		{
			name: "plugin-poisson-disc",
			description: `${__("Poisson")} ${__("Disc")}`,
			group,
			load: async engine => {
				const { loadPoissonDiscPlugin } = await import("@tsparticles/plugin-poisson-disc");

				await loadPoissonDiscPlugin(engine);
			},
		},
		{
			name: "plugin-polygon-mask",
			description: `${__("Polygon")} ${__("Mask")}`,
			group,
			load: async engine => {
				const { loadPolygonMaskPlugin } = await import("@tsparticles/plugin-polygon-mask");

				await loadPolygonMaskPlugin(engine);
			},
		},
		{
			name: "plugin-responsive",
			description: __("Responsive"),
			group,
			load: async engine => {
				const { loadResponsivePlugin } = await import("@tsparticles/plugin-responsive");

				await loadResponsivePlugin(engine);
			},
		},
		{
			name: "plugin-sounds",
			description: __("Sounds"),
			group,
			load: async engine => {
				const { loadSoundsPlugin } = await import("@tsparticles/plugin-sounds");

				await loadSoundsPlugin(engine);
			},
		},
		{
			name: "plugin-themes",
			description: __("Themes"),
			group,
			load: async engine => {
				const { loadThemesPlugin } = await import("@tsparticles/plugin-themes");

				await loadThemesPlugin(engine);
			},
		},
		{
			name: "plugin-trail",
			description: __("Trail"),
			group,
			load: async engine => {
				const { loadTrailPlugin } = await import("@tsparticles/plugin-trail");

				await loadTrailPlugin(engine);
			},
		},
		{
			name: "plugin-zoom",
			description: __("Zoom"),
			group,
			load: async engine => {
				const { loadZoomPlugin } = await import("@tsparticles/plugin-zoom");

				await loadZoomPlugin(engine);
			},
		},
	];

export function getPlugins() {
	return transformLoadableObject(plugins);
}

export async function handlePlugins(pluginName, engine) {
	return handlePlugin(plugins, pluginName, engine);
}
