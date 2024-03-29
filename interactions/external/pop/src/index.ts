import type { Engine } from "@tsparticles/engine";
import { Popper } from "./Popper.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPopInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalPop",
        container => {
            return Promise.resolve(new Popper(container));
        },
        refresh,
    );
}
