import type { Main } from "tsparticles-core";
import { loadPlugin as loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadPlugin as loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadPlugin as loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";
import { TrailMaker } from "tsparticles-core/Interactions/External/TrailMaker";
import { Lighter as MouseLighter } from "tsparticles-core/Interactions/External/Lighter";
import { Lighter as ParticlesLighter } from "tsparticles-core/Interactions/Particles/Lighter";
import { OrbitUpdater } from "tsparticles-core/Updaters/OrbitUpdater";
import { loadSlim } from "tsparticles-slim";

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export function loadFull(tsParticles: Main) {
    loadSlim(tsParticles);

    tsParticles.addInteractor((container) => new ParticlesLighter(container));
    tsParticles.addInteractor((container) => new MouseLighter(container));
    tsParticles.addInteractor((container) => new TrailMaker(container));
    tsParticles.addParticleUpdater((container) => new OrbitUpdater(container));

    loadAbsorbersPlugin(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadPolygonMaskPlugin(tsParticles);
}
