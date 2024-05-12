import type { Engine } from "@tsparticles/engine";
import { PathDrawer } from "./PathDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPathShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new PathDrawer(), refresh);
}
