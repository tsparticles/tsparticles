import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalParticleInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalParticle",
        async (container) => {
            const { InteractivityParticleMaker } = await import("./InteractivityParticleMaker.js");

            return new InteractivityParticleMaker(container);
        },
        refresh,
    );
}
