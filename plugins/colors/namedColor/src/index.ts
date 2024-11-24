import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { NamedColorManager } from "./NamedColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the named color plugin
 * @param engine - The engine, used to add the plugin
 * @param refresh - Should it refresh the plugin
 * @returns A promise that resolves when the plugin is loaded
 */
export async function loadNamedColorPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addColorManager(new NamedColorManager(), refresh);
}
