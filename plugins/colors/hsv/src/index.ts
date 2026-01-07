import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the HSV color plugin
 * @param engine - The engine that will use the plugin
 */
export function loadHsvColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { HsvColorManager } = await import("./HsvColorManager.js");

        e.addColorManager(new HsvColorManager());
    });
}
