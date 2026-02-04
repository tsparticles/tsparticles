import { type Engine } from "@tsparticles/engine";

const presetName = "firefly";

/**
 * @param engine -
 */
export async function loadFireflyPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
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

    await loadBasic(e);
    await loadInteractivityPlugin(e);

    await Promise.all([loadLifeUpdater(e), loadExternalTrailInteraction(e)]);

    e.addPreset(presetName, options);
  });
}
