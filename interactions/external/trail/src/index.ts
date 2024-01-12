import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalTrailInteraction(engine: Engine, refresh = true): Promise<void> {
    const { TrailMaker } = await import("./TrailMaker.js");

    await engine.addInteractor("externalTrail", (container) => new TrailMaker(container), refresh);
}

export * from "./Options/Classes/Trail.js";
export * from "./Options/Interfaces/ITrail.js";
