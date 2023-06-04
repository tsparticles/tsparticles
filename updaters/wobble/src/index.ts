import type { Engine } from "tsparticles-engine";
import { WobbleUpdater } from "./WobbleUpdater";

/**
 * @param engine -
 */
export async function loadWobbleUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
