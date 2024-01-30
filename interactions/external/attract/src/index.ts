import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalAttract",
        async (container) => {
            const { Attractor } = await import("./Attractor.js");

            return new Attractor(engine, container);
        },
        refresh,
    );
}

export * from "./Options/Classes/Attract.js";
export * from "./Options/Interfaces/IAttract.js";
