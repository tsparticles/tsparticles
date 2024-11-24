import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { LineDrawer } from "./LineDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLineShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new LineDrawer(), refresh);
}
