export function getPlugins(attributes) {
	const allPlugins = [
		{ name: "bundle-full", description: "tsParticles", group: "Bundles" },
		{ name: "bundle-slim", description: "tsParticles Slim", group: "Bundles" },
		{ name: "particles.js", description: "tsParticles-Particles.js interoperability", group: "Bundles" },
		{
			name: "interaction-external-attract",
			description: "External Attract",
			group: "Interactions"
		},
		{
			name: "interaction-external-bounce",
			description: "External Bounce",
			group: "Interactions"
		},
		{
			name: "interaction-external-bubble",
			description: "External Bubble",
			group: "Interactions"
		},
		{
			name: "interaction-external-connect",
			description: "External Connect",
			group: "Interactions"
		},
		{
			name: "interaction-external-grab",
			description: "External Grab",
			group: "Interactions"
		},
		{
			name: "interaction-external-pause",
			description: "External Pause",
			group: "Interactions"
		},
		{
			name: "interaction-external-push",
			description: "External Push",
			group: "Interactions"
		},
		{
			name: "interaction-external-remove",
			description: "External Remove",
			group: "Interactions"
		},
		{
			name: "interaction-external-repulse",
			description: "External Repulse",
			group: "Interactions"
		},
		{
			name: "interaction-external-slow",
			description: "External Slow",
			group: "Interactions"
		},
		{
			name: "interaction-external-trail",
			description: "External Trail",
			group: "Interactions"
		},
		{ name: "interaction-light", description: "tsParticles Light", group: "Interactions" },
		{
			name: "interaction-particles-attract",
			description: "Particles Attract",
			group: "Interactions"
		},
		{
			name: "interaction-particles-collisions",
			description: "Particles Collisions",
			group: "Interactions"
		},
		{
			name: "interaction-particles-links",
			description: "Particles Links",
			group: "Interactions"
		},
		{
			name: "interaction-particles-repulse",
			description: "Particles Repulse",
			group: "Interactions"
		},
		{ name: "move-base", description: "Base", group: "Movers" },
		{ name: "move-parallax", description: "Parallax", group: "Movers" },
		{ name: "path-curves", description: "Curves", group: "Paths" },
		{ name: "path-perlin-noise", description: "Perlin Noise", group: "Paths" },
		{ name: "path-polygon", description: "Polygon", group: "Paths" },
		{ name: "path-simplex-noise", description: "Simplex Noise", group: "Paths" },
		{ name: "plugin-absorbers", description: "Absorbers", group: "Plugins" },
		{ name: "plugin-canvas-mask", description: "Canvas Mask", group: "Plugins" },
		{ name: "plugin-emitters", description: "Emitters", group: "Plugins" },
		{ name: "plugin-hsv-color", description: "HSV Color", group: "Plugins" },
		{ name: "plugin-infection", description: "Infection", group: "Plugins" },
		{ name: "plugin-polygon-mask", description: "Polygon Mask", group: "Plugins" },
		{ name: "preset-big-circles", description: "Big Circles", group: "Presets" },
		{ name: "preset-bubbles", description: "Bubbles", group: "Presets" },
		{ name: "preset-confetti", description: "Confetti", group: "Presets" },
		{ name: "preset-fire", description: "Fire", group: "Presets" },
		{ name: "preset-firefly", description: "Firefly", group: "Presets" },
		{ name: "preset-fireworks", description: "Fireworks", group: "Presets" },
		{ name: "preset-fountain", description: "Fountain", group: "Presets" },
		{ name: "preset-links", description: "Links", group: "Presets" },
		{ name: "preset-sea-anemone", description: "Sea Anemone", group: "Presets" },
		{ name: "preset-snow", description: "Snow", group: "Presets" },
		{ name: "preset-stars", description: "Stars", group: "Presets" },
		{ name: "preset-triangles", description: "Triangles", group: "Presets" },
		{ name: "shape-bubble", description: "Bubble", group: "Shapes" },
		{ name: "shape-circle", description: "Circle", group: "Shapes" },
		{ name: "shape-heart", description: "Heart", group: "Shapes" },
		{ name: "shape-image", description: "Image", group: "Shapes" },
		{ name: "shape-line", description: "Line", group: "Shapes" },
		{ name: "shape-multiline-text", description: "Multiline Text", group: "Shapes" },
		{ name: "shape-polygon", description: "Polygon", group: "Shapes" },
		{ name: "shape-rounded-rect", description: "Rounded Rectangle", group: "Shapes" },
		{ name: "shape-spiral", description: "Spiral", group: "Shapes" },
		{ name: "shape-square", description: "Square", group: "Shapes" },
		{ name: "shape-star", description: "Star", group: "Shapes" },
		{ name: "shape-text", description: "Text", group: "Shapes" },
		{ name: "updater-angle", description: "Angle", group: "Updaters" },
		{ name: "updater-color", description: "Color", group: "Updaters" },
		{ name: "updater-destroy", description: "Destroy", group: "Updaters" },
		{ name: "updater-gradient", description: "Gradient", group: "Updaters" },
		{ name: "updater-life", description: "Life", group: "Updaters" },
		{ name: "updater-opacity", description: "Opacity", group: "Updaters" },
		{ name: "updater-orbit", description: "Orbit", group: "Updaters" },
		{ name: "updater-out-modes", description: "Out Modes", group: "Updaters" },
		{ name: "updater-roll", description: "Roll", group: "Updaters" },
		{ name: "updater-size", description: "Size", group: "Updaters" },
		{ name: "updater-stroke-color", description: "Stroke Color", group: "Updaters" },
		{ name: "updater-tilt", description: "Tilt", group: "Updaters" },
		{ name: "updater-twinkle", description: "Twinkle", group: "Updaters" },
		{ name: "updater-wobble", description: "Wobble", group: "Updaters" },
	];

	if (!attributes) {
		return allPlugins;
	}

	return allPlugins.filter(plugin => Object.hasOwn(attributes, plugin.name) && attributes[plugin.name]);
}

