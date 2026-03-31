import type { Engine } from "@tsparticles/engine";

const presetName = "hyperspace";

/**
 * @param engine -
 */
export async function loadHyperspacePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadEmittersPlugin },
      { loadEmittersShapeSquare },
      { loadInteractivityPlugin },
      { loadTrailPlugin },
      { loadLifeUpdater },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-emitters-shape-square"),
      import("@tsparticles/plugin-interactivity"),
      import("@tsparticles/plugin-trail"),
      import("@tsparticles/updater-life"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadEmittersPlugin(e);
      })(),
      loadTrailPlugin(e),
      loadLifeUpdater(e),
    ]);

    await loadEmittersShapeSquare(e);

    e.pluginManager.addPreset(presetName, options);
  });
}
