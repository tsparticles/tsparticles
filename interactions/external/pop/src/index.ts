import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { Popper } from "./Popper.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPopInteraction(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addInteractor(
        "externalPop",
        container => {
            return Promise.resolve(new Popper(container));
        },
        refresh,
    );
}
