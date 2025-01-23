import { type Engine } from "@tsparticles/engine";
import { Remover } from "./Remover.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalRemoveInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

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
