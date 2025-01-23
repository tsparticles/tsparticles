import { type Engine } from "@tsparticles/engine";
import { StarDrawer } from "./StarDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStarShape(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addShape(new StarDrawer(), refresh);
}
