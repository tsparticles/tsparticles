import { type Engine } from "@tsparticles/engine";
import { loadArrowShape } from "@tsparticles/shape-arrow";
import { loadBackgroundMaskPlugin } from "@tsparticles/plugin-background-mask";
import { loadBranchesPath } from "@tsparticles/path-branches";
import { loadBrownianPath } from "@tsparticles/path-brownian";
import { loadBubbleEffect } from "@tsparticles/effect-bubble";
import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";
import { loadCardsShape } from "@tsparticles/shape-cards";
import { loadCogShape } from "@tsparticles/shape-cog";
import { loadCurlNoisePath } from "@tsparticles/path-curl-noise";
import { loadCurvesPath } from "@tsparticles/path-curves";
import { loadEasingBackPlugin } from "@tsparticles/plugin-easing-back";
import { loadEasingBouncePlugin } from "@tsparticles/plugin-easing-bounce";
import { loadEasingCircPlugin } from "@tsparticles/plugin-easing-circ";
import { loadEasingCubicPlugin } from "@tsparticles/plugin-easing-cubic";
import { loadEasingElasticPlugin } from "@tsparticles/plugin-easing-elastic";
import { loadEasingExpoPlugin } from "@tsparticles/plugin-easing-expo";
import { loadEasingGaussianPlugin } from "@tsparticles/plugin-easing-gaussian";
import { loadEasingLinearPlugin } from "@tsparticles/plugin-easing-linear";
import { loadEasingQuartPlugin } from "@tsparticles/plugin-easing-quart";
import { loadEasingQuintPlugin } from "@tsparticles/plugin-easing-quint";
import { loadEasingSigmoidPlugin } from "@tsparticles/plugin-easing-sigmoid";
import { loadEasingSinePlugin } from "@tsparticles/plugin-easing-sine";
import { loadEasingSmoothstepPlugin } from "@tsparticles/plugin-easing-smoothstep";
import { loadEmittersShapeCanvas } from "@tsparticles/plugin-emitters-shape-canvas";
import { loadEmittersShapePath } from "@tsparticles/plugin-emitters-shape-path";
import { loadEmittersShapePolygon } from "@tsparticles/plugin-emitters-shape-polygon";
import { loadExportImagePlugin } from "@tsparticles/plugin-export-image";
import { loadExportJSONPlugin } from "@tsparticles/plugin-export-json";
import { loadExportVideoPlugin } from "@tsparticles/plugin-export-video";
import { loadExternalCannonInteraction } from "@tsparticles/interaction-external-cannon";
import { loadExternalParticleInteraction } from "@tsparticles/interaction-external-particle";
import { loadExternalPopInteraction } from "@tsparticles/interaction-external-pop";
import { loadFilterEffect } from "@tsparticles/effect-filter";
import { loadFractalNoisePath } from "@tsparticles/path-fractal-noise";
import { loadFull } from "tsparticles";
import { loadGradientUpdater } from "@tsparticles/updater-gradient";
import { loadGridPath } from "@tsparticles/path-grid";
import { loadHeartShape } from "@tsparticles/shape-heart";
import { loadHsvColorPlugin } from "@tsparticles/plugin-hsv-color";
import { loadHwbColorPlugin } from "@tsparticles/plugin-hwb-color";
import { loadInfectionPlugin } from "@tsparticles/plugin-infection";
import { loadInfinityShape } from "@tsparticles/shape-infinity";
import { loadLabColorPlugin } from "@tsparticles/plugin-lab-color";
import { loadLchColorPlugin } from "@tsparticles/plugin-lch-color";
import { loadLevyPath } from "@tsparticles/path-levy";
import { loadLightInteraction } from "@tsparticles/interaction-light";
import { loadManualParticlesPlugin } from "@tsparticles/plugin-manual-particles";
import { loadMatrixShape } from "@tsparticles/shape-matrix";
import { loadMotionPlugin } from "@tsparticles/plugin-motion";
import { loadNamedColorPlugin } from "@tsparticles/plugin-named-color";
import { loadOklabColorPlugin } from "@tsparticles/plugin-oklab-color";
import { loadOklchColorPlugin } from "@tsparticles/plugin-oklch-color";
import { loadOrbitUpdater } from "@tsparticles/updater-orbit";
import { loadParticlesEffect } from "@tsparticles/effect-particles";
import { loadParticlesRepulseInteraction } from "@tsparticles/interaction-particles-repulse";
import { loadPathShape } from "@tsparticles/shape-path";
import { loadPerlinNoisePath } from "@tsparticles/path-perlin-noise";
import { loadPoissonDiscPlugin } from "@tsparticles/plugin-poisson-disc";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import { loadPolygonPath } from "@tsparticles/path-polygon";
import { loadRandomPath } from "@tsparticles/path-random";
import { loadResponsivePlugin } from "@tsparticles/plugin-responsive";
import { loadRoundedPolygonShape } from "@tsparticles/shape-rounded-polygon";
import { loadRoundedRectShape } from "@tsparticles/shape-rounded-rect";
import { loadSVGPath } from "@tsparticles/path-svg";
import { loadShadowEffect } from "@tsparticles/effect-shadow";
import { loadSimplexNoisePath } from "@tsparticles/path-simplex-noise";
import { loadSoundsPlugin } from "@tsparticles/plugin-sounds";
import { loadSpiralPath } from "@tsparticles/path-spiral";
import { loadSpiralShape } from "@tsparticles/shape-spiral";
import { loadSquircleShape } from "@tsparticles/shape-squircle";
import { loadThemesPlugin } from "@tsparticles/plugin-themes";
import { loadTrailEffect } from "@tsparticles/effect-trail";
import { loadTrailPlugin } from "@tsparticles/plugin-trail";
import { loadZigZagPath } from "@tsparticles/path-zig-zag";
import { loadZoomPlugin } from "@tsparticles/plugin-zoom";

