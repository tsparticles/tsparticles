import { type Engine } from "@tsparticles/engine";
import { OklabColorManager } from "./OklabColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the Oklab color plugin
 * @param engine - The engine, used to add the color manager
 * @param refresh - Whether the plugin is being refreshed
 * @returns A promise that resolves when the plugin is loaded
 */
export async function loadOklabColorPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addColorManager(new OklabColorManager(), refresh);
}
