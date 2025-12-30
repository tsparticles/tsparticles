import { type Engine } from "@tsparticles/engine";
import { TrailPlugin } from "./TrailPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadTrailPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new TrailPlugin(engine), refresh);
}
