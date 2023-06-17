import type { Engine } from "tsparticles-engine";
import { Repulser } from "./Repulser";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesRepulseInteraction(engine: Engine, refresh = false): Promise<void> {
    await engine.addInteractor("particlesRepulse", (container) => new Repulser(container), refresh);
}
