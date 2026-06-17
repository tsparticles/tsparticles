import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "fireworks";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFireworksPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
        { loadBasic },
        { loadEmittersPluginSimple },
        { loadTrailEffect },
        { loadEmittersShapeSquare },
        { loadSoundsPlugin },
        { loadLineShape },
        { loadRotateUpdater },
        { loadDestroyUpdater },
        { loadLifeUpdater },
        { initOptions },
      ] = await Promise.all([
        import("@tsparticles/basic/lazy"),
        import("@tsparticles/plugin-emitters/plugin/lazy"),
        import("@tsparticles/effect-trail/lazy"),
        import("@tsparticles/plugin-emitters-shape-square/lazy"),
        import("@tsparticles/plugin-sounds/lazy"),
        import("@tsparticles/shape-line/lazy"),
        import("@tsparticles/updater-rotate/lazy"),
        import("@tsparticles/updater-destroy/lazy"),
        import("@tsparticles/updater-life/lazy"),
        import("./options.js"),
      ]),
      loadEmittersForFireworks = async (e: Engine): Promise<void> => {
        await loadEmittersPluginSimple(e);

        await loadEmittersShapeSquare(e);
      };

    await Promise.all([
      loadBasic(e),
      loadEmittersForFireworks(e),
      loadTrailEffect(e),
      loadSoundsPlugin(e),
      loadLineShape(e),
      loadRotateUpdater(e),
      loadDestroyUpdater(e),
      loadLifeUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, initOptions(), false);
  });
}
