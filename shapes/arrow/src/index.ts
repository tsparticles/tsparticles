import { ArrowDrawer } from "./ArrowDrawer.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadArrowShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new ArrowDrawer(), refresh);
}
