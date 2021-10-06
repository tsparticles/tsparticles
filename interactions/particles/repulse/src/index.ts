import type { Main } from "tsparticles-engine";
import { Repulser } from "./Repulser";

export function loadParticlesRepulseInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesRepulse", (container) => new Repulser(container));
}
