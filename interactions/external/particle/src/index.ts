import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalParticleInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalParticle", async container => {
            const { InteractivityParticleMaker } = await import("./InteractivityParticleMaker.js");

            return new InteractivityParticleMaker(container);
        });
    });
}
