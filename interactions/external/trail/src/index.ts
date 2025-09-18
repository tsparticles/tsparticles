import { type Engine } from "@tsparticles/engine";
import { TrailMaker } from "./TrailMaker.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalTrailInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addInteractor(
        "externalTrail",
        container => {
            return Promise.resolve(new TrailMaker(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Trail.js";
export type * from "./Options/Interfaces/ITrail.js";
