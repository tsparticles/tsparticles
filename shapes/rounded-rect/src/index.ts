import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { RoundedRectDrawer } from "./RoundedRectDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRoundedRectShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new RoundedRectDrawer(), refresh);
}
