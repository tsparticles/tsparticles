import type { Engine } from "tsparticles-engine";
import { OrbitUpdater } from "./OrbitUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadOrbitUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("orbit", (container) => new OrbitUpdater(container), refresh);
}
