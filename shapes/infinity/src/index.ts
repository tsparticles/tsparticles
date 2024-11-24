import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { InfinityDrawer } from "./InfinityDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadInfinityShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new InfinityDrawer(), refresh);
}
