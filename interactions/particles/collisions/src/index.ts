import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 */
export function loadParticlesCollisionsInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity"),
            { OverlapPlugin } = await import("./OverlapPlugin.js");

        loadInteractivityPlugin(e);

        e.addPlugin(new OverlapPlugin());

        e.addInteractor?.("particlesCollisions", async container => {
            const { Collider } = await import("./Collider.js");

            return new Collider(container);
        });
    });
}
