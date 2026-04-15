import type { Engine } from "@tsparticles/engine";

const presetName = "hyperspace";

/**
 * @param engine -
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
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters/plugin"),
      import("@tsparticles/plugin-emitters-shape-square"),
      import("@tsparticles/plugin-trail"),
      import("@tsparticles/updater-life"),
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
