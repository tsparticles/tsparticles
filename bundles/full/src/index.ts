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
export async function loadFull(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const [
      { loadDestroyUpdater },
      { loadRollUpdater },
      { loadTiltUpdater },
      { loadTwinkleUpdater },
      { loadWobbleUpdater },
      { loadTextShape },
      { loadExternalTrailInteraction },
      { loadAbsorbersPlugin },
      { loadEmittersPlugin },
      { loadEmittersShapeCircle },
      { loadEmittersShapeSquare },
      { loadSlim },
    ] = await Promise.all([
      import("@tsparticles/updater-destroy"),
      import("@tsparticles/updater-roll"),
      import("@tsparticles/updater-tilt"),
      import("@tsparticles/updater-twinkle"),
      import("@tsparticles/updater-wobble"),
      import("@tsparticles/shape-text"),
      import("@tsparticles/interaction-external-trail"),
      import("@tsparticles/plugin-absorbers"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-emitters-shape-circle"),
      import("@tsparticles/plugin-emitters-shape-square"),
      import("@tsparticles/slim"),
    ]);

    await loadSlim(e);

    await Promise.all([
      loadDestroyUpdater(e),
      loadRollUpdater(e),
      loadTiltUpdater(e),
      loadTwinkleUpdater(e),
      loadWobbleUpdater(e),

      loadTextShape(e),

      loadExternalTrailInteraction(e),

      loadAbsorbersPlugin(e),
      loadEmittersPlugin(e),
    ]);

    await Promise.all([
      loadEmittersShapeCircle(e),
      loadEmittersShapeSquare(e),
    ]);
  });
}
