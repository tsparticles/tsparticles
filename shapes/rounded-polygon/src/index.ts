import { type Engine } from "@tsparticles/engine";
import { RoundedPolygonDrawer } from "./RoundedPolygonDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRoundedPolygonShape(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addShape(new RoundedPolygonDrawer(), refresh);
}
