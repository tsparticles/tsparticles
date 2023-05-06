import type { Engine } from "@tsparticles/engine";
import { RibbonDrawer } from "./RibbonDrawer";

/**
 *
 * @param engine
 */
export async function loadRibbonShape(engine: Engine): Promise<void> {
    await engine.addShape("ribbon", new RibbonDrawer());
}
