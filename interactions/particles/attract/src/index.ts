import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { Attractor } from "./Attractor.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addInteractor(
        "particlesAttract",
        container => {
            return Promise.resolve(new Attractor(container));
        },
        refresh,
    );
}
