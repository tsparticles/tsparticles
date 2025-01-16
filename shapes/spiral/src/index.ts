import { type Engine } from "@tsparticles/engine";
import { SpiralDrawer } from "./SpiralDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSpiralShape(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addShape(new SpiralDrawer(), refresh);
}
