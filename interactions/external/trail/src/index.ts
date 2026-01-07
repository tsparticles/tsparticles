import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalTrailInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalTrail", async container => {
            const { TrailMaker } = await import("./TrailMaker.js");

            return new TrailMaker(container);
        });
    });
}

export * from "./Options/Classes/Trail.js";
export type * from "./Options/Interfaces/ITrail.js";
