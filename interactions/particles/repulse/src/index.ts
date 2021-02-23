import type { Main } from "tsparticles-core";
import { Repulser } from "./Repulser";

export function loadParticlesRepulseInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesRepulse", (container) => new Repulser(container));
}
