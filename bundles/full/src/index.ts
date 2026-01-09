import { type EmittersEngine } from "@tsparticles/plugin-emitters";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Loads the full bundle with all plugins needed for running the tsParticles package.
 * This function must be called to make tsParticles work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the tsparticles package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 * @param loadMoreEmitterShapesShapes - a function to load more emitter shapes, the default is to load the circle and square shapes
 */
export function loadFull(
    engine: Engine,
    loadMoreEmitterShapesShapes?: (emittersEngine: EmittersEngine) => Promise<void>,
): void {
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
            { loadSlim } = await import("@tsparticles/slim");

        loadDestroyUpdater(e);
        loadRollUpdater(e);
        loadTiltUpdater(e);
        loadTwinkleUpdater(e);
        loadWobbleUpdater(e);

        loadTextShape(e);

        loadExternalTrailInteraction(e);

        loadAbsorbersPlugin(e);
        loadEmittersPlugin(e, async emittersEngine => {
            const { loadEmittersShapeCircle } = await import("@tsparticles/plugin-emitters-shape-circle"),
                { loadEmittersShapeSquare } = await import("@tsparticles/plugin-emitters-shape-square");

            await loadEmittersShapeCircle(emittersEngine);
            await loadEmittersShapeSquare(emittersEngine);

            if (loadMoreEmitterShapesShapes) {
                await loadMoreEmitterShapesShapes(emittersEngine);
            }
        });

        loadSlim(engine);
    });
}
