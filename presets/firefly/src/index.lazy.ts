import { type Engine } from "@tsparticles/engine/lazy";

const presetName = "firefly";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFireflyPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadInteractivityPlugin },
      { loadLifeUpdater },
      { loadExternalTrailInteraction },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/plugin-interactivity/lazy"),
      import("@tsparticles/updater-life/lazy"),
      import("@tsparticles/interaction-external-trail/lazy"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadLifeUpdater(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadExternalTrailInteraction(e);
      })(),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
