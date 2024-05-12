import { Attractor } from "./Attractor.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "particlesAttract",
        container => {
            return Promise.resolve(new Attractor(container));
        },
        refresh,
    );
}
