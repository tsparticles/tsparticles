import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Attractor } = await import("./Attractor.js");

    await engine.addInteractor("particlesAttract", (container) => new Attractor(container), refresh);
}
