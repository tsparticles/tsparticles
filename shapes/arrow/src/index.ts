import { ArrowDrawer } from "./ArrowDrawer";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadArrowShape(engine: Engine, refresh = false): Promise<void> {
    await engine.addShape("arrow", new ArrowDrawer(), refresh);
}
