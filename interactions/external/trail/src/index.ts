import type { Engine } from "tsparticles-engine";
import { TrailMaker } from "./TrailMaker";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalTrailInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("externalTrail", (container) => new TrailMaker(container), refresh);
}

export * from "./Options/Classes/Trail";
export * from "./Options/Interfaces/ITrail";
