import type { Engine } from "@tsparticles/engine";

const presetName = "seaAnemone";

/**
 * @param engine -
 */
export async function loadSeaAnemonePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadEmittersPlugin },
      { loadInteractivityPlugin },
      { loadTrailPlugin },
      { loadCurvesPath },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-interactivity"),
      import("@tsparticles/plugin-trail"),
      import("@tsparticles/path-curves"),
      import("./options.js"),
    ]);

    await Promise.all([
      (async (): Promise<void> => {
        await loadBasic(e);

        await loadCurvesPath(e);
      })(),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadEmittersPlugin(e);
      })(),
      loadTrailPlugin(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
