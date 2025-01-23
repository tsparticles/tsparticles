import { Attractor } from "./Attractor.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addInteractor(
        "particlesAttract",
        container => {
            return Promise.resolve(new Attractor(container));
        },
        refresh,
    );
}
