import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { CogDrawer } from "./CogDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCogShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new CogDrawer(), refresh);
}
