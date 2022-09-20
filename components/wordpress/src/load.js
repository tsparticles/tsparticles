import { loadFull } from "tsparticles";
import { loadHsvColorPlugin } from "tsparticles-plugin-hsv-color";
import { loadCanvasMaskPlugin } from "tsparticles-plugin-canvas-mask";
import { loadInfectionPlugin } from "tsparticles-plugin-infection";
import { loadLightInteraction } from "tsparticles-interaction-light";
import { loadParticlesRepulseInteraction } from "tsparticles-interaction-particles-repulse";
import { loadGradientUpdater } from "tsparticles-updater-gradient";
import { loadOrbitUpdater } from "tsparticles-updater-orbit";
import { loadCurvesPath } from "tsparticles-path-curves";
import { loadPolygonPath } from "tsparticles-path-polygon";
import { loadPerlinNoisePath } from "tsparticles-path-perlin-noise";
import { loadSimplexNoisePath } from "tsparticles-path-simplex-noise";
import { loadBubbleShape } from "tsparticles-shape-bubble";
import { loadHeartShape } from "tsparticles-shape-heart";
import { loadMultilineTextShape } from "tsparticles-shape-multiline-text";
import { loadRoundedRectShape } from "tsparticles-shape-rounded-rect";
import { loadSpiralShape } from "tsparticles-shape-spiral";
import { loadBigCirclesPreset } from "tsparticles-preset-big-circles";
import { loadBubblesPreset } from "tsparticles-preset-bubbles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import { loadFirePreset } from "tsparticles-preset-fire";
import { loadFireflyPreset } from "tsparticles-preset-firefly";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { loadFountainPreset } from "tsparticles-preset-fountain";
import { loadLinksPreset } from "tsparticles-preset-links";
import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";
import { loadSnowPreset } from "tsparticles-preset-snow";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { loadTrianglesPreset } from "tsparticles-preset-triangles";

export async function loadWordpressParticles(engine) {
	await loadHsvColorPlugin();

	await loadFull(engine);

	await loadCanvasMaskPlugin(engine);
	await loadInfectionPlugin(engine);
	await loadLightInteraction(engine);
	await loadParticlesRepulseInteraction(engine);
	await loadGradientUpdater(engine);
	await loadOrbitUpdater(engine);
	await loadCurvesPath(engine);
	await loadPolygonPath(engine);
	await loadPerlinNoisePath(engine);
	await loadSimplexNoisePath(engine);
	await loadBubbleShape(engine);
	await loadHeartShape(engine);
	await loadMultilineTextShape(engine);
	await loadRoundedRectShape(engine);
	await loadSpiralShape(engine);

	await loadBigCirclesPreset(engine);
	await loadBubblesPreset(engine);
	await loadConfettiPreset(engine);
	await loadFirePreset(engine);
	await loadFireflyPreset(engine);
	await loadFireworksPreset(engine);
	await loadFountainPreset(engine);
	await loadLinksPreset(engine);
	await loadSeaAnemonePreset(engine);
	await loadSnowPreset(engine);
	await loadStarsPreset(engine);
	await loadTrianglesPreset(engine);
}
