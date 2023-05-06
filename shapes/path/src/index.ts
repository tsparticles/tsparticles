import type { Engine } from "@tsparticles/engine";
import { PathDrawer } from "./PathDrawer";

/**
 *
 * @param engine
 */
export async function loadPathShape(engine: Engine): Promise<void> {
    await engine.addShape("path", new PathDrawer());
}
