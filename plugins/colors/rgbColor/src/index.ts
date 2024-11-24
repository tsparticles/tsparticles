import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { RgbColorManager } from "./RgbColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the RGB color plugin
 * @param engine - The engine that will use the plugin
 * @param refresh - If the engine should be refreshed after the plugin is loaded
 * @returns A promise that resolves when the plugin is loaded
 */
export async function loadRgbColorPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addColorManager(new RgbColorManager(), refresh);
}
