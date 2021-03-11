import type { Main } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadInfectionPlugin } from "tsparticles-plugin-infection";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";
import { loadTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadLightInteraction } from "tsparticles-interaction-light";
import { loadOrbitUpdater } from "tsparticles-updater-orbit";

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
