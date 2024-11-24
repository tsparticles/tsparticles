import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { TrailDrawer } from "./TrailDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTrailEffect(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addEffect("trail", new TrailDrawer(), refresh);
}
