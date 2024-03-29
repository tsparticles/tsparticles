import type { Engine } from "@tsparticles/engine";
import { SpiralDrawer } from "./SpiralDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSpiralShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new SpiralDrawer(), refresh);
}
