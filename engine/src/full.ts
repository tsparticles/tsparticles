import type { Main } from "./main";

export async function loadFull(tsParticles: Main): Promise<void> {
    const { loadSlim } = await import(
        /* webpackChunkName: "tsparticles.bundle.slim" */
        /* webpackMode: "lazy" */
        "./slim"
    );

    await loadSlim(tsParticles);

    const { loadExternalTrailInteraction } = await import(
        /* webpackChunkName: "tsparticles.interaction.external.trail" */
        /* webpackMode: "lazy" */
        "./Interactions/External/Trail"
    );

    loadExternalTrailInteraction(tsParticles);

    const { loadRollUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.roll" */
        /* webpackMode: "lazy" */
        "./Updaters/Roll"
    );
    const { loadTiltUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.tilt" */
        /* webpackMode: "lazy" */
        "./Updaters/Tilt"
    );
    const { loadWobbleUpdater } = await import(
        /* webpackChunkName: "tsparticles.updater.wobble" */
        /* webpackMode: "lazy" */
        "./Updaters/Wobble"
    );

    loadRollUpdater(tsParticles);
    loadTiltUpdater(tsParticles);
    loadWobbleUpdater(tsParticles);

    const { loadAbsorbersPlugin } = await import(
        /* webpackChunkName: "tsparticles.plugin.absorbers" */
        /* webpackMode: "lazy" */
        "./Plugins/Absorbers/plugin"
    );
    const { loadEmittersPlugin } = await import(
        /* webpackChunkName: "tsparticles.plugin.emitters" */
        /* webpackMode: "lazy" */
        "./Plugins/Emitters/plugin"
    );
    const { loadPolygonMaskPlugin } = await import(
        /* webpackChunkName: "tsparticles.plugin.polygon.mask" */
        /* webpackMode: "lazy" */
        "./Plugins/PolygonMask/plugin"
    );

    loadAbsorbersPlugin(tsParticles);
    loadEmittersPlugin(tsParticles);
    loadPolygonMaskPlugin(tsParticles);
}
