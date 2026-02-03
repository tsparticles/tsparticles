import type { Engine } from "@tsparticles/engine";

const presetName = "fountain";

/**
 * @param engine -
 */
export async function loadFountainPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadDestroyUpdater } = await import("@tsparticles/updater-destroy"),
      { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
      { loadTrailPlugin } = await import("@tsparticles/plugin-trail"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadDestroyUpdater(e);
    await loadEmittersPlugin(e);
    await loadTrailPlugin(e);

    e.addPreset(presetName, options);
  });
}
