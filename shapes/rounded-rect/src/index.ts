import type { Engine } from "tsparticles-engine";
import { RoundedRectDrawer } from "./RoundedRectDrawer";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRoundedRectShape(engine: Engine, refresh = false): Promise<void> {
    await engine.addShape("rounded-rect", new RoundedRectDrawer(), refresh);
}
