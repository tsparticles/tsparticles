import type { Main } from "./main";
import { loadSlim } from "./slim";
import { loadExternalTrailInteraction } from "./Interactions/External/Trail";
import { loadTiltUpdater } from "./Updaters/Tilt";
import { loadWobbleUpdater } from "./Updaters/Wobble";
import { loadAbsorbersPlugin } from "./Plugins/Absorbers/plugin";
import { loadEmittersPlugin } from "./Plugins/Emitters/plugin";
import { loadPolygonMaskPlugin } from "./Plugins/PolygonMask/plugin";
import { loadRollUpdater } from "./Updaters/Roll";

export function loadFull(tsParticles: Main): void {
    loadSlim(tsParticles);

    loadExternalTrailInteraction(tsParticles);

    loadRollUpdater(tsParticles);
    loadTiltUpdater(tsParticles);
    loadWobbleUpdater(tsParticles);

    loadAbsorbersPlugin(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadPolygonMaskPlugin(tsParticles);
}
