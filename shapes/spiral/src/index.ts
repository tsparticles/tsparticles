import type { Engine } from "tsparticles-engine";
import { SpiralDrawer } from "./SpiralDrawer";

/**
 *
 * @param engine -
 */
export async function loadSpiralShape(engine: Engine): Promise<void> {
    engine.addShape("spiral", new SpiralDrawer());
}
