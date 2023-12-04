import type { Engine } from "@tsparticles/engine";
import { loadBaseMover } from "@tsparticles/move-base";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadColorUpdater } from "@tsparticles/updater-color";
import { loadOpacityUpdater } from "@tsparticles/updater-opacity";
import { loadOutModesUpdater } from "@tsparticles/updater-out-modes";
import { loadSizeUpdater } from "@tsparticles/updater-size";

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
    await loadBaseMover(engine, false);

    await loadCircleShape(engine, false);

    await loadColorUpdater(engine, false);
    await loadOpacityUpdater(engine, false);
    await loadOutModesUpdater(engine, false);
    await loadSizeUpdater(engine, false);

    await engine.refresh(refresh);
}
