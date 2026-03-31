import type { Engine } from "@tsparticles/engine";

const presetName = "fire";

/**
 * @param engine -
 */
export async function loadFirePreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadInteractivityPlugin }, { loadExternalPushInteraction }, { options }] =
      await Promise.all([
        import("@tsparticles/basic"),
        import("@tsparticles/plugin-interactivity"),
        import("@tsparticles/interaction-external-push"),
        import("./options.js"),
      ]);

    await loadBasic(e);
    await loadInteractivityPlugin(e);
    await loadExternalPushInteraction(e);

    e.pluginManager.addPreset(presetName, options);
  });
}
