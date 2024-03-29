import type { Engine } from "@tsparticles/engine";
import { HeartDrawer } from "./HeartDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadHeartShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new HeartDrawer(), refresh);
}