export async function loadWordpressParticles(engine, plugins) {
	for (const plugin of plugins) {
		const pluginName = typeof plugin === "string" ? plugin : plugin.name;

		switch (pluginName) {
			case "bundle-full":
				const { loadFull } = await import("tsparticles");

				await loadFull(engine);
				break;

			case "bundle-slim":
				const { loadSlim } = await import("tsparticles-slim");

				await loadSlim(engine);
				break;

			case "interaction-external-attract":
				const { loadExternalAttractInteraction } = await import("tsparticles-interaction-external-attract");

				await loadExternalAttractInteraction(engine);
				break;

			case "interaction-external-bounce":
				const { loadExternalBounceInteraction } = await import("tsparticles-interaction-external-bounce");

				await loadExternalBounceInteraction(engine);
				break;

			case "interaction-external-bubble":
				const { loadExternalBubbleInteraction } = await import("tsparticles-interaction-external-bubble");

				await loadExternalBubbleInteraction(engine);
				break;

			case "interaction-external-connect":
				const { loadExternalConnectInteraction } = await import("tsparticles-interaction-external-connect");

				await loadExternalConnectInteraction(engine);
				break;

			case "interaction-external-grab":
				const { loadExternalGrabInteraction } = await import("tsparticles-interaction-external-grab");

				await loadExternalGrabInteraction(engine);
				break;

			case "interaction-external-pause":
				const { loadExternalPauseInteraction } = await import("tsparticles-interaction-external-pause");

				await loadExternalPauseInteraction(engine);
				break;

			case "interaction-external-push":
				const { loadExternalPushInteraction } = await import("tsparticles-interaction-external-push");

				await loadExternalPushInteraction(engine);
				break;

			case "interaction-external-remove":
				const { loadExternalRemoveInteraction } = await import("tsparticles-interaction-external-remove");

				await loadExternalRemoveInteraction(engine);
				break;

			case "interaction-external-repulse":
				const { loadExternalRepulseInteraction } = await import("tsparticles-interaction-external-repulse");

				await loadExternalRepulseInteraction(engine);
				break;

			case "interaction-external-slow":
				const { loadExternalSlowInteraction } = await import("tsparticles-interaction-external-slow");

				await loadExternalSlowInteraction(engine);
				break;

			case "interaction-external-trail":
				const { loadExternalTrailInteraction } = await import("tsparticles-interaction-external-trail");

				await loadExternalTrailInteraction(engine);
				break;

			case "interaction-light":
				const { loadLightInteraction } = await import("tsparticles-interaction-light");

				await loadLightInteraction(engine);
				break;

			case "interaction-particles-attract":
				const { loadParticlesAttractInteraction } = await import("tsparticles-interaction-particles-attract");

				await loadParticlesAttractInteraction(engine);
				break;

			case "interaction-particles-collisions":
				const { loadParticlesCollisionsInteraction } = await import("tsparticles-interaction-particles-collisions");

				await loadParticlesCollisionsInteraction(engine);
				break;

			case "interaction-particles-links":
				const { loadParticlesLinksInteraction } = await import("tsparticles-interaction-particles-links");

				await loadParticlesLinksInteraction(engine);
				break;

			case "interaction-particles-repulse":
				const { loadParticlesRepulseInteraction } = await import("tsparticles-interaction-particles-repulse");

				await loadParticlesRepulseInteraction(engine);
				break;

			case "move-base":
				const { loadBaseMover } = await import("tsparticles-move-base");

				await loadBaseMover(engine);
				break;

			case "move-parallax":
				const { loadParallaxMover } = await import("tsparticles-move-parallax");

				await loadParallaxMover(engine);
				break;

			case "particles.js":
				const { initPjs } = await import("tsparticles-particles.js");

				await initPjs(engine);
				break;

			case "path-curves":
				const { loadCurvesPath } = await import("tsparticles-path-curves");

				await loadCurvesPath(engine);
				break;

			case "path-perlin-noise":
				const { loadPerlinNoisePath } = await import("tsparticles-path-perlin-noise");

				await loadPerlinNoisePath(engine);
				break;

			case "path-polygon":
				const { loadPolygonPath } = await import("tsparticles-path-polygon");

				await loadPolygonPath(engine);
				break;

			case "path-simplex-noise":
				const { loadSimplexNoisePath } = await import("tsparticles-path-simplex-noise");

				await loadSimplexNoisePath(engine);
				break;

			case "plugin-absorbers":
				const { loadAbsorbersPlugin } = await import("tsparticles-plugin-absorbers");

				await loadAbsorbersPlugin(engine);
				break;

			case "plugin-canvas-mask":
				const { loadCanvasMaskPlugin } = await import("tsparticles-plugin-canvas-mask");

				await loadCanvasMaskPlugin(engine);
				break;

			case "plugin-emitters":
				const { loadEmittersPlugin } = await import("tsparticles-plugin-emitters");

				await loadEmittersPlugin(engine);
				break;

			case "plugin-hsv-color":
				const { loadHsvColorPlugin } = await import("tsparticles-plugin-hsv-color");

				await loadHsvColorPlugin();

				break;

			case "plugin-infection":
				const { loadInfectionPlugin } = await import("tsparticles-plugin-infection");

				await loadInfectionPlugin(engine);
				break;

			case "plugin-polygon-mask":
				const { loadPolygonMaskPlugin } = await import("tsparticles-plugin-polygon-mask");

				await loadPolygonMaskPlugin(engine);
				break;

			case "preset-big-circles":
				const { loadBigCirclesPreset } = await import("tsparticles-preset-big-circles");

				await loadBigCirclesPreset(engine);
				break;

			case "preset-bubbles":
				const { loadBubblesPreset } = await import("tsparticles-preset-bubbles");

				await loadBubblesPreset(engine);
				break;

			case "preset-confetti":
				const { loadConfettiPreset } = await import("tsparticles-preset-confetti");

				await loadConfettiPreset(engine);
				break;

			case "preset-fire":
				const { loadFirePreset } = await import("tsparticles-preset-fire");

				await loadFirePreset(engine);
				break;

			case "preset-firefly":
				const { loadFireflyPreset } = await import("tsparticles-preset-firefly");

				await loadFireflyPreset(engine);
				break;

			case "preset-fireworks":
				const { loadFireworksPreset } = await import("tsparticles-preset-fireworks");

				await loadFireworksPreset(engine);
				break;

			case "preset-fountain":
				const { loadFountainPreset } = await import("tsparticles-preset-fountain");

				await loadFountainPreset(engine);
				break;

			case "preset-links":
				const { loadLinksPreset } = await import("tsparticles-preset-links");

				await loadLinksPreset(engine);
				break;

			case "preset-sea-anemone":
				const { loadSeaAnemonePreset } = await import("tsparticles-preset-sea-anemone");

				await loadSeaAnemonePreset(engine);
				break;

			case "preset-snow":
				const { loadSnowPreset } = await import("tsparticles-preset-snow");

				await loadSnowPreset(engine);
				break;

			case "preset-stars":
				const { loadStarsPreset } = await import("tsparticles-preset-stars");

				await loadStarsPreset(engine);
				break;

			case "preset-triangles":
				const { loadTrianglesPreset } = await import("tsparticles-preset-triangles");

				await loadTrianglesPreset(engine);
				break;

			case "shape-bubble":
				const { loadBubbleShape } = await import("tsparticles-shape-bubble");

				await loadBubbleShape(engine);
				break;

			case "shape-circle":
				const { loadCircleShape } = await import("tsparticles-shape-circle");

				await loadCircleShape(engine);
				break;
			case "shape-heart":
				const { loadHeartShape } = await import("tsparticles-shape-heart");

				await loadHeartShape(engine);
				break;

			case "shape-image":
				const { loadImageShape } = await import("tsparticles-shape-image");

				await loadImageShape(engine);
				break;

			case "shape-line":
				const { loadLineShape } = await import("tsparticles-shape-line");

				await loadLineShape(engine);
				break;

			case "shape-multiline-text":
				const { loadMultilineTextShape } = await import("tsparticles-shape-multiline-text");

				await loadMultilineTextShape(engine);
				break;

			case "shape-polygon":
				const { loadPolygonShape } = await import("tsparticles-shape-polygon");

				await loadPolygonShape(engine);
				break;

			case "shape-rounded-rect":
				const { loadRoundedRectShape } = await import("tsparticles-shape-rounded-rect");

				await loadRoundedRectShape(engine);
				break;

			case "shape-spiral":
				const { loadSpiralShape } = await import("tsparticles-shape-spiral");

				await loadSpiralShape(engine);
				break;

			case "shape-square":
				const { loadSquareShape } = await import("tsparticles-shape-square");

				await loadSquareShape(engine);
				break;

			case "shape-star":
				const { loadStarShape } = await import("tsparticles-shape-star");

				await loadStarShape(engine);
				break;

			case "shape-text":
				const { loadTextShape } = await import("tsparticles-shape-text");

				await loadTextShape(engine);
				break;

			case "updater-angle":
				const { loadAngleUpdater } = await import("tsparticles-updater-angle");

				await loadAngleUpdater(engine);
				break;

			case "updater-color":
				const { loadColorUpdater } = await import("tsparticles-updater-color");

				await loadColorUpdater(engine);
				break;

			case "updater-destroy":
				const { loadDestroyUpdater } = await import("tsparticles-updater-destroy");

				await loadDestroyUpdater(engine);
				break;

			case "updater-gradient":
				const { loadGradientUpdater } = await import("tsparticles-updater-gradient");

				await loadGradientUpdater(engine);
				break;

			case "updater-life":
				const { loadLifeUpdater } = await import("tsparticles-updater-life");

				await loadLifeUpdater(engine);
				break;

			case "updater-opacity":
				const { loadOpacityUpdater } = await import("tsparticles-updater-opacity");

				await loadOpacityUpdater(engine);
				break;

			case "updater-orbit":
				const { loadOrbitUpdater } = await import("tsparticles-updater-orbit");

				await loadOrbitUpdater(engine);
				break;

			case "updater-out-modes":
				const { loadOutModesUpdater } = await import("tsparticles-updater-out-modes");

				await loadOutModesUpdater(engine);
				break;

			case "updater-roll":
				const { loadRollUpdater } = await import("tsparticles-updater-roll");

				await loadRollUpdater(engine);
				break;

			case "updater-size":
				const { loadSizeUpdater } = await import("tsparticles-updater-size");

				await loadSizeUpdater(engine);
				break;

			case "updater-stroke-color":
				const { loadStrokeColorUpdater } = await import("tsparticles-updater-stroke-color");

				await loadStrokeColorUpdater(engine);
				break;

			case "updater-tilt":
				const { loadTiltUpdater } = await import("tsparticles-updater-tilt");

				await loadTiltUpdater(engine);
				break;

			case "updater-twinkle":
				const { loadTwinkleUpdater } = await import("tsparticles-updater-twinkle");

				await loadTwinkleUpdater(engine);
				break;

			case "updater-wobble":
				const { loadWobbleUpdater } = await import("tsparticles-updater-wobble");

				await loadWobbleUpdater(engine);
				break;
		}
	}
}
