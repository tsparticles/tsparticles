import type { Engine } from "./engine";
import { loadAbsorbersPlugin } from "./Plugins/Absorbers";
import { loadEmittersPlugin } from "./Plugins/Emitters";
import { loadExternalTrailInteraction } from "./Interactions/External/Trail";
import { loadPolygonMaskPlugin } from "./Plugins/PolygonMask";
import { loadRollUpdater } from "./Updaters/Roll";
import { loadSlim } from "./slim";
import { loadTiltUpdater } from "./Updaters/Tilt";
import { loadTwinkleUpdater } from "./Updaters/Twinkle";
import { loadWobbleUpdater } from "./Updaters/Wobble";

/**
 * Loads the full tsParticles instance, containing all default tsParticles plugins
 * @param engine the engine used to load all plugins
 */
export async function loadFull(engine: Engine): Promise<void> {
    await loadSlim(engine);

    await loadRollUpdater(engine);
    await loadTiltUpdater(engine);
    await loadTwinkleUpdater(engine);
    await loadWobbleUpdater(engine);

    await loadExternalTrailInteraction(engine);

    await loadAbsorbersPlugin(engine);
    await loadEmittersPlugin(engine);
    await loadPolygonMaskPlugin(engine);
}
