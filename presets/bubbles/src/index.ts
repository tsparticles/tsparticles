import type { Engine } from "@tsparticles/engine";

const presetName = "bubbles";

/**
 * @param engine -
 */
export async function loadBubblesPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadEmittersPlugin(e);

    e.addPreset(presetName, options);
  });
}
