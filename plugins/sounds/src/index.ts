import { type Engine } from "@tsparticles/engine";
import { SoundsPlugin } from "./SoundsPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSoundsPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new SoundsPlugin(engine), refresh);
}
