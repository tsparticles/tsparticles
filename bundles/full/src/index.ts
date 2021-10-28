import type { Main } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";

export function loadFull(tsParticles: Main): void {
    loadSlim(tsParticles);

    loadTiltUpdater(tsParticles);
    loadRollUpdater(tsParticles);
    loadWobbleUpdater(tsParticles);

    loadExternalTrailInteraction(tsParticles);

    loadAbsorbersPlugin(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadPolygonMaskPlugin(tsParticles);
}
