import type { Engine } from "@tsparticles/engine";

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles Basic package.
 * This function must be called to make tsParticles Basic work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/basic package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 * @param refresh -
 */
export async function loadBasic(engine: Engine, refresh = true): Promise<void> {
    const { loadBaseMover } = await import("@tsparticles/move-base"),
        { loadCircleShape } = await import("@tsparticles/shape-circle"),
        { loadColorUpdater } = await import("@tsparticles/updater-color"),
        { loadOpacityUpdater } = await import("@tsparticles/updater-opacity"),
        { loadOutModesUpdater } = await import("@tsparticles/updater-out-modes"),
        { loadSizeUpdater } = await import("@tsparticles/updater-size");

    await loadBaseMover(engine, false);

    await loadCircleShape(engine, false);

    await loadColorUpdater(engine, false);
    await loadOpacityUpdater(engine, false);
    await loadOutModesUpdater(engine, false);
    await loadSizeUpdater(engine, false);

    await engine.refresh(refresh);
}
