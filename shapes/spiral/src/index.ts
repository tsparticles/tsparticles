import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { SpiralDrawer } from "./SpiralDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSpiralShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new SpiralDrawer(), refresh);
}
