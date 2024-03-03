import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "particlesAttract",
        async container => {
            const { Attractor } = await import("./Attractor.js");

            return new Attractor(container);
        },
        refresh,
    );
}
