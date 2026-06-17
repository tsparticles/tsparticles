import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "bubbles";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadBubblesPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadEmittersPluginSimple }, { options }] = await Promise.all([
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/plugin-emitters/plugin/lazy"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadEmittersPluginSimple(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
