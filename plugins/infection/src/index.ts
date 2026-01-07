import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadInfectionPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { InfectionPlugin } = await import("./InfectionPlugin.js");

        e.addPlugin(new InfectionPlugin());
        e.addInteractor("particlesInfection", async container => {
            const { ParticlesInfecter } = await import("./ParticlesInfecter.js");

            return new ParticlesInfecter(container);
        });
    });
}

export type * from "./Options/Interfaces/IInfection.js";
export type * from "./Options/Interfaces/IInfectionStage.js";
