import type { Engine } from "@tsparticles/engine";

const presetName = "fireworks";

/**
 * @param engine -
 */
export async function loadFireworksPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadEmittersPlugin },
      { loadInteractivityPlugin },
      { loadTrailEffect },
      { loadEmittersShapeSquare },
      { loadHexColorPlugin },
      { loadHslColorPlugin },
      { loadRgbColorPlugin },
      { loadSoundsPlugin },
      { loadLineShape },
      { loadRotateUpdater },
      { loadDestroyUpdater },
      { loadLifeUpdater },
      { loadStrokeColorUpdater },
      { initOptions },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-interactivity"),
      import("@tsparticles/effect-trail"),
      import("@tsparticles/plugin-emitters-shape-square"),
      import("@tsparticles/plugin-hex-color"),
      import("@tsparticles/plugin-hsl-color"),
      import("@tsparticles/plugin-rgb-color"),
      import("@tsparticles/plugin-sounds"),
      import("@tsparticles/shape-line"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/updater-destroy"),
      import("@tsparticles/updater-life"),
      import("@tsparticles/updater-stroke-color"),
      import("./options.js"),
    ]);

    await loadBasic(e);
    await loadInteractivityPlugin(e);

    await Promise.all([
      loadHexColorPlugin(e),
      loadHslColorPlugin(e),
      loadRgbColorPlugin(e),
      loadEmittersPlugin(e),
      loadTrailEffect(e),
      loadSoundsPlugin(e),
      loadLineShape(e),
      loadRotateUpdater(e),
      loadDestroyUpdater(e),
      loadLifeUpdater(e),
      loadStrokeColorUpdater(e),
    ]);

    await loadEmittersShapeSquare(e);

    e.pluginManager.addPreset(presetName, initOptions(), false);
  });
}
