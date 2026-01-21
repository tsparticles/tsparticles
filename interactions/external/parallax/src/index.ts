import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalParallaxInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        loadInteractivityPlugin(e);

        e.addInteractor?.("externalParallax", async container => {
            const { Parallaxer } = await import("./Parallaxer.js");

            return new Parallaxer(container);
        });
    });
}

export * from "./Options/Classes/Parallax.js";
export type * from "./Options/Interfaces/IParallax.js";
