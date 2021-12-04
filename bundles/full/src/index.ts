import type { Main } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";

export async function loadFull(tsParticles: Main): Promise<void> {
    await loadSlim(tsParticles);

    await loadTiltUpdater(tsParticles);
    await loadRollUpdater(tsParticles);
    await loadWobbleUpdater(tsParticles);

    await loadExternalTrailInteraction(tsParticles);

    await loadAbsorbersPlugin(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadPolygonMaskPlugin(tsParticles);
}
