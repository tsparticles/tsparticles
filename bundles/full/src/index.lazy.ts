import type { Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * Loads the full bundle with all plugins needed for running the tsParticles package.
 * This function must be called to make tsParticles work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the tsparticles package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export async function loadFull(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [
        { loadSlim },
        { loadExternalDragInteraction },
        { loadExternalTrailInteraction },
        { loadAbsorbersPlugin },
        { loadEmittersPlugin },
        { loadEmittersShapeCircle },
        { loadEmittersShapeSquare },
        { loadTextShape },
        { loadDestroyUpdater },
        { loadRollUpdater },
        { loadTiltUpdater },
        { loadTwinkleUpdater },
        { loadWobbleUpdater },
      ] = await Promise.all([
        import("@tsparticles/slim/lazy"),

        import("@tsparticles/interaction-external-drag/lazy"),
        import("@tsparticles/interaction-external-trail/lazy"),

        import("@tsparticles/plugin-absorbers/lazy"),
        import("@tsparticles/plugin-emitters/lazy"),
        import("@tsparticles/plugin-emitters-shape-circle/lazy"),
        import("@tsparticles/plugin-emitters-shape-square/lazy"),

        import("@tsparticles/shape-text/lazy"),

        import("@tsparticles/updater-destroy/lazy"),
        import("@tsparticles/updater-roll/lazy"),
        import("@tsparticles/updater-tilt/lazy"),
        import("@tsparticles/updater-twinkle/lazy"),
        import("@tsparticles/updater-wobble/lazy"),
      ]),
      loadEmittersPluginBundle = async (e: Engine): Promise<void> => {
        await loadEmittersPlugin(e);

        await Promise.all([
          loadEmittersShapeCircle(e),
          loadEmittersShapeSquare(e),
        ]);
      },
      loadInteractivityForFull = async (e: Engine): Promise<void> => {
        await loadSlim(e);

        await Promise.all([
          loadExternalDragInteraction(e),
          loadExternalTrailInteraction(e),

          loadAbsorbersPlugin(e),
          loadEmittersPluginBundle(e),
        ]);
      };

    await Promise.all([
      loadInteractivityForFull(e),

      loadDestroyUpdater(e),
      loadRollUpdater(e),
      loadTiltUpdater(e),
      loadTwinkleUpdater(e),
      loadWobbleUpdater(e),

      loadTextShape(e),
    ]);
  });
}
