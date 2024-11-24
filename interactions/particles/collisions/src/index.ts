import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { Collider } from "./Collider.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 * @param refresh -
 */
export async function loadParticlesCollisionsInteraction(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addInteractor(
        "particlesCollisions",
        container => {
            return Promise.resolve(new Collider(container));
        },
        refresh,
    );
}
