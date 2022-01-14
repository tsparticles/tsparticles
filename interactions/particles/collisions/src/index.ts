import type { Engine } from "tsparticles-engine";
import { Collider } from "./Collider";

export async function loadParticlesCollisionsInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("particlesCollisions", (container) => new Collider(container));
}
