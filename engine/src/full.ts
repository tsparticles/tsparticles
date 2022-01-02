import type { Main } from "./main";
import { loadSlim } from "./slim";
import { loadExternalTrailInteraction } from "./Interactions/External/Trail";
import { loadTiltUpdater } from "./Updaters/Tilt";
import { loadWobbleUpdater } from "./Updaters/Wobble";
import { loadRollUpdater } from "./Updaters/Roll";

export async function loadFull(tsParticles: Main): Promise<void> {
    await loadSlim(tsParticles);

    await loadExternalTrailInteraction(tsParticles);

    await loadRollUpdater(tsParticles);
    await loadTiltUpdater(tsParticles);
    await loadWobbleUpdater(tsParticles);

    const { loadAbsorbersPlugin } = await import(
        /* webpackChunkName: "tsparticles.plugin.absorbers.min" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        "./Plugins/Absorbers/plugin"
    );

    const { loadEmittersPlugin } = await import(
        /* webpackChunkName: "tsparticles.plugin.emitters.min" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        "./Plugins/Emitters/plugin"
    );

    const { loadPolygonMaskPlugin } = await import(
        /* webpackChunkName: "tsparticles.plugin.polygonMask.min" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        "./Plugins/PolygonMask/plugin"
    );

    await loadAbsorbersPlugin(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadPolygonMaskPlugin(tsParticles);
}
