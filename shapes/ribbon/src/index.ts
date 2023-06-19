import type { Engine } from "tsparticles-engine";
import { RibbonDrawer } from "./RibbonDrawer";

/**
 *
 * @param engine -
 * @param refresh -
 */
export async function loadRibbonShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape("ribbon", new RibbonDrawer(), refresh);
}
