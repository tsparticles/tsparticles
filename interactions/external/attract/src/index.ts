import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalAttractInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        loadInteractivityPlugin(e);

        e.addInteractor?.("externalAttract", async container => {
            const { Attractor } = await import("./Attractor.js");

            return new Attractor(e, container);
        });
    });
}

export * from "./Options/Classes/Attract.js";
export type * from "./Options/Interfaces/IAttract.js";
