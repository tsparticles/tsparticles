import { type Engine } from "@tsparticles/engine";
import { HsvColorManager } from "./HsvColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the HSV color plugin
 * @param engine - The engine that will use the plugin
 * @param refresh - If the plugin should refresh the current colors
 * @returns A promise that resolves when the plugin is loaded
 */
export async function loadHsvColorPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addColorManager(new HsvColorManager(), refresh);
}
