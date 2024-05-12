import type { Engine } from "@tsparticles/engine";
import { StarDrawer } from "./StarDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStarShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new StarDrawer(), refresh);
}
