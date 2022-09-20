export function getPlugins(attributes) {
	const allPlugins = [
		"bundle-full",
		"bundle-slim",
		"interaction-external-attract",
		"interaction-external-bounce",
		"interaction-external-bubble",
		"interaction-external-connect",
		"interaction-external-grab",
		"interaction-external-pause",
		"interaction-external-push",
		"interaction-external-remove",
		"interaction-external-repulse",
		"interaction-external-slow",
		"interaction-external-trail",
		"interaction-light",
		"interaction-particles-attract",
		"interaction-particles-collisions",
		"interaction-particles-links",
		"interaction-particles-repulse",
		"move-base",
		"move-parallax",
		"particles.js",
		"path-curves",
		"path-perlin-noise",
		"path-polygon",
		"path-simplex-noise",
		"plugin-absorbers",
		"plugin-canvas-mask",
		"plugin-emitters",
		"plugin-hsv-color",
		"plugin-infection",
		"plugin-polygon-mask",
		"preset-big-circles",
		"preset-bubbles",
		"preset-confetti",
		"preset-fire",
		"preset-firefly",
		"preset-fireworks",
		"preset-fountain",
		"preset-links",
		"preset-sea-anemone",
		"preset-snow",
		"preset-stars",
		"preset-triangles",
		"shape-bubble",
		"shape-circle",
		"shape-heart",
		"shape-image",
		"shape-line",
		"shape-multiline-text",
		"shape-polygon",
		"shape-rounded-rect",
		"shape-spiral",
		"shape-square",
		"shape-star",
		"shape-text",
		"updater-angle",
		"updater-color",
		"updater-destroy",
		"updater-gradient",
		"updater-life",
		"updater-opacity",
		"updater-orbit",
		"updater-out-modes",
		"updater-roll",
		"updater-size",
		"updater-stroke-color",
		"updater-tilt",
		"updater-twinkle",
		"updater-wobble",
	];

	if (!attributes) {
		return allPlugins;
	}

	return allPlugins.filter(plugin => Object.hasOwn(attributes, plugin) && attributes[plugin]);
}

export async function loadWordpressParticles(engine, plugins) {
	for (const plugin of plugins) {
		switch (plugin) {
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
