import { type Engine } from "@tsparticles/engine";

const presetNames = ["bigCircles", "big-circles"];

/**
 * @param engine -
 */
export async function loadBigCirclesPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { options }] = await Promise.all([import("@tsparticles/basic"), import("./options.js")]);

    await loadBasic(e);

    presetNames.forEach(name => {
      e.pluginManager.addPreset(name, options);
    });
  });
}
