import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles Basic package.
 * This function must be called to make tsParticles Basic work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/basic package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export async function loadBasic(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [
      { loadBlendPlugin },
      { loadHexColorPlugin },
      { loadHslColorPlugin },
      { loadRgbColorPlugin },
      { loadMovePlugin },

      { loadCircleShape },

      { loadOpacityUpdater },
      { loadOutModesUpdater },
      { loadPaintUpdater },
      { loadSizeUpdater },
    ] = await Promise.all([
      import("@tsparticles/plugin-blend/lazy"),
      import("@tsparticles/plugin-hex-color/lazy"),
      import("@tsparticles/plugin-hsl-color/lazy"),
      import("@tsparticles/plugin-rgb-color/lazy"),
      import("@tsparticles/plugin-move/lazy"),

      import("@tsparticles/shape-circle/lazy"),

      import("@tsparticles/updater-opacity/lazy"),
      import("@tsparticles/updater-out-modes/lazy"),
      import("@tsparticles/updater-paint/lazy"),
      import("@tsparticles/updater-size/lazy"),
    ]);

    await Promise.all([
      loadBlendPlugin(e),
      loadHexColorPlugin(e),
      loadHslColorPlugin(e),
      loadRgbColorPlugin(e),
      loadMovePlugin(e),
      loadCircleShape(e),
      loadPaintUpdater(e),
      loadOpacityUpdater(e),
      loadOutModesUpdater(e),
      loadSizeUpdater(e),
    ]);
  });
}
