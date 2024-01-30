import { type Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSoundsPlugin(engine: Engine, refresh = true): Promise<void> {
    const { SoundsPlugin } = await import("./SoundsPlugin.js");

    await engine.addPlugin(new SoundsPlugin(engine), refresh);
}
