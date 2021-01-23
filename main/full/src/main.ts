import type { Main } from "tsparticles-core";
import { loadPlugin as loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadPlugin as loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadPlugin as loadInfectionPlugin } from "tsparticles-plugin-infection";
import { loadPlugin as loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";
import { loadInteraction as loadTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadInteraction as loadLightInteraction } from "tsparticles-interaction-light";
import { loadSlim } from "tsparticles-slim";
import { loadUpdater as loadOrbitUpdater } from "tsparticles-updater-orbit";

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export function loadFull(tsParticles: Main): void {
    loadSlim(tsParticles);

    loadTrailInteraction(tsParticles);
    loadLightInteraction(tsParticles);

    loadOrbitUpdater(tsParticles);

    loadAbsorbersPlugin(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadInfectionPlugin(tsParticles);
    loadPolygonMaskPlugin(tsParticles);
}
