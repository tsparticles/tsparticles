import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Loads the full bundle with all plugins needed for running the tsParticles package.
 * This function must be called to make tsParticles work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the tsparticles package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export function loadFull(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { loadDestroyUpdater } = await import("@tsparticles/updater-destroy"),
            { loadRollUpdater } = await import("@tsparticles/updater-roll"),
            { loadTiltUpdater } = await import("@tsparticles/updater-tilt"),
            { loadTwinkleUpdater } = await import("@tsparticles/updater-twinkle"),
            { loadWobbleUpdater } = await import("@tsparticles/updater-wobble"),
            { loadTextShape } = await import("@tsparticles/shape-text"),
            { loadExternalTrailInteraction } = await import("@tsparticles/interaction-external-trail"),
            { loadAbsorbersPlugin } = await import("@tsparticles/plugin-absorbers"),
            { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
            { loadEmittersShapeCircle } = await import("@tsparticles/plugin-emitters-shape-circle"),
            { loadEmittersShapeSquare } = await import("@tsparticles/plugin-emitters-shape-square"),
            { loadSlim } = await import("@tsparticles/slim");

        loadSlim(engine);

        loadDestroyUpdater(e);
        loadRollUpdater(e);
        loadTiltUpdater(e);
        loadTwinkleUpdater(e);
        loadWobbleUpdater(e);

        loadTextShape(e);

        loadExternalTrailInteraction(e);

        loadAbsorbersPlugin(e);
        loadEmittersPlugin(e);

        loadEmittersShapeCircle(e);
        loadEmittersShapeSquare(e);
    });
}
