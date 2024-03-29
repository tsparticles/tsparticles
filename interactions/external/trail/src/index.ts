import type { Engine } from "@tsparticles/engine";
import { TrailMaker } from "./TrailMaker.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalTrailInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalTrail",
        container => {
            return Promise.resolve(new TrailMaker(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Trail.js";
export * from "./Options/Interfaces/ITrail.js";
