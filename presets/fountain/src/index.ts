import type { Engine } from "@tsparticles/engine";

const presetName = "fountain";

/**
 * @param engine -
 */
export async function loadFountainPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadDestroyUpdater },
      { loadEmittersPlugin },
      { loadInteractivityPlugin },
      { loadTrailPlugin },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/updater-destroy"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-interactivity"),
      import("@tsparticles/plugin-trail"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadDestroyUpdater(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadEmittersPlugin(e);
      })(),
      loadTrailPlugin(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
