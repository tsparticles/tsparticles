import { type Engine } from "@tsparticles/engine/lazy";

const presetName = "ambient";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadAmbientPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { options }] = await Promise.all([
      import("@tsparticles/basic/lazy"),
      import("./options.js"),
    ]);

    await loadBasic(e);

    e.pluginManager.addPreset(presetName, options);
  });
}
