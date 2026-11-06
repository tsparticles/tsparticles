import type { Engine } from "@tsparticles/engine";
import { loadAbsorbersPlugin } from "@tsparticles/plugin-absorbers";
import { loadDestroyUpdater } from "@tsparticles/updater-destroy";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeCircle } from "@tsparticles/plugin-emitters-shape-circle";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadExternalDragInteraction } from "@tsparticles/interaction-external-drag";
import { loadExternalTrailInteraction } from "@tsparticles/interaction-external-trail";
import { loadRollUpdater } from "@tsparticles/updater-roll";
import { loadSlim } from "@tsparticles/slim";
import { loadTextShape } from "@tsparticles/shape-text";
import { loadTiltUpdater } from "@tsparticles/updater-tilt";
import { loadTwinkleUpdater } from "@tsparticles/updater-twinkle";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";

declare const __VERSION__: string;

/**
 * Loads the full bundle with all plugins needed for running the tsParticles package.
 * This function must be called to make tsParticles work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the tsparticles package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export async function loadFull(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const loadEmittersPluginBundle = async (e: Engine): Promise<void> => {
        await loadEmittersPlugin(e);

        await Promise.all([
          loadEmittersShapeCircle(e),
          loadEmittersShapeSquare(e),
        ]);
      },
      loadInteractivityForFull = async (e: Engine): Promise<void> => {
        await loadSlim(e);

        await Promise.all([
          loadExternalDragInteraction(e),
          loadExternalTrailInteraction(e),

          loadAbsorbersPlugin(e),
          loadEmittersPluginBundle(e),
        ]);
      };

    await Promise.all([
      loadInteractivityForFull(e),

      loadDestroyUpdater(e),
      loadRollUpdater(e),
      loadTiltUpdater(e),
      loadTwinkleUpdater(e),
      loadWobbleUpdater(e),

      loadTextShape(e),
    ]);
  });
}
