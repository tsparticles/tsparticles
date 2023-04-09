import type { Engine } from "tsparticles-engine";
import { StarDrawer } from "./StarDrawer";

/**
 *
 * @param engine
 */
export async function loadStarShape(engine: Engine): Promise<void> {
    await engine.addShape("star", new StarDrawer());
}
