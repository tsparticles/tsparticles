import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalAttractInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalAttract", async container => {
            const { Attractor } = await import("./Attractor.js");

            return new Attractor(e, container);
        });
    });
}

export * from "./Options/Classes/Attract.js";
export type * from "./Options/Interfaces/IAttract.js";
