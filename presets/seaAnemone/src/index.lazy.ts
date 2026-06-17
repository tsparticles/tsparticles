import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "seaAnemone";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSeaAnemonePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadEmittersPluginSimple },
      { loadTrailPlugin },
      { loadCurvesPath },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/plugin-emitters/plugin/lazy"),
      import("@tsparticles/plugin-trail/lazy"),
      import("@tsparticles/path-curves/lazy"),
      import("./options.js"),
    ]);

    await Promise.all([
      (async (): Promise<void> => {
        await loadBasic(e);

        await loadCurvesPath(e);
      })(),
      loadEmittersPluginSimple(e),
      loadTrailPlugin(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
