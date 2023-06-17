import type { Engine } from "tsparticles-engine";
import { LineDrawer } from "./LineDrawer";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLineShape(engine: Engine, refresh = false): Promise<void> {
    await engine.addShape("line", new LineDrawer(), refresh);
}
