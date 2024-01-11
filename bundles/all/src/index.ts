import type { Engine } from "@tsparticles/engine";

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles All package.
 * This function must be called to make tsParticles All work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/all package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 * @param refresh -
 */
export async function loadAll(engine: Engine, refresh = true): Promise<void> {
    const { initPjs } = await import("@tsparticles/pjs"),
        { loadFull } = await import("tsparticles"),
        { loadHsvColorPlugin } = await import("@tsparticles/plugin-hsv-color"),
        { loadEasingBackPlugin } = await import("@tsparticles/plugin-easing-back"),
        { loadEasingCircPlugin } = await import("@tsparticles/plugin-easing-circ"),
        { loadEasingCubicPlugin } = await import("@tsparticles/plugin-easing-cubic"),
        { loadEasingExpoPlugin } = await import("@tsparticles/plugin-easing-expo"),
        { loadEasingLinearPlugin } = await import("@tsparticles/plugin-easing-linear"),
        { loadEasingQuartPlugin } = await import("@tsparticles/plugin-easing-quart"),
        { loadEasingQuintPlugin } = await import("@tsparticles/plugin-easing-quint"),
        { loadEasingSinePlugin } = await import("@tsparticles/plugin-easing-sine"),
        { loadEmittersShapeCanvas } = await import("@tsparticles/plugin-emitters-shape-canvas"),
        { loadEmittersShapePath } = await import("@tsparticles/plugin-emitters-shape-path"),
        { loadEmittersShapePolygon } = await import("@tsparticles/plugin-emitters-shape-polygon"),
        { loadCanvasMaskPlugin } = await import("@tsparticles/plugin-canvas-mask"),
        { loadInfectionPlugin } = await import("@tsparticles/plugin-infection"),
        { loadMotionPlugin } = await import("@tsparticles/plugin-motion"),
        { loadPolygonMaskPlugin } = await import("@tsparticles/plugin-polygon-mask"),
        { loadSoundsPlugin } = await import("@tsparticles/plugin-sounds"),
        { loadExportImagePlugin } = await import("@tsparticles/plugin-export-image"),
        { loadExportJSONPlugin } = await import("@tsparticles/plugin-export-json"),
        { loadExportVideoPlugin } = await import("@tsparticles/plugin-export-video"),
        { loadExternalPopInteraction } = await import("@tsparticles/interaction-external-pop"),
        { loadLightInteraction } = await import("@tsparticles/interaction-light"),
        { loadParticlesRepulseInteraction } = await import("@tsparticles/interaction-particles-repulse"),
        { loadGradientUpdater } = await import("@tsparticles/updater-gradient"),
        { loadOrbitUpdater } = await import("@tsparticles/updater-orbit"),
        { loadCurvesPath } = await import("@tsparticles/path-curves"),
        { loadCurlNoisePath } = await import("@tsparticles/path-curl-noise"),
        { loadPerlinNoisePath } = await import("@tsparticles/path-perlin-noise"),
        { loadPoissonDiscPlugin } = await import("@tsparticles/plugin-poisson-disc"),
        { loadPolygonPath } = await import("@tsparticles/path-polygon"),
        { loadSVGPath } = await import("@tsparticles/path-svg"),
        { loadZigZagPath } = await import("@tsparticles/path-zig-zag"),
        { loadSimplexNoisePath } = await import("@tsparticles/path-simplex-noise"),
        { loadBubbleEffect } = await import("@tsparticles/effect-bubble"),
        { loadArrowShape } = await import("@tsparticles/shape-arrow"),
        { loadCardsShape } = await import("@tsparticles/shape-cards"),
        { loadCogShape } = await import("@tsparticles/shape-cog"),
        { loadHeartShape } = await import("@tsparticles/shape-heart"),
        { loadPathShape } = await import("@tsparticles/shape-path"),
        { loadRoundedPolygonShape } = await import("@tsparticles/shape-rounded-polygon"),
        { loadRoundedRectShape } = await import("@tsparticles/shape-rounded-rect"),
        { loadSpiralShape } = await import("@tsparticles/shape-spiral"),
        { loadTrailEffect } = await import("@tsparticles/effect-trail");

    initPjs(engine);

    await loadFull(engine, false);

    await loadHsvColorPlugin();
    await loadEasingBackPlugin();
    await loadEasingCircPlugin();
    await loadEasingCubicPlugin();
    await loadEasingExpoPlugin();
    await loadEasingLinearPlugin();
    await loadEasingQuartPlugin();
    await loadEasingQuintPlugin();
    await loadEasingSinePlugin();

    await loadEmittersShapeCanvas(engine, false);
    await loadEmittersShapePath(engine, false);
    await loadEmittersShapePolygon(engine, false);

    await loadHsvColorPlugin();

    await loadCanvasMaskPlugin(engine, false);
    await loadInfectionPlugin(engine, false);
    await loadMotionPlugin(engine, false);
    await loadPolygonMaskPlugin(engine, false);
    await loadSoundsPlugin(engine, false);
    await loadExportImagePlugin(engine, false);
    await loadExportJSONPlugin(engine, false);
    await loadExportVideoPlugin(engine, false);
    await loadExternalPopInteraction(engine, false);
    await loadLightInteraction(engine, false);
    await loadParticlesRepulseInteraction(engine, false);
    await loadGradientUpdater(engine, false);
    await loadOrbitUpdater(engine, false);
    await loadCurvesPath(engine, false);
    await loadCurlNoisePath(engine, false);
    await loadPerlinNoisePath(engine, false);
    await loadPoissonDiscPlugin(engine, false);
    await loadPolygonPath(engine, false);
    await loadSVGPath(engine, false);
    await loadZigZagPath(engine, false);
    await loadSimplexNoisePath(engine, false);
    await loadBubbleEffect(engine, false);
    await loadArrowShape(engine, false);
    await loadCardsShape(engine, false);
    await loadCogShape(engine, false);
    await loadHeartShape(engine, false);
    await loadPathShape(engine, false);
    await loadRoundedPolygonShape(engine, false);
    await loadRoundedRectShape(engine, false);
    await loadSpiralShape(engine, false);
    await loadTrailEffect(engine, false);

    await engine.refresh(refresh);
}
