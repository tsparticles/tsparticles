import { CogDrawer } from "./CogDrawer";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCogShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape("cog", new CogDrawer(), refresh);
}
