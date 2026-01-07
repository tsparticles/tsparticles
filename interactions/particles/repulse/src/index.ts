import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadParticlesRepulseInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("particlesRepulse", async container => {
            const { Repulser } = await import("./Repulser.js");

            return new Repulser(container);
        });
    });
}
