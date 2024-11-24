import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { Slower } from "./Slower.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalSlowInteraction(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

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
