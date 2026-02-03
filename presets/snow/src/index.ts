import type { Engine } from "@tsparticles/engine";

const presetName = "snow";

/**
 * @param engine -
 */
export async function loadSnowPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadWobbleUpdater } = await import("@tsparticles/updater-wobble"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadWobbleUpdater(e);

    e.addPreset(presetName, options);
  });
}
