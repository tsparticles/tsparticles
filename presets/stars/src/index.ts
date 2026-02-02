import type { Engine } from "@tsparticles/engine";

const presetName = "stars";

/**
 * @param engine -
 */
export async function loadStarsPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { options } = await import("./options.js");

    await loadBasic(e);

    e.addPreset(presetName, options);
  });
}
