import { type Engine } from "@tsparticles/engine";
import { InteractivityParticleMaker } from "./InteractivityParticleMaker.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalParticleInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addInteractor(
        "externalParticle",
        container => {
            return Promise.resolve(new InteractivityParticleMaker(container));
        },
        refresh,
    );
}
