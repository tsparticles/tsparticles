import type { Engine } from "tsparticles";
import { Repulser } from "./Repulser";

export function loadParticlesRepulseInteraction(tsParticles: Engine): void {
    tsParticles.addInteractor("particlesRepulse", (container) => new Repulser(container));
}
