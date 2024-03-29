import type { Engine } from "@tsparticles/engine";
import { Repulser } from "./Repulser.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalRepulseInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalRepulse",
        container => {
            return Promise.resolve(new Repulser(engine, container));
        },
        refresh,
    );
}

export * from "./Options/Classes/RepulseBase.js";
export * from "./Options/Classes/RepulseDiv.js";
export * from "./Options/Classes/Repulse.js";
export * from "./Options/Interfaces/IRepulseBase.js";
export * from "./Options/Interfaces/IRepulseDiv.js";
export * from "./Options/Interfaces/IRepulse.js";
