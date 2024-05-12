import { type Engine } from "@tsparticles/engine";
import { PoissonDiscPlugin } from "./PoissonDiscPlugin.js";

/**
 * @param engine - The engine to add the plugin to
 * @param refresh -
 */
export async function loadPoissonDiscPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new PoissonDiscPlugin(engine), refresh);
}
