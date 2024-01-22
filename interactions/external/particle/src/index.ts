import type { Engine } from "@tsparticles/engine";
import { InteractivityParticleMaker } from "./InteractivityParticleMaker.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalParticleInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("externalParticle", (container) => new InteractivityParticleMaker(container), refresh);
}
