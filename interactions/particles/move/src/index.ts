import type { Main } from "tsparticles-engine";
import { Mover } from "./Mover";

export function loadParticlesMoveInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesMove", (container) => new Mover(container));
}
