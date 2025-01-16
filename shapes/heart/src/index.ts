import { type Engine } from "@tsparticles/engine";
import { HeartDrawer } from "./HeartDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadHeartShape(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addShape(new HeartDrawer(), refresh);
}
