import type { Engine } from "tsparticles-engine";
import { OrbitUpdater } from "./OrbitUpdater";

/**
 *
 * @param engine
 */
export function loadOrbitUpdater(engine: Engine): void {
    engine.addParticleUpdater("orbit", (container) => new OrbitUpdater(container));
}
