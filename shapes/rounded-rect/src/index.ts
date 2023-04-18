import type { Engine } from "tsparticles-engine";
import { RoundedRectDrawer } from "./RoundedRectDrawer";

/**
 * @param engine -
 */
export async function loadRoundedRectShape(engine: Engine): Promise<void> {
    engine.addShape("rounded-rect", new RoundedRectDrawer());
}
