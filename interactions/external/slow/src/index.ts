import type { Engine } from "@tsparticles/engine";
import { Slower } from "./Slower.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalSlowInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalSlow",
        container => {
            return Promise.resolve(new Slower(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Slow.js";
export * from "./Options/Interfaces/ISlow.js";
