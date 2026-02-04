import type { Engine } from "@tsparticles/engine";

const presetName = "seaAnemone";

/**
 * @param engine -
 */
export async function loadSeaAnemonePreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
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

    await loadBasic(e);
    await loadInteractivityPlugin(e);

    await Promise.all([loadEmittersPlugin(e), loadTrailPlugin(e), loadCurvesPath(e)]);

    e.addPreset(presetName, options);
  });
}
