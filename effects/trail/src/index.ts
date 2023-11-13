import type { Engine } from "@tsparticles/engine";
import { TrailDrawer } from "./TrailDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTrailEffect(engine: Engine, refresh = true): Promise<void> {
    await engine.addEffect("trail", new TrailDrawer(), refresh);
}
