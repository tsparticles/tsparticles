import type { Engine } from "@tsparticles/engine";

const presetName = "bubbles";

/**
 * @param engine -
 */
export async function loadBubblesPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadEmittersPluginSimple }, { options }] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters/plugin"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadEmittersPluginSimple(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
