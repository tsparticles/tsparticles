import { ArrowDrawer } from "./ArrowDrawer";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 */
export async function loadArrowShape(engine: Engine): Promise<void> {
    await engine.addShape("arrow", new ArrowDrawer());
}
