import type { Engine } from "tsparticles-engine";
import { Repulser } from "./Repulser";

/**
 * @param engine -
 */
export async function loadParticlesRepulseInteraction(engine: Engine): Promise<void> {
    engine.addInteractor("particlesRepulse", (container) => new Repulser(container));
}
