import { DestroyUpdater } from "./DestroyUpdater";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadDestroyUpdater(engine: Engine, refresh = false): Promise<void> {
    await engine.addParticleUpdater("destroy", (container) => new DestroyUpdater(engine, container), refresh);
}
