import type { Engine } from "@tsparticles/engine";

const presetName = "stars";

/**
 * @param engine -
 */
export async function loadStarsPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { options }] = await Promise.all([import("@tsparticles/basic"), import("./options.js")]);

    await loadBasic(e);

    e.pluginManager.addPreset(presetName, options);
  });
}
