import type { Engine } from "@tsparticles/engine";

/**
 * Loads the full bundle with all plugins needed for running the tsParticles package.
 * This function must be called to make tsParticles work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the tsparticles package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 * @param refresh -
 */
export async function loadFull(engine: Engine, refresh = true): Promise<void> {
    const { loadAbsorbersPlugin } = await import("@tsparticles/plugin-absorbers"),
        { loadDestroyUpdater } = await import("@tsparticles/updater-destroy"),
        { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
        { loadEmittersShapeCircle } = await import("@tsparticles/plugin-emitters-shape-circle"),
        { loadEmittersShapeSquare } = await import("@tsparticles/plugin-emitters-shape-square"),
        { loadExternalTrailInteraction } = await import("@tsparticles/interaction-external-trail"),
        { loadRollUpdater } = await import("@tsparticles/updater-roll"),
        { loadSlim } = await import("@tsparticles/slim"),
        { loadTextShape } = await import("@tsparticles/shape-text"),
        { loadTiltUpdater } = await import("@tsparticles/updater-tilt"),
        { loadTwinkleUpdater } = await import("@tsparticles/updater-twinkle"),
        { loadWobbleUpdater } = await import("@tsparticles/updater-wobble");

    await loadDestroyUpdater(engine, false);
    await loadRollUpdater(engine, false);
    await loadTiltUpdater(engine, false);
    await loadTwinkleUpdater(engine, false);
    await loadWobbleUpdater(engine, false);

    await loadTextShape(engine, false);

    await loadExternalTrailInteraction(engine, false);

    await loadAbsorbersPlugin(engine, false);
    await loadEmittersPlugin(engine, false);

    await loadEmittersShapeCircle(engine, false);
    await loadEmittersShapeSquare(engine, false);

    await loadSlim(engine, refresh);
}
