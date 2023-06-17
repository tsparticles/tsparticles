import { Attractor } from "./Attractor";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesAttractInteraction(engine: Engine, refresh = false): Promise<void> {
    await engine.addInteractor("particlesAttract", (container) => new Attractor(container), refresh);
}
