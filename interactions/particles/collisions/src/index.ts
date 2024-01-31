import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine to use for the interaction
 * @param refresh -
 */
export async function loadParticlesCollisionsInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "particlesCollisions",
        async (container) => {
            const { Collider } = await import("./Collider.js");

            return new Collider(container);
        },
        refresh,
    );
}
