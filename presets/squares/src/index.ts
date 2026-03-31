import type { Engine } from "@tsparticles/engine";

const presetName = "squares";

/**
 * @param engine - the engine instance to load the preset into
 */
export async function loadSquaresPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadHexColorPlugin },
      { loadEmittersPlugin },
      { loadInteractivityPlugin },
      { loadSquareShape },
      { loadRotateUpdater },
      { loadSizeUpdater },
      { loadStrokeColorUpdater },
      { options },
    ] = await Promise.all([
      import("@tsparticles/plugin-hex-color"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-interactivity"),
      import("@tsparticles/shape-square"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/updater-size"),
      import("@tsparticles/updater-stroke-color"),
      import("./options.js"),
    ]);

    await loadInteractivityPlugin(e);

    await Promise.all([
      loadHexColorPlugin(e),
      loadEmittersPlugin(e),
      loadSquareShape(e),
      loadRotateUpdater(e),
      loadSizeUpdater(e),
      loadStrokeColorUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
