import type { Engine } from "@tsparticles/engine";

const presetName = "hyperspace";

/**
 * @param engine -
 */
export async function loadHyperspacePreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
      { loadEmittersShapeSquare } = await import("@tsparticles/plugin-emitters-shape-square"),
      { loadTrailPlugin } = await import("@tsparticles/plugin-trail"),
      { loadLifeUpdater } = await import("@tsparticles/updater-life"),
      { options } = await import("./options.js");

    await loadBasic(e);
    await loadEmittersPlugin(e);
    await loadEmittersShapeSquare(e);
    await loadTrailPlugin(e);
    await loadLifeUpdater(e);

    e.addPreset(presetName, options);
  });
}
