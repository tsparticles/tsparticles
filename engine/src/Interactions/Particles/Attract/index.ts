import type { Main } from "../../../main";
import { Attractor } from "./Attractor";

export function loadParticlesAttractInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesAttract", (container) => new Attractor(container));
}
