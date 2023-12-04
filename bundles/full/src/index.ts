import type { Engine } from "@tsparticles/engine";
import { loadAbsorbersPlugin } from "@tsparticles/plugin-absorbers";
import { loadDestroyUpdater } from "@tsparticles/updater-destroy";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeCircle } from "@tsparticles/plugin-emitters-shape-circle";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadExternalTrailInteraction } from "@tsparticles/interaction-external-trail";
import { loadRollUpdater } from "@tsparticles/updater-roll";
import { loadSlim } from "@tsparticles/slim";
import { loadTextShape } from "@tsparticles/shape-text";
import { loadTiltUpdater } from "@tsparticles/updater-tilt";
import { loadTwinkleUpdater } from "@tsparticles/updater-twinkle";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";

/**
 * Loads the full bundle with all plugins needed for running the tsParticles package.
 * This function must be called to make tsParticles work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the tsparticles package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 * @param refresh -
 */
export async function loadFull(engine: Engine, refresh = true): Promise<void> {
    await loadDestroyUpdater(engine, false);
    await loadRollUpdater(engine, false);
    await loadTiltUpdater(engine, false);
    await loadTwinkleUpdater(engine, false);
    await loadWobbleUpdater(engine, false);

    await loadTextShape(engine, false);

    await loadExternalTrailInteraction(engine, false);

    await loadAbsorbersPlugin(engine, false);
    await loadEmittersPlugin(engine, false);

    await loadEmittersShapeCircle(engine, false);
    await loadEmittersShapeSquare(engine, false);

    await loadSlim(engine, refresh);
}
