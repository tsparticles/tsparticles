import type { Engine } from "@tsparticles/engine";

const presetName = "snow";

/**
 * @param engine -
 */
export async function loadSnowPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const [{ loadBasic }, { loadWobbleUpdater }, { options }] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/updater-wobble"),
      import("./options.js"),
    ]);

    await loadBasic(e);
    await loadWobbleUpdater(e);

    e.addPreset(presetName, options);
  });
}
