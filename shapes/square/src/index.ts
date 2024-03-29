import type { Engine } from "@tsparticles/engine";
import { SquareDrawer } from "./SquareDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSquareShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new SquareDrawer(), refresh);
}
