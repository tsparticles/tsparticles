import { type Engine } from "@tsparticles/engine";

const presetName = "ambient";

/**
 * @param engine -
 */
export async function loadAmbientPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadStrokeColorUpdater }, { options }] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/updater-stroke-color"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadStrokeColorUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
