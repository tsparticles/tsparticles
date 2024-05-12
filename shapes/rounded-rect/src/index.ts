import type { Engine } from "@tsparticles/engine";
import { RoundedRectDrawer } from "./RoundedRectDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRoundedRectShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new RoundedRectDrawer(), refresh);
}
