import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 */
export function loadParticlesCollisionsInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { OverlapPlugin } = await import("./OverlapPlugin.js");

        e.addPlugin(new OverlapPlugin());
        e.addInteractor("particlesCollisions", async container => {
            const { Collider } = await import("./Collider.js");

            return new Collider(container);
        });
    });
}
