import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalRepulseInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        loadInteractivityPlugin(e);

        e.addInteractor?.("externalRepulse", async container => {
            const { Repulser } = await import("./Repulser.js");

            return new Repulser(engine, container);
        });
    });
}

export * from "./Options/Classes/RepulseBase.js";
export * from "./Options/Classes/RepulseDiv.js";
export * from "./Options/Classes/Repulse.js";
export type * from "./Options/Interfaces/IRepulseBase.js";
export type * from "./Options/Interfaces/IRepulseDiv.js";
export type * from "./Options/Interfaces/IRepulse.js";
