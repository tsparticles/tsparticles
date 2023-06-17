import { CircleDrawer } from "./CircleDrawer";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCircleShape(engine: Engine, refresh = false): Promise<void> {
    await engine.addShape("circle", new CircleDrawer(), refresh);
}
