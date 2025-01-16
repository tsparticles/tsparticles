import { Bouncer } from "./Bouncer.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalBounceInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addInteractor(
        "externalBounce",
        container => {
            return Promise.resolve(new Bouncer(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Bounce.js";
export * from "./Options/Interfaces/IBounce.js";
