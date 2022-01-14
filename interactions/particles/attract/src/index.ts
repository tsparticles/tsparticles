import type { Engine } from "tsparticles-engine";
import { Attractor } from "./Attractor";

export async function loadParticlesAttractInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("particlesAttract", (container) => new Attractor(container));
}
