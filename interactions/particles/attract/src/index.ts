import type { Main } from "tsparticles-engine";
import { Attractor } from "./Attractor";

export async function loadParticlesAttractInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("particlesAttract", (container) => new Attractor(container));
}
