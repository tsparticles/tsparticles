import type { Main } from "tsparticles-core";
import { Attractor } from "./Attractor";

export function loadParticlesAttractInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesAttract", (container) => new Attractor(container));
}
