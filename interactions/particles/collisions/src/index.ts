import type { Main } from "tsparticles-engine";
import { Collider } from "./Collider";

export async function loadParticlesCollisionsInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("particlesCollisions", (container) => new Collider(container));
}
