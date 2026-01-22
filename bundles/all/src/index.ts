import { type Engine } from "@tsparticles/engine";

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

  await engine.register(async e => {
    const { loadFull } = await import("tsparticles"),
      { loadHsvColorPlugin } = await import("@tsparticles/plugin-hsv-color"),
      { loadHwbColorPlugin } = await import("@tsparticles/plugin-hwb-color"),
      { loadLabColorPlugin } = await import("@tsparticles/plugin-lab-color"),
      { loadLchColorPlugin } = await import("@tsparticles/plugin-lch-color"),
      { loadOklabColorPlugin } = await import("@tsparticles/plugin-oklab-color"),
      { loadOklchColorPlugin } = await import("@tsparticles/plugin-oklch-color"),
      { loadNamedColorPlugin } = await import("@tsparticles/plugin-named-color"),
      { loadEasingBackPlugin } = await import("@tsparticles/plugin-easing-back"),
      { loadEasingBouncePlugin } = await import("@tsparticles/plugin-easing-bounce"),
      { loadEasingCircPlugin } = await import("@tsparticles/plugin-easing-circ"),
      { loadEasingCubicPlugin } = await import("@tsparticles/plugin-easing-cubic"),
      { loadEasingElasticPlugin } = await import("@tsparticles/plugin-easing-elastic"),
      { loadEasingExpoPlugin } = await import("@tsparticles/plugin-easing-expo"),
      { loadEasingGaussianPlugin } = await import("@tsparticles/plugin-easing-gaussian"),
      { loadEasingLinearPlugin } = await import("@tsparticles/plugin-easing-linear"),
      { loadEasingQuartPlugin } = await import("@tsparticles/plugin-easing-quart"),
      { loadEasingQuintPlugin } = await import("@tsparticles/plugin-easing-quint"),
      { loadEasingSigmoidPlugin } = await import("@tsparticles/plugin-easing-sigmoid"),
      { loadEasingSinePlugin } = await import("@tsparticles/plugin-easing-sine"),
      { loadEasingSmoothstepPlugin } = await import("@tsparticles/plugin-easing-smoothstep"),
      { loadBackgroundMaskPlugin } = await import("@tsparticles/plugin-background-mask"),
      { loadBlendPlugin } = await import("@tsparticles/plugin-blend"),
      { loadCanvasMaskPlugin } = await import("@tsparticles/plugin-canvas-mask"),
      { loadInfectionPlugin } = await import("@tsparticles/plugin-infection"),
      { loadManualParticlesPlugin } = await import("@tsparticles/plugin-manual-particles"),
      { loadMotionPlugin } = await import("@tsparticles/plugin-motion"),
      { loadPoissonDiscPlugin } = await import("@tsparticles/plugin-poisson-disc"),
      { loadPolygonMaskPlugin } = await import("@tsparticles/plugin-polygon-mask"),
      { loadResponsivePlugin } = await import("@tsparticles/plugin-responsive"),
      { loadSoundsPlugin } = await import("@tsparticles/plugin-sounds"),
      { loadThemesPlugin } = await import("@tsparticles/plugin-themes"),
      { loadTrailPlugin } = await import("@tsparticles/plugin-trail"),
      { loadExportImagePlugin } = await import("@tsparticles/plugin-export-image"),
      { loadExportJSONPlugin } = await import("@tsparticles/plugin-export-json"),
      { loadExportVideoPlugin } = await import("@tsparticles/plugin-export-video"),
      { loadExternalParticleInteraction } = await import("@tsparticles/interaction-external-particle"),
      { loadExternalPopInteraction } = await import("@tsparticles/interaction-external-pop"),
      { loadLightInteraction } = await import("@tsparticles/interaction-light"),
      { loadParticlesRepulseInteraction } = await import("@tsparticles/interaction-particles-repulse"),
      { loadGradientUpdater } = await import("@tsparticles/updater-gradient"),
      { loadHeartShape } = await import("@tsparticles/shape-heart"),
      { loadInfinityShape } = await import("@tsparticles/shape-infinity"),
      { loadPathShape } = await import("@tsparticles/shape-path"),
      { loadPolygonPath } = await import("@tsparticles/path-polygon"),
      { loadRoundedPolygonShape } = await import("@tsparticles/shape-rounded-polygon"),
      { loadRoundedRectShape } = await import("@tsparticles/shape-rounded-rect"),
      { loadSpiralShape } = await import("@tsparticles/shape-spiral"),
      { loadSVGPath } = await import("@tsparticles/path-svg"),
      { loadZigZagPath } = await import("@tsparticles/path-zig-zag"),
      { loadArrowShape } = await import("@tsparticles/shape-arrow"),
      { loadCardsShape } = await import("@tsparticles/shape-cards"),
      { loadCogShape } = await import("@tsparticles/shape-cog"),
      { loadOrbitUpdater } = await import("@tsparticles/updater-orbit"),
      { loadCurlNoisePath } = await import("@tsparticles/path-curl-noise"),
      { loadCurvesPath } = await import("@tsparticles/path-curves"),
      { loadFractalNoisePath } = await import("@tsparticles/path-fractal-noise"),
      { loadPerlinNoisePath } = await import("@tsparticles/path-perlin-noise"),
      { loadSimplexNoisePath } = await import("@tsparticles/path-simplex-noise"),
      { loadBubbleEffect } = await import("@tsparticles/effect-bubble"),
      { loadShadowEffect } = await import("@tsparticles/effect-shadow"),
      { loadTrailEffect } = await import("@tsparticles/effect-trail"),
      { loadEmittersShapeCanvas } = await import("@tsparticles/plugin-emitters-shape-canvas"),
      { loadEmittersShapePath } = await import("@tsparticles/plugin-emitters-shape-path"),
      { loadEmittersShapePolygon } = await import("@tsparticles/plugin-emitters-shape-polygon");

    await loadFull(e);

    await loadEmittersShapeCanvas(e);
    await loadEmittersShapePath(e);
    await loadEmittersShapePolygon(e);

    await loadHsvColorPlugin(e);
    await loadHwbColorPlugin(e);
    await loadLabColorPlugin(e);
    await loadLchColorPlugin(e);
    await loadOklabColorPlugin(e);
    await loadOklchColorPlugin(e);
    await loadNamedColorPlugin(e);

    await loadEasingBackPlugin(e);
    await loadEasingBouncePlugin(e);
    await loadEasingCircPlugin(e);
    await loadEasingCubicPlugin(e);
    await loadEasingElasticPlugin(e);
    await loadEasingExpoPlugin(e);
    await loadEasingGaussianPlugin(e);
    await loadEasingLinearPlugin(e);
    await loadEasingQuartPlugin(e);
    await loadEasingQuintPlugin(e);
    await loadEasingSigmoidPlugin(e);
    await loadEasingSinePlugin(e);
    await loadEasingSmoothstepPlugin(e);

    await loadBackgroundMaskPlugin(e);
    await loadBlendPlugin(e);
    await loadCanvasMaskPlugin(e);
    await loadInfectionPlugin(e);
    await loadManualParticlesPlugin(e);
    await loadMotionPlugin(e);
    await loadPoissonDiscPlugin(e);
    await loadPolygonMaskPlugin(e);
    await loadResponsivePlugin(e);
    await loadSoundsPlugin(e);
    await loadThemesPlugin(e);
    await loadTrailPlugin(e);

    await loadExportImagePlugin(e);
    await loadExportJSONPlugin(e);
    await loadExportVideoPlugin(e);

    await loadExternalParticleInteraction(e);
    await loadExternalPopInteraction(e);

    await loadLightInteraction(e);

    await loadParticlesRepulseInteraction(e);

    await loadGradientUpdater(e);
    await loadOrbitUpdater(e);

    await loadCurlNoisePath(e);
    await loadCurvesPath(e);
    await loadFractalNoisePath(e);
    await loadPerlinNoisePath(e);
    await loadPolygonPath(e);
    await loadSVGPath(e);
    await loadZigZagPath(e);
    await loadSimplexNoisePath(e);

    await loadBubbleEffect(e);
    await loadShadowEffect(e);
    await loadTrailEffect(e);

    await loadArrowShape(e);
    await loadCardsShape(e);
    await loadCogShape(e);
    await loadHeartShape(e);
    await loadInfinityShape(e);
    await loadPathShape(e);
    await loadRoundedPolygonShape(e);
    await loadRoundedRectShape(e);
    await loadSpiralShape(e);
  });
}
