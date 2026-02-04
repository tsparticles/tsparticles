import { type Engine } from "@tsparticles/engine";

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

  await engine.register(async e => {
    const [
      { loadHexColorPlugin },
      { loadHslColorPlugin },
      { loadRgbColorPlugin },
      { loadBaseMover },
      { loadCircleShape },
      { loadColorUpdater },
      { loadOpacityUpdater },
      { loadOutModesUpdater },
      { loadSizeUpdater },
    ] = await Promise.all([
      import("@tsparticles/plugin-hex-color"),
      import("@tsparticles/plugin-hsl-color"),
      import("@tsparticles/plugin-rgb-color"),
      import("@tsparticles/move-base"),
      import("@tsparticles/shape-circle"),
      import("@tsparticles/updater-color"),
      import("@tsparticles/updater-opacity"),
      import("@tsparticles/updater-out-modes"),
      import("@tsparticles/updater-size"),
    ]);

    await Promise.all([
      loadHexColorPlugin(e),
      loadHslColorPlugin(e),
      loadRgbColorPlugin(e),
      loadBaseMover(e),
      loadCircleShape(e),
      loadColorUpdater(e),
      loadOpacityUpdater(e),
      loadOutModesUpdater(e),
      loadSizeUpdater(e),
    ]);
  });
}
