import type { Main } from "./main";
import { loadSlim } from "./slim";
import { loadExternalTrailInteraction } from "./Interactions/External/Trail";
import { loadTiltUpdater } from "./Updaters/Tilt";
import { loadWobbleUpdater } from "./Updaters/Wobble";
import { loadAbsorbersPlugin } from "./Plugins/Absorbers/plugin";
import { loadEmittersPlugin } from "./Plugins/Emitters/plugin";
import { loadPolygonMaskPlugin } from "./Plugins/PolygonMask/plugin";
import { loadRollUpdater } from "./Updaters/Roll";

export async function loadFull(tsParticles: Main): Promise<void> {
    await loadSlim(tsParticles);

    await loadExternalTrailInteraction(tsParticles);

    await loadRollUpdater(tsParticles);
    await loadTiltUpdater(tsParticles);
    await loadWobbleUpdater(tsParticles);

    await loadAbsorbersPlugin(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadPolygonMaskPlugin(tsParticles);
}