declare const __VERSION__: string;

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles All package.
 * This function must be called to make tsParticles All work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/all package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export async function loadAll(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const loadInteractionsForAll = async (e: Engine): Promise<void> => {
      await loadFull(e);

      await Promise.all([
        loadExternalCannonInteraction(e),
        loadExternalParticleInteraction(e),
        loadExternalPopInteraction(e),
        loadLightInteraction(e),
        loadParticlesRepulseInteraction(e),

        loadInfectionPlugin(e),

        loadEmittersShapeCanvas(e),
        loadEmittersShapePath(e),
        loadEmittersShapePolygon(e),

        loadBranchesPath(e),
        loadBrownianPath(e),
        loadCurlNoisePath(e),
        loadCurvesPath(e),
        loadFractalNoisePath(e),
        loadGridPath(e),
        loadLevyPath(e),
        loadPerlinNoisePath(e),
        loadPolygonPath(e),
        loadRandomPath(e),
        loadSVGPath(e),
        loadSpiralPath(e),
        loadZigZagPath(e),
        loadSimplexNoisePath(e),
      ]);
    };

    await Promise.all([
      loadInteractionsForAll(e),

      loadHsvColorPlugin(e),
      loadHwbColorPlugin(e),
      loadLabColorPlugin(e),
      loadLchColorPlugin(e),
      loadOklabColorPlugin(e),
      loadOklchColorPlugin(e),
      loadNamedColorPlugin(e),

      loadEasingBackPlugin(e),
      loadEasingBouncePlugin(e),
      loadEasingCircPlugin(e),
      loadEasingCubicPlugin(e),
      loadEasingElasticPlugin(e),
      loadEasingExpoPlugin(e),
      loadEasingGaussianPlugin(e),
      loadEasingLinearPlugin(e),
      loadEasingQuartPlugin(e),
      loadEasingQuintPlugin(e),
      loadEasingSigmoidPlugin(e),
      loadEasingSinePlugin(e),
      loadEasingSmoothstepPlugin(e),

      loadBackgroundMaskPlugin(e),
      loadCanvasMaskPlugin(e),
      loadManualParticlesPlugin(e),
      loadMotionPlugin(e),
      loadPoissonDiscPlugin(e),
      loadPolygonMaskPlugin(e),
      loadResponsivePlugin(e),
      loadSoundsPlugin(e),
      loadThemesPlugin(e),
      loadTrailPlugin(e),
      loadZoomPlugin(e),

      loadExportImagePlugin(e),
      loadExportJSONPlugin(e),
      loadExportVideoPlugin(e),

      loadGradientUpdater(e),
      loadOrbitUpdater(e),

      loadBubbleEffect(e),
      loadFilterEffect(e),
      loadParticlesEffect(e),
      loadShadowEffect(e),
      loadTrailEffect(e),

      loadArrowShape(e),
      loadCardsShape(e),
      loadCogShape(e),
      loadHeartShape(e),
      loadInfinityShape(e),
      loadMatrixShape(e),
      loadPathShape(e),
      loadRoundedPolygonShape(e),
      loadRoundedRectShape(e),
      loadSpiralShape(e),
      loadSquircleShape(e),
    ]);
  });
}
