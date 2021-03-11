import type { Main } from "tsparticles-engine";
import { Attractor } from "./Attractor";

export function loadParticlesAttractInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesAttract", (container) => new Attractor(container));
}
