import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesRepulseInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Repulser } = await import("./Repulser.js");

    await engine.addInteractor("particlesRepulse", (container) => new Repulser(container), refresh);
}
