import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "fountain";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFountainPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadDestroyUpdater },
      { loadEmittersPluginSimple },
      { loadTrailPlugin },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/updater-destroy/lazy"),
      import("@tsparticles/plugin-emitters/plugin/lazy"),
      import("@tsparticles/plugin-trail/lazy"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadDestroyUpdater(e),
      loadEmittersPluginSimple(e),
      loadTrailPlugin(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
