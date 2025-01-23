import { type Engine } from "@tsparticles/engine";
import { HslColorManager } from "./HslColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the HSL color plugin
 * @param engine - The engine that will use the plugin
 * @param refresh - If the engine should be refreshed after the plugin is loaded
 * @returns A promise that resolves when the plugin is loaded
 */
export async function loadHslColorPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addColorManager(new HslColorManager(), refresh);
}
