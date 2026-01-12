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
export function loadAll(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { initPjs } = await import("@tsparticles/pjs"),
            { loadFull } = await import("tsparticles"),
            { loadHsvColorPlugin } = await import("@tsparticles/plugin-hsv-color"),
            { loadHwbColorPlugin } = await import("@tsparticles/plugin-hwb-color"),
            { loadLabColorPlugin } = await import("@tsparticles/plugin-lab-color"),
            { loadLchColorPlugin } = await import("@tsparticles/plugin-lch-color"),
            { loadOklabColorPlugin } = await import("@tsparticles/plugin-oklab-color"),
            { loadOklchColorPlugin } = await import("@tsparticles/plugin-oklch-color"),
            { loadNamedColorPlugin } = await import("@tsparticles/plugin-named-color"),
            { loadEasingBackPlugin } = await import("@tsparticles/plugin-easing-back"),
            { loadEasingCircPlugin } = await import("@tsparticles/plugin-easing-circ"),
            { loadEasingCubicPlugin } = await import("@tsparticles/plugin-easing-cubic"),
            { loadEasingExpoPlugin } = await import("@tsparticles/plugin-easing-expo"),
            { loadEasingLinearPlugin } = await import("@tsparticles/plugin-easing-linear"),
            { loadEasingQuartPlugin } = await import("@tsparticles/plugin-easing-quart"),
            { loadEasingQuintPlugin } = await import("@tsparticles/plugin-easing-quint"),
            { loadEasingSinePlugin } = await import("@tsparticles/plugin-easing-sine"),
            { loadBackgroundMaskPlugin } = await import("@tsparticles/plugin-background-mask"),
            { loadCanvasMaskPlugin } = await import("@tsparticles/plugin-canvas-mask"),
            { loadInfectionPlugin } = await import("@tsparticles/plugin-infection"),
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

        initPjs(e);

        loadFull(e);

        loadEmittersShapeCanvas(e);
        loadEmittersShapePath(e);
        loadEmittersShapePolygon(e);

        loadHsvColorPlugin(e);
        loadHwbColorPlugin(e);
        loadLabColorPlugin(e);
        loadLchColorPlugin(e);
        loadOklabColorPlugin(e);
        loadOklchColorPlugin(e);
        loadNamedColorPlugin(e);

        loadEasingBackPlugin(e);
        loadEasingCircPlugin(e);
        loadEasingCubicPlugin(e);
        loadEasingExpoPlugin(e);
        loadEasingLinearPlugin(e);
        loadEasingQuartPlugin(e);
        loadEasingQuintPlugin(e);
        loadEasingSinePlugin(e);

        loadBackgroundMaskPlugin(e);
        loadCanvasMaskPlugin(e);
        loadInfectionPlugin(e);
        loadMotionPlugin(e);
        loadPoissonDiscPlugin(e);
        loadPolygonMaskPlugin(e);
        loadResponsivePlugin(e);
        loadSoundsPlugin(e);
        loadThemesPlugin(e);
        loadTrailPlugin(e);

        loadExportImagePlugin(e);
        loadExportJSONPlugin(e);
        loadExportVideoPlugin(e);

        loadExternalParticleInteraction(e);
        loadExternalPopInteraction(e);

        loadLightInteraction(e);

        loadParticlesRepulseInteraction(e);

        loadGradientUpdater(e);
        loadOrbitUpdater(e);

        loadCurlNoisePath(e);
        loadCurvesPath(e);
        loadFractalNoisePath(e);
        loadPerlinNoisePath(e);
        loadPolygonPath(e);
        loadSVGPath(e);
        loadZigZagPath(e);
        loadSimplexNoisePath(e);

        loadBubbleEffect(e);
        loadShadowEffect(e);
        loadTrailEffect(e);

        loadArrowShape(e);
        loadCardsShape(e);
        loadCogShape(e);
        loadHeartShape(e);
        loadInfinityShape(e);
        loadPathShape(e);
        loadRoundedPolygonShape(e);
        loadRoundedRectShape(e);
        loadSpiralShape(e);
    });
}
