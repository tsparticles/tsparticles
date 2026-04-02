import type { Engine } from "@tsparticles/engine";

const presetName = "fireworks";

/**
 * @param engine -
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
      { loadStrokeColorUpdater },
      { initOptions },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters/plugin"),
      import("@tsparticles/effect-trail"),
      import("@tsparticles/plugin-emitters-shape-square"),
      import("@tsparticles/plugin-sounds"),
      import("@tsparticles/shape-line"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/updater-destroy"),
      import("@tsparticles/updater-life"),
      import("@tsparticles/updater-stroke-color"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadEmittersPluginSimple(e);

        await loadEmittersShapeSquare(e);
      })(),
      loadTrailEffect(e),
      loadSoundsPlugin(e),
      loadLineShape(e),
      loadRotateUpdater(e),
      loadDestroyUpdater(e),
      loadLifeUpdater(e),
      loadStrokeColorUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, initOptions(), false);
  });
}
