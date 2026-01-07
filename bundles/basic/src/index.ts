import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles Basic package.
 * This function must be called to make tsParticles Basic work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/basic package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export function loadBasic(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { loadHexColorPlugin } = await import("@tsparticles/plugin-hex-color"),
            { loadHslColorPlugin } = await import("@tsparticles/plugin-hsl-color"),
            { loadRgbColorPlugin } = await import("@tsparticles/plugin-rgb-color"),
            { loadBaseMover } = await import("@tsparticles/move-base"),
            { loadCircleShape } = await import("@tsparticles/shape-circle"),
            { loadColorUpdater } = await import("@tsparticles/updater-color"),
            { loadOpacityUpdater } = await import("@tsparticles/updater-opacity"),
            { loadOutModesUpdater } = await import("@tsparticles/updater-out-modes"),
            { loadSizeUpdater } = await import("@tsparticles/updater-size");

        loadHexColorPlugin(e);
        loadHslColorPlugin(e);
        loadRgbColorPlugin(e);

        loadBaseMover(e);

        loadCircleShape(e);

        loadColorUpdater(e);
        loadOpacityUpdater(e);
        loadOutModesUpdater(e);
        loadSizeUpdater(e);
    });
}
