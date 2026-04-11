import type { Engine } from "@tsparticles/engine";

const presetName = "snow";

/**
 * @param engine -
 */
export async function loadSnowPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [{ loadBasic }, { loadWobbleUpdater }, { loadSnowfallPalette }, { options }] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/updater-wobble"),
      import("@tsparticles/palette-snowfall"),
      import("./options.js"),
    ]);

    await Promise.all([loadBasic(e), loadWobbleUpdater(e), loadSnowfallPalette(e)]);

    e.pluginManager.addPreset(presetName, options);
  });
}
