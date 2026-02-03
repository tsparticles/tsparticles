import type { Engine } from "@tsparticles/engine";

const presetName = "fireworks";

/**
 * @param engine -
 */
export async function loadFireworksPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadBasic } = await import("@tsparticles/basic"),
      { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
      { loadTrailEffect } = await import("@tsparticles/effect-trail"),
      { loadEmittersShapeSquare } = await import("@tsparticles/plugin-emitters-shape-square"),
      { loadHexColorPlugin } = await import("@tsparticles/plugin-hex-color"),
      { loadHslColorPlugin } = await import("@tsparticles/plugin-hsl-color"),
      { loadRgbColorPlugin } = await import("@tsparticles/plugin-rgb-color"),
      { loadSoundsPlugin } = await import("@tsparticles/plugin-sounds"),
      { loadLineShape } = await import("@tsparticles/shape-line"),
      { loadRotateUpdater } = await import("@tsparticles/updater-rotate"),
      { loadDestroyUpdater } = await import("@tsparticles/updater-destroy"),
      { loadLifeUpdater } = await import("@tsparticles/updater-life"),
      { loadStrokeColorUpdater } = await import("@tsparticles/updater-stroke-color"),
      { initOptions } = await import("./options.js");

    await loadBasic(e);
    await loadHexColorPlugin(e);
    await loadHslColorPlugin(e);
    await loadRgbColorPlugin(e);
    await loadEmittersPlugin(e);
    await loadTrailEffect(e);
    await loadEmittersShapeSquare(e);
    await loadSoundsPlugin(e);
    await loadLineShape(e);
    await loadRotateUpdater(e);
    await loadDestroyUpdater(e);
    await loadLifeUpdater(e);
    await loadStrokeColorUpdater(e);

    e.addPreset(presetName, initOptions(), false);
  });
}
