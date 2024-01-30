import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalTrailInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalTrail",
        async (container) => {
            const { TrailMaker } = await import("./TrailMaker.js");

            return new TrailMaker(container);
        },
        refresh,
    );
}

export * from "./Options/Classes/Trail.js";
export * from "./Options/Interfaces/ITrail.js";
