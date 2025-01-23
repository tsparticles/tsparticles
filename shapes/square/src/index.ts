import { type Engine } from "@tsparticles/engine";
import { SquareDrawer } from "./SquareDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSquareShape(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addShape(new SquareDrawer(), refresh);
}
