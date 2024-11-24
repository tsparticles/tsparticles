import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { PathDrawer } from "./PathDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPathShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new PathDrawer(), refresh);
}
