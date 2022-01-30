import { Attractor } from "./Attractor";
import type { Engine } from "tsparticles-engine";

export async function loadParticlesAttractInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("particlesAttract", (container) => new Attractor(container));
}
