import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { StarDrawer } from "./StarDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStarShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new StarDrawer(), refresh);
}
