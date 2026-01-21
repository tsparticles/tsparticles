import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadInfectionPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity"),
            { InfectionPlugin } = await import("./InfectionPlugin.js");

        loadInteractivityPlugin(e);

        e.addPlugin(new InfectionPlugin());

        e.addInteractor?.("particlesInfection", async container => {
            const { ParticlesInfecter } = await import("./ParticlesInfecter.js");

            return new ParticlesInfecter(container);
        });
    });
}

export type * from "./Options/Interfaces/IInfection.js";
export type * from "./Options/Interfaces/IInfectionStage.js";
