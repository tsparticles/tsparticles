import type { Engine } from "tsparticles-engine";
import { Collider } from "./Collider";

export async function loadParticlesCollisionsInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("particlesCollisions", (container) => new Collider(container));
}
