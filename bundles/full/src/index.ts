import type { Engine } from "tsparticles-engine";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadDestroyUpdater } from "tsparticles-updater-destroy";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadSlim } from "tsparticles-slim";
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadTwinkleUpdater } from "tsparticles-updater-twinkle";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";

/**
 * Loads the full bundle with all plugins needed for running the tsParticles package.
 * This function must be called to make tsParticles work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the tsparticles package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export async function loadFull(engine: Engine): Promise<void> {
    await loadSlim(engine);

    await loadDestroyUpdater(engine);
    await loadRollUpdater(engine);
    await loadTiltUpdater(engine);
    await loadTwinkleUpdater(engine);
    await loadWobbleUpdater(engine);

    await loadExternalTrailInteraction(engine);

    await loadAbsorbersPlugin(engine);
    await loadEmittersPlugin(engine);
}
