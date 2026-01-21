import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalRemoveInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        loadInteractivityPlugin(e);

        e.addInteractor?.("externalRemove", async container => {
            const { Remover } = await import("./Remover.js");

            return new Remover(container);
        });
    });
}

export * from "./Options/Classes/Remove.js";
export type * from "./Options/Interfaces/IRemove.js";
