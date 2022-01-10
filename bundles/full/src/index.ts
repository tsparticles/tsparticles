import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";
import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";

export async function loadFull(engine: Engine): Promise<void> {
    await loadSlim(engine);

    await loadTiltUpdater(engine);
    await loadRollUpdater(engine);
    await loadWobbleUpdater(engine);

    await loadExternalTrailInteraction(engine);

    await loadAbsorbersPlugin(engine);
    await loadEmittersPlugin(engine);
    await loadPolygonMaskPlugin(engine);
}
