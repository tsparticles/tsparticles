import { type Engine } from "@tsparticles/engine";
import { Pauser } from "./Pauser.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPauseInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addInteractor(
        "externalPause",
        container => {
            return Promise.resolve(new Pauser(container));
        },
        refresh,
    );
}
