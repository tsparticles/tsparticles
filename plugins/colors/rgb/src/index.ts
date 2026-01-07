import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the RGB color plugin
 * @param engine - The engine that will use the plugin
 */
export function loadRgbColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { RgbColorManager } = await import("./RgbColorManager.js");

        e.addColorManager(new RgbColorManager());
    });
}
