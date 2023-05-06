import type { Engine } from "@tsparticles/engine";
import { SpiralDrawer } from "./SpiralDrawer";

/**
 *
 * @param engine
 */
export function loadSpiralShape(engine: Engine): void {
    engine.addShape("spiral", new SpiralDrawer());
}
