import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the HWB color plugin
 * @param engine - The engine that will use the plugin
 */
export function loadHwbColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { HwbColorManager } = await import("./HwbColorManager.js");

        e.addColorManager(new HwbColorManager());
    });
}
