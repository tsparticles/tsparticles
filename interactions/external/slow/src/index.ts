import { type Engine } from "@tsparticles/engine";
import { Slower } from "./Slower.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalSlowInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addInteractor(
        "externalSlow",
        container => {
            return Promise.resolve(new Slower(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Slow.js";
export type * from "./Options/Interfaces/ISlow.js";
