import type { Engine } from "@tsparticles/engine";
import { Remover } from "./Remover.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalRemoveInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalRemove",
        container => {
            return Promise.resolve(new Remover(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Remove.js";
export * from "./Options/Interfaces/IRemove.js";
