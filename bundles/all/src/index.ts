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
    const [
      { loadFull },

      { loadHsvColorPlugin },
      { loadHwbColorPlugin },
      { loadLabColorPlugin },
      { loadLchColorPlugin },
      { loadOklabColorPlugin },
      { loadOklchColorPlugin },
      { loadNamedColorPlugin },

      { loadEasingBackPlugin },
      { loadEasingBouncePlugin },
      { loadEasingCircPlugin },
      { loadEasingCubicPlugin },
      { loadEasingElasticPlugin },
      { loadEasingExpoPlugin },
      { loadEasingGaussianPlugin },
      { loadEasingLinearPlugin },
      { loadEasingQuartPlugin },
      { loadEasingQuintPlugin },
      { loadEasingSigmoidPlugin },
      { loadEasingSinePlugin },
      { loadEasingSmoothstepPlugin },

      { loadBackgroundMaskPlugin },
      { loadBlendPlugin },
      { loadCanvasMaskPlugin },
      { loadInfectionPlugin },
      { loadManualParticlesPlugin },
      { loadMotionPlugin },
      { loadPoissonDiscPlugin },
      { loadPolygonMaskPlugin },
      { loadResponsivePlugin },
      { loadSoundsPlugin },
      { loadThemesPlugin },
      { loadTrailPlugin },

      { loadExportImagePlugin },
      { loadExportJSONPlugin },
      { loadExportVideoPlugin },

      { loadExternalParticleInteraction },
      { loadExternalPopInteraction },
      { loadLightInteraction },
      { loadParticlesRepulseInteraction },

      { loadGradientUpdater },
      { loadOrbitUpdater },

      { loadBranchesPath },
      { loadBrownianPath },
      { loadCurlNoisePath },
      { loadCurvesPath },
      { loadFractalNoisePath },
      { loadGridPath },
      { loadLevyPath },
      { loadPerlinNoisePath },
      { loadPolygonPath },
      { loadSVGPath },
      { loadSpiralPath },
      { loadZigZagPath },
      { loadSimplexNoisePath },

      { loadBubbleEffect },
      { loadParticlesEffect },
      { loadShadowEffect },
      { loadTrailEffect },

      { loadArrowShape },
      { loadCardsShape },
      { loadCogShape },
      { loadHeartShape },
      { loadInfinityShape },
      { loadPathShape },
      { loadRoundedPolygonShape },
      { loadRoundedRectShape },
      { loadSpiralShape },

      { loadEmittersShapeCanvas },
      { loadEmittersShapePath },
      { loadEmittersShapePolygon },
    ] = await Promise.all([
      import("tsparticles"),

      import("@tsparticles/plugin-hsv-color"),
      import("@tsparticles/plugin-hwb-color"),
      import("@tsparticles/plugin-lab-color"),
      import("@tsparticles/plugin-lch-color"),
      import("@tsparticles/plugin-oklab-color"),
      import("@tsparticles/plugin-oklch-color"),
      import("@tsparticles/plugin-named-color"),

      import("@tsparticles/plugin-easing-back"),
      import("@tsparticles/plugin-easing-bounce"),
      import("@tsparticles/plugin-easing-circ"),
      import("@tsparticles/plugin-easing-cubic"),
      import("@tsparticles/plugin-easing-elastic"),
      import("@tsparticles/plugin-easing-expo"),
      import("@tsparticles/plugin-easing-gaussian"),
      import("@tsparticles/plugin-easing-linear"),
      import("@tsparticles/plugin-easing-quart"),
      import("@tsparticles/plugin-easing-quint"),
      import("@tsparticles/plugin-easing-sigmoid"),
      import("@tsparticles/plugin-easing-sine"),
      import("@tsparticles/plugin-easing-smoothstep"),

      import("@tsparticles/plugin-background-mask"),
      import("@tsparticles/plugin-blend"),
      import("@tsparticles/plugin-canvas-mask"),
      import("@tsparticles/plugin-infection"),
      import("@tsparticles/plugin-manual-particles"),
      import("@tsparticles/plugin-motion"),
      import("@tsparticles/plugin-poisson-disc"),
      import("@tsparticles/plugin-polygon-mask"),
      import("@tsparticles/plugin-responsive"),
      import("@tsparticles/plugin-sounds"),
      import("@tsparticles/plugin-themes"),
      import("@tsparticles/plugin-trail"),

      import("@tsparticles/plugin-export-image"),
      import("@tsparticles/plugin-export-json"),
      import("@tsparticles/plugin-export-video"),

      import("@tsparticles/interaction-external-particle"),
      import("@tsparticles/interaction-external-pop"),
      import("@tsparticles/interaction-light"),
      import("@tsparticles/interaction-particles-repulse"),

      import("@tsparticles/updater-gradient"),
      import("@tsparticles/updater-orbit"),

      import("@tsparticles/path-branches"),
      import("@tsparticles/path-brownian"),
      import("@tsparticles/path-curl-noise"),
      import("@tsparticles/path-curves"),
      import("@tsparticles/path-fractal-noise"),
      import("@tsparticles/path-grid"),
      import("@tsparticles/path-levy"),
      import("@tsparticles/path-perlin-noise"),
      import("@tsparticles/path-polygon"),
      import("@tsparticles/path-svg"),
      import("@tsparticles/path-spiral"),
      import("@tsparticles/path-zig-zag"),
      import("@tsparticles/path-simplex-noise"),

      import("@tsparticles/effect-bubble"),
      import("@tsparticles/effect-particles"),
      import("@tsparticles/effect-shadow"),
      import("@tsparticles/effect-trail"),

      import("@tsparticles/shape-arrow"),
      import("@tsparticles/shape-cards"),
      import("@tsparticles/shape-cog"),
      import("@tsparticles/shape-heart"),
      import("@tsparticles/shape-infinity"),
      import("@tsparticles/shape-path"),
      import("@tsparticles/shape-rounded-polygon"),
      import("@tsparticles/shape-rounded-rect"),
      import("@tsparticles/shape-spiral"),

      import("@tsparticles/plugin-emitters-shape-canvas"),
      import("@tsparticles/plugin-emitters-shape-path"),
      import("@tsparticles/plugin-emitters-shape-polygon"),
    ]);

    await loadFull(e);

    await Promise.all([
      loadEmittersShapeCanvas(e),
      loadEmittersShapePath(e),
      loadEmittersShapePolygon(e),

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
      loadBlendPlugin(e),
      loadCanvasMaskPlugin(e),
      loadInfectionPlugin(e),
      loadManualParticlesPlugin(e),
      loadMotionPlugin(e),
      loadPoissonDiscPlugin(e),
      loadPolygonMaskPlugin(e),
      loadResponsivePlugin(e),
      loadSoundsPlugin(e),
      loadThemesPlugin(e),
      loadTrailPlugin(e),

      loadExportImagePlugin(e),
      loadExportJSONPlugin(e),
      loadExportVideoPlugin(e),

      loadExternalParticleInteraction(e),
      loadExternalPopInteraction(e),
      loadLightInteraction(e),
      loadParticlesRepulseInteraction(e),

      loadGradientUpdater(e),
      loadOrbitUpdater(e),

      loadBranchesPath(e),
      loadBrownianPath(e),
      loadCurlNoisePath(e),
      loadCurvesPath(e),
      loadFractalNoisePath(e),
      loadGridPath(e),
      loadLevyPath(e),
      loadPerlinNoisePath(e),
      loadPolygonPath(e),
      loadSVGPath(e),
      loadSpiralPath(e),
      loadZigZagPath(e),
      loadSimplexNoisePath(e),

      loadBubbleEffect(e),
      loadParticlesEffect(e),
      loadShadowEffect(e),
      loadTrailEffect(e),

      loadArrowShape(e),
      loadCardsShape(e),
      loadCogShape(e),
      loadHeartShape(e),
      loadInfinityShape(e),
      loadPathShape(e),
      loadRoundedPolygonShape(e),
      loadRoundedRectShape(e),
      loadSpiralShape(e),
    ]);
  });
}
