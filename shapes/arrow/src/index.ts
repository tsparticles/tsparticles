import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { ArrowDrawer } from "./ArrowDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadArrowShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new ArrowDrawer(), refresh);
}
