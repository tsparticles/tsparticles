import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "hyperspace";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadHyperspacePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadEmittersPluginSimple },
      { loadEmittersShapeSquare },
      { loadTrailPlugin },
      { loadLifeUpdater },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/plugin-emitters/plugin/lazy"),
      import("@tsparticles/plugin-emitters-shape-square/lazy"),
      import("@tsparticles/plugin-trail/lazy"),
      import("@tsparticles/updater-life/lazy"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadEmittersPluginSimple(e);

        await loadEmittersShapeSquare(e);
      })(),
      loadTrailPlugin(e),
      loadLifeUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
