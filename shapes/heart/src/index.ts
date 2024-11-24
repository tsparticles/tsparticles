import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { HeartDrawer } from "./HeartDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadHeartShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new HeartDrawer(), refresh);
}
