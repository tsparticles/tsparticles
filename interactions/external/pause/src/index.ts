import type { Engine } from "@tsparticles/engine";
import { Pauser } from "./Pauser.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPauseInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalPause",
        container => {
            return Promise.resolve(new Pauser(container));
        },
        refresh,
    );
}
