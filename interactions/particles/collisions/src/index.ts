import { Collider } from "./Collider.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine to use for the interaction
 * @param refresh -
 */
export async function loadParticlesCollisionsInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("particlesCollisions", (container) => new Collider(container), refresh);
}
