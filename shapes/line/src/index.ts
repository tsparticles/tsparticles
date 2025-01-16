import { type Engine } from "@tsparticles/engine";
import { LineDrawer } from "./LineDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLineShape(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addShape(new LineDrawer(), refresh);
}
