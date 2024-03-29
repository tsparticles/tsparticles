import type { Engine } from "@tsparticles/engine";
import { LineDrawer } from "./LineDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLineShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new LineDrawer(), refresh);
}
