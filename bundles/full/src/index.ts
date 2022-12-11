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
