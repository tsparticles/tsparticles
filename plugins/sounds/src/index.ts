import { type Engine } from "@tsparticles/engine";
import { SoundsPlugin } from "./SoundsPlugin.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSoundsPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new SoundsPlugin(engine), refresh);
}
