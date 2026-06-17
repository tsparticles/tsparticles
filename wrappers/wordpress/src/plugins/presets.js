import { __ } from "@wordpress/i18n";
import { handlePlugin, transformLoadableObject } from "../utils";

const group = __("Presets"),
	presets = [
		{
			name: "preset-ambient",
			description: __("Ambient"),
			group,
			load: async engine => {
				const { loadAmbientPreset } = await import("@tsparticles/preset-ambient");

				await loadAmbientPreset(engine);
			},
		},
		{
			name: "preset-big-circles",
			description: `${__("Big")} ${__("Circles")}`,
			group,
			load: async engine => {
				const { loadBigCirclesPreset } = await import("@tsparticles/preset-big-circles");

				await loadBigCirclesPreset(engine);
			},
		},
		{
			name: "preset-bubbles",
			description: __("Bubbles"),
			group,
			load: async engine => {
				const { loadBubblesPreset } = await import("@tsparticles/preset-bubbles");

				await loadBubblesPreset(engine);
			},
		},
		{
			name: "preset-confetti-cannon",
			description: `${__("Confetti")} ${__("Cannon")}`,
			group,
			load: async engine => {
				const { loadConfettiCannonPreset } = await import("@tsparticles/preset-confetti-cannon");

				await loadConfettiCannonPreset(engine);
			},
		},
		{
			name: "preset-confetti-explosions",
			description: `${__("Confetti")} ${__("Explosions")}`,
			group,
			load: async engine => {
				const { loadConfettiExplosionsPreset } = await import("@tsparticles/preset-confetti-explosions");

				await loadConfettiExplosionsPreset(engine);
			},
		},
		{
			name: "preset-confetti-falling",
			description: `${__("Confetti")} ${__("Falling")}`,
			group,
			load: async engine => {
				const { loadConfettiFallingPreset } = await import("@tsparticles/preset-confetti-falling");

				await loadConfettiFallingPreset(engine);
			},
		},
		{
			name: "preset-confetti-parade",
			description: `${__("Confetti")} ${__("Parade")}`,
			group,
			load: async engine => {
				const { loadConfettiParadePreset } = await import("@tsparticles/preset-confetti-parade");

				await loadConfettiParadePreset(engine);
			},
		},
		{
			name: "preset-confetti",
			description: __("Confetti"),
			group,
			load: async engine => {
				const { loadConfettiPreset } = await import("@tsparticles/preset-confetti");

				await loadConfettiPreset(engine);
			},
		},
		{
			name: "preset-fire",
			description: __("Fire"),
			group,
			load: async engine => {
				const { loadFirePreset } = await import("@tsparticles/preset-fire");

				await loadFirePreset(engine);
			},
		},
		{
			name: "preset-firefly",
			description: __("Firefly"),
			group,
			load: async engine => {
				const { loadFireflyPreset } = await import("@tsparticles/preset-firefly");

				await loadFireflyPreset(engine);
			},
		},
		{
			name: "preset-fireworks",
			description: __("Fireworks"),
			group,
			load: async engine => {
				const { loadFireworksPreset } = await import("@tsparticles/preset-fireworks");

				await loadFireworksPreset(engine);
			},
		},
		{
			name: "preset-fountain",
			description: __("Fountain"),
			group,
			load: async engine => {
				const { loadFountainPreset } = await import("@tsparticles/preset-fountain");

				await loadFountainPreset(engine);
			},
		},
		{
			name: "preset-hyperspace",
			description: __("Hyperspace"),
			group,
			load: async engine => {
				const { loadHyperspacePreset } = await import("@tsparticles/preset-hyperspace");

				await loadHyperspacePreset(engine);
			},
		},
		{
			name: "preset-links",
			description: __("Links"),
			group,
			load: async engine => {
				const { loadLinksPreset } = await import("@tsparticles/preset-links");

				await loadLinksPreset(engine);
			},
		},
		{
			name: "preset-matrix",
			description: __("Matrix"),
			group,
			load: async engine => {
				const { loadMatrixPreset } = await import("@tsparticles/preset-matrix");

				await loadMatrixPreset(engine);
			},
		},
		{
			name: "preset-meteors",
			description: __("Meteors"),
			group,
			load: async engine => {
				const { loadMeteorsPreset } = await import("@tsparticles/preset-meteors");

				await loadMeteorsPreset(engine);
			},
		},
		{
			name: "preset-party",
			description: __("Party"),
			group,
			load: async engine => {
				const { loadPartyPreset } = await import("@tsparticles/preset-party");

				await loadPartyPreset(engine);
			},
		},
		{
			name: "preset-sea-anemone",
			description: `${__("Sea")} ${__("Anemone")}`,
			group,
			load: async engine => {
				const { loadSeaAnemonePreset } = await import("@tsparticles/preset-sea-anemone");

				await loadSeaAnemonePreset(engine);
			},
		},
		{
			name: "preset-snow",
			description: __("Snow"),
			group,
			load: async engine => {
				const { loadSnowPreset } = await import("@tsparticles/preset-snow");

				await loadSnowPreset(engine);
			},
		},
		{
			name: "preset-squares",
			description: __("Squares"),
			group,
			load: async engine => {
				const { loadSquaresPreset } = await import("@tsparticles/preset-squares");

				await loadSquaresPreset(engine);
			},
		},
		{
			name: "preset-stars",
			description: __("Stars"),
			group,
			load: async engine => {
				const { loadStarsPreset } = await import("@tsparticles/preset-stars");

				await loadStarsPreset(engine);
			},
		},
		{
			name: "preset-triangles",
			description: __("Triangles"),
			group,
			load: async engine => {
				const { loadTrianglesPreset } = await import("@tsparticles/preset-triangles");

				await loadTrianglesPreset(engine);
			},
		},
	];

export function getPresets() {
	return transformLoadableObject(presets);
}

export async function handlePresets(pluginName, engine) {
	return handlePlugin(presets, pluginName, engine);
}
