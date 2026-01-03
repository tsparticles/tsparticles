import { type Engine } from "@tsparticles/engine";
import { HwbColorManager } from "./HwbColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the HWB color plugin
 * @param engine - The engine that will use the plugin
 * @param refresh - If the engine should be refreshed after the plugin is loaded
 * @returns A promise that resolves when the plugin is loaded
 */
export async function loadHwbColorPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addColorManager(new HwbColorManager(), refresh);
}
