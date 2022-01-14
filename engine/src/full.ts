import type { Engine } from "./engine";
import { loadAbsorbersPlugin } from "./Plugins/Absorbers";
import { loadEmittersPlugin } from "./Plugins/Emitters";
import { loadExternalTrailInteraction } from "./Interactions/External/Trail";
import { loadPolygonMaskPlugin } from "./Plugins/PolygonMask";
import { loadRollUpdater } from "./Updaters/Roll";
import { loadSlim } from "./slim";
import { loadTiltUpdater } from "./Updaters/Tilt";
import { loadWobbleUpdater } from "./Updaters/Wobble";

export async function loadFull(engine: Engine): Promise<void> {
    await loadSlim(engine);

    await loadExternalTrailInteraction(engine);

    await loadRollUpdater(engine);
    await loadTiltUpdater(engine);
    await loadWobbleUpdater(engine);

    await loadAbsorbersPlugin(engine);
    await loadEmittersPlugin(engine);
    await loadPolygonMaskPlugin(engine);
}
