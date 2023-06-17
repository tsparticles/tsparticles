import type { Engine } from "tsparticles-engine";
import { PathDrawer } from "./PathDrawer";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPathShape(engine: Engine, refresh = false): Promise<void> {
    await engine.addShape("path", new PathDrawer(), refresh);
}
