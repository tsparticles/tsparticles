import type { Engine } from "@tsparticles/engine";
import { Repulser } from "./Repulser.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesRepulseInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "particlesRepulse",
        container => {
            return Promise.resolve(new Repulser(container));
        },
        refresh,
    );
}
