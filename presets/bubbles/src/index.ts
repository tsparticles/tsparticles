import type { Engine } from "@tsparticles/engine";

const presetName = "bubbles";

/**
 * @param engine -
 */
export async function loadBubblesPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadEmittersPlugin }, { loadInteractivityPlugin }, { options }] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-interactivity"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);

        await loadEmittersPlugin(e);
      })(),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
