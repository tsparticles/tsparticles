import type { Engine } from "@tsparticles/engine";
import { RoundedPolygonDrawer } from "./RoundedPolygonDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRoundedPolygonShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new RoundedPolygonDrawer(), refresh);
}
