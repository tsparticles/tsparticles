import type { Engine } from "@tsparticles/engine";

const presetName = "squares";

/**
 * @param engine - the engine instance to load the preset into
 */
export async function loadSquaresPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadHexColorPlugin },
      { loadEmittersPluginSimple },
      { loadSquareShape },
      { loadRotateUpdater },
      { loadSizeUpdater },
      { loadPaintUpdater },
      { options },
    ] = await Promise.all([
      import("@tsparticles/plugin-hex-color"),
      import("@tsparticles/plugin-emitters/plugin"),
      import("@tsparticles/shape-square"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/updater-size"),
      import("@tsparticles/updater-paint"),
      import("./options.js"),
    ]);

    await Promise.all([
      loadHexColorPlugin(e),
      loadEmittersPluginSimple(e),
      loadSquareShape(e),
      loadRotateUpdater(e),
      loadSizeUpdater(e),
      loadPaintUpdater(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
