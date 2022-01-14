import { Collider } from "./Collider";
import type { Engine } from "../../../engine";

export async function loadParticlesCollisionsInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("particlesCollisions", (container) => new Collider(container));
}
