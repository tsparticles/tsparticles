import type { Engine } from "@tsparticles/engine";

const presetName = "squares";

/**
 * @param engine - the engine instance to load the preset into
 */
export async function loadSquaresPreset(engine: Engine): Promise<void> {
  await engine.register(async e => {
    const { loadHexColorPlugin } = await import("@tsparticles/plugin-hex-color"),
      { loadEmittersPlugin } = await import("@tsparticles/plugin-emitters"),
      { loadSquareShape } = await import("@tsparticles/shape-square"),
      { loadRotateUpdater } = await import("@tsparticles/updater-rotate"),
      { loadSizeUpdater } = await import("@tsparticles/updater-size"),
      { loadStrokeColorUpdater } = await import("@tsparticles/updater-stroke-color"),
      { options } = await import("./options.js");

    await loadHexColorPlugin(e);
    await loadEmittersPlugin(e);
    await loadSquareShape(e);
    await loadRotateUpdater(e);
    await loadSizeUpdater(e);
    await loadStrokeColorUpdater(e);

    e.addPreset(presetName, options);
  });
}
