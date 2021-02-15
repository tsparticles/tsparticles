import type { Main } from "tsparticles-core";
import { Collider } from "./Collider";

export function loadParticlesCollisionsInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesCollisions", (container) => new Collider(container));
}
