import type { Engine } from "tsparticles-engine";
import { OrbitUpdater } from "./OrbitUpdater";

/**
 *
 * @param engine -
 */
export async function loadOrbitUpdater(engine: Engine): Promise<void> {
    engine.addParticleUpdater("orbit", (container) => new OrbitUpdater(container));
}
