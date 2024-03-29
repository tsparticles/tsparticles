import { CogDrawer } from "./CogDrawer.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCogShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new CogDrawer(), refresh);
}
