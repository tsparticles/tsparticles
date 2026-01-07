import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalRepulseInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalRepulse", async container => {
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
