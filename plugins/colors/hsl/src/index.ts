import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the HSL color plugin
 * @param engine - The engine that will use the plugin
 */
export function loadHslColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { HslColorManager } = await import("./HslColorManager.js");

        e.addColorManager(new HslColorManager());
    });
}
