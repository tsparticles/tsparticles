import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { Repulser } from "./Repulser.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesRepulseInteraction(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addInteractor(
        "particlesRepulse",
        container => {
            return Promise.resolve(new Repulser(container));
        },
        refresh,
    );
}
