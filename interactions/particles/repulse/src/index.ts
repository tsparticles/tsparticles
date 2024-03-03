import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesRepulseInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "particlesRepulse",
        async container => {
            const { Repulser } = await import("./Repulser.js");

            return new Repulser(container);
        },
        refresh,
    );
}
