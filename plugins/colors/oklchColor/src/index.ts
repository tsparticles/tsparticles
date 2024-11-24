import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { LchColorManager } from "./LchColorManager.js";
import { OklchColorManager } from "./OklchColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the Oklch color plugin
 * @param engine - The engine, used to add the color manager
 * @param refresh - Whether the plugin is being refreshed
 * @returns A promise that resolves when the plugin is loaded
 */
export async function loadOklchColorPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addColorManager(new OklchColorManager(), refresh);
    await engine.addColorManager(new LchColorManager(), refresh);
}
