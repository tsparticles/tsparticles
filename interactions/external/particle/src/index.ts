import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalParticleInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        loadInteractivityPlugin(e);

        e.addInteractor?.("externalParticle", async container => {
            const { InteractivityParticleMaker } = await import("./InteractivityParticleMaker.js");

            return new InteractivityParticleMaker(container);
        });
    });
}
