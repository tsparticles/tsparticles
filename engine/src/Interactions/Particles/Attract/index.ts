import type { Engine } from "../../../engine";
import { Attractor } from "./Attractor";

export async function loadParticlesAttractInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("particlesAttract", (container) => new Attractor(container));
}
