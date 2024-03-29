import { CircleDrawer } from "./CircleDrawer.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCircleShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new CircleDrawer(), refresh);
}
