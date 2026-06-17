import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "fire";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFirePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadInteractivityPlugin }, { loadExternalPushInteraction }, { options }] =
      await Promise.all([
        import("@tsparticles/basic/lazy"),
        import("@tsparticles/plugin-interactivity/lazy"),
        import("@tsparticles/interaction-external-push/lazy"),
        import("./options.js"),
      ]);

    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadExternalPushInteraction(e);
      })(),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
