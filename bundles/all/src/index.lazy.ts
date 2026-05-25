import { type Engine } from "@tsparticles/engine/lazy";

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
        { loadZoomPlugin },

        { loadExportImagePlugin },
        { loadExportJSONPlugin },
        { loadExportVideoPlugin },

        { loadExternalCannonInteraction },
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
        { loadRandomPath },
        { loadSimplexNoisePath },
        { loadSpiralPath },
        { loadSVGPath },
        { loadZigZagPath },

        { loadBubbleEffect },
        { loadFilterEffect },
        { loadParticlesEffect },
        { loadShadowEffect },
        { loadTrailEffect },

        { loadArrowShape },
        { loadCardsShape },
        { loadCogShape },
        { loadHeartShape },
        { loadInfinityShape },
        { loadMatrixShape },
        { loadPathShape },
        { loadRibbonShape },
        { loadRoundedPolygonShape },
        { loadRoundedRectShape },
        { loadSpiralShape },
        { loadSquircleShape },

        { loadEmittersShapeCanvas },
        { loadEmittersShapePath },
        { loadEmittersShapePolygon },
      ] = await Promise.all([
        import("tsparticles/lazy"),

        import("@tsparticles/plugin-hsv-color/lazy"),
        import("@tsparticles/plugin-hwb-color/lazy"),
        import("@tsparticles/plugin-lab-color/lazy"),
        import("@tsparticles/plugin-lch-color/lazy"),
        import("@tsparticles/plugin-oklab-color/lazy"),
        import("@tsparticles/plugin-oklch-color/lazy"),
        import("@tsparticles/plugin-named-color/lazy"),

        import("@tsparticles/plugin-easing-back/lazy"),
        import("@tsparticles/plugin-easing-bounce/lazy"),
        import("@tsparticles/plugin-easing-circ/lazy"),
        import("@tsparticles/plugin-easing-cubic/lazy"),
        import("@tsparticles/plugin-easing-elastic/lazy"),
        import("@tsparticles/plugin-easing-expo/lazy"),
        import("@tsparticles/plugin-easing-gaussian/lazy"),
        import("@tsparticles/plugin-easing-linear/lazy"),
        import("@tsparticles/plugin-easing-quart/lazy"),
        import("@tsparticles/plugin-easing-quint/lazy"),
        import("@tsparticles/plugin-easing-sigmoid/lazy"),
        import("@tsparticles/plugin-easing-sine/lazy"),
        import("@tsparticles/plugin-easing-smoothstep/lazy"),

        import("@tsparticles/plugin-background-mask/lazy"),
        import("@tsparticles/plugin-canvas-mask/lazy"),
        import("@tsparticles/plugin-infection/lazy"),
        import("@tsparticles/plugin-manual-particles/lazy"),
        import("@tsparticles/plugin-motion/lazy"),
        import("@tsparticles/plugin-poisson-disc/lazy"),
        import("@tsparticles/plugin-polygon-mask/lazy"),
        import("@tsparticles/plugin-responsive/lazy"),
        import("@tsparticles/plugin-sounds/lazy"),
        import("@tsparticles/plugin-themes/lazy"),
        import("@tsparticles/plugin-trail/lazy"),
        import("@tsparticles/plugin-zoom/lazy"),

        import("@tsparticles/plugin-export-image/lazy"),
        import("@tsparticles/plugin-export-json/lazy"),
        import("@tsparticles/plugin-export-video/lazy"),

        import("@tsparticles/interaction-external-cannon/lazy"),
        import("@tsparticles/interaction-external-particle/lazy"),
        import("@tsparticles/interaction-external-pop/lazy"),
        import("@tsparticles/interaction-light/lazy"),
        import("@tsparticles/interaction-particles-repulse/lazy"),

        import("@tsparticles/updater-gradient/lazy"),
        import("@tsparticles/updater-orbit/lazy"),

        import("@tsparticles/path-branches/lazy"),
        import("@tsparticles/path-brownian/lazy"),
        import("@tsparticles/path-curl-noise/lazy"),
        import("@tsparticles/path-curves/lazy"),
        import("@tsparticles/path-fractal-noise/lazy"),
        import("@tsparticles/path-grid/lazy"),
        import("@tsparticles/path-levy/lazy"),
        import("@tsparticles/path-perlin-noise/lazy"),
        import("@tsparticles/path-polygon/lazy"),
        import("@tsparticles/path-random/lazy"),
        import("@tsparticles/path-simplex-noise/lazy"),
        import("@tsparticles/path-spiral/lazy"),
        import("@tsparticles/path-svg/lazy"),
        import("@tsparticles/path-zig-zag/lazy"),

        import("@tsparticles/effect-bubble/lazy"),
        import("@tsparticles/effect-filter/lazy"),
        import("@tsparticles/effect-particles/lazy"),
        import("@tsparticles/effect-shadow/lazy"),
        import("@tsparticles/effect-trail/lazy"),

        import("@tsparticles/shape-arrow/lazy"),
        import("@tsparticles/shape-cards/lazy"),
        import("@tsparticles/shape-cog/lazy"),
        import("@tsparticles/shape-heart/lazy"),
        import("@tsparticles/shape-infinity/lazy"),
        import("@tsparticles/shape-matrix/lazy"),
        import("@tsparticles/shape-path/lazy"),
        import("@tsparticles/shape-ribbon/lazy"),
        import("@tsparticles/shape-rounded-polygon/lazy"),
        import("@tsparticles/shape-rounded-rect/lazy"),
        import("@tsparticles/shape-spiral/lazy"),
        import("@tsparticles/shape-squircle/lazy"),

        import("@tsparticles/plugin-emitters-shape-canvas/lazy"),
        import("@tsparticles/plugin-emitters-shape-path/lazy"),
        import("@tsparticles/plugin-emitters-shape-polygon/lazy"),
      ]),
      loadInteractionsForAll = async (e: Engine): Promise<void> => {
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
      loadRibbonShape(e),
      loadRoundedPolygonShape(e),
      loadRoundedRectShape(e),
      loadSpiralShape(e),
      loadSquircleShape(e),
    ]);
  });
}
