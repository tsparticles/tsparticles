import { type Engine } from "@tsparticles/engine";
import { loadBlendPlugin } from "@tsparticles/plugin-blend";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadHslColorPlugin } from "@tsparticles/plugin-hsl-color";
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { loadOpacityUpdater } from "@tsparticles/updater-opacity";
import { loadOutModesUpdater } from "@tsparticles/updater-out-modes";
import { loadPaintUpdater } from "@tsparticles/updater-paint";
import { loadRgbColorPlugin } from "@tsparticles/plugin-rgb-color";
import { loadSizeUpdater } from "@tsparticles/updater-size";

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
