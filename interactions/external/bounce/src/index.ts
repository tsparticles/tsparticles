import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalBounceInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        loadInteractivityPlugin(e);

        e.addInteractor?.("externalBounce", async container => {
            const { Bouncer } = await import("./Bouncer.js");

            return new Bouncer(container);
        });
    });
}

export * from "./Options/Classes/Bounce.js";
export type * from "./Options/Interfaces/IBounce.js";
