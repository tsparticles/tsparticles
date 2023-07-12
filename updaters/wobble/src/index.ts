import type { Engine } from "tsparticles-engine";
import { WobbleUpdater } from "./WobbleUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadWobbleUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("wobble", (container) => new WobbleUpdater(container), refresh);
}
