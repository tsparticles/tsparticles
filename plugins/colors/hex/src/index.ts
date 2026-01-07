import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the hex color plugin
 * @param engine - The engine that will use the plugin
 */
export function loadHexColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { HexColorManager } = await import("./HexColorManager.js");

        e.addColorManager(new HexColorManager());
    });
}
