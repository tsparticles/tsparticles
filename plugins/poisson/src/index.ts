import { type Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine to add the plugin to
 * @param refresh -
 */
export async function loadPoissonDiscPlugin(engine: Engine, refresh = true): Promise<void> {
    const { PoissonDiscPlugin } = await import("./PoissonDiscPlugin.js");

    await engine.addPlugin(new PoissonDiscPlugin(engine), refresh);
}
