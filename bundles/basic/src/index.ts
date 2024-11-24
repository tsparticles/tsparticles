import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { loadBaseMover } from "@tsparticles/move-base";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadColorUpdater } from "@tsparticles/updater-color";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadHslColorPlugin } from "@tsparticles/plugin-hsl-color";
import { loadOpacityUpdater } from "@tsparticles/updater-opacity";
import { loadOutModesUpdater } from "@tsparticles/updater-out-modes";
import { loadRgbColorPlugin } from "@tsparticles/plugin-rgb-color";
import { loadSizeUpdater } from "@tsparticles/updater-size";

declare const __VERSION__: string;

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
    assertValidVersion(engine, __VERSION__);

    await loadHexColorPlugin(engine, false);
    await loadHslColorPlugin(engine, false);
    await loadRgbColorPlugin(engine, false);

    await loadBaseMover(engine, false);

    await loadCircleShape(engine, false);

    await loadColorUpdater(engine, false);
    await loadOpacityUpdater(engine, false);
    await loadOutModesUpdater(engine, false);
    await loadSizeUpdater(engine, false);

    await engine.refresh(refresh);
}
