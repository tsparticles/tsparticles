import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadParticlesAttractInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("particlesAttract", async container => {
            const { Attractor } = await import("./Attractor.js");

            return new Attractor(container);
        });
    });
}
