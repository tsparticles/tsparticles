import { type Engine } from "@tsparticles/engine";

const presetName = "firefly";

/**
 * @param engine -
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
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-interactivity"),
      import("@tsparticles/updater-life"),
      import("@tsparticles/interaction-external-trail"),
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
