import { Attractor } from "./Attractor.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalAttract",
        container => {
            return Promise.resolve(new Attractor(engine, container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Attract.js";
export * from "./Options/Interfaces/IAttract.js";
