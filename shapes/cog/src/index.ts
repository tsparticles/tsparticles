import { CogDrawer } from "./CogDrawer";
import type { Engine } from "tsparticles-engine";

/**
 *
 * @param engine -
 */
export async function loadCogShape(engine: Engine): Promise<void> {
    await engine.addShape("cog", new CogDrawer());
}
