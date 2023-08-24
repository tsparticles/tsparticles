import type { Engine } from "@tsparticles/engine";
import { SpiralDrawer } from "./SpiralDrawer";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSpiralShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape("spiral", new SpiralDrawer(), refresh);
}
