import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalRemoveInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalRemove", async container => {
            const { Remover } = await import("./Remover.js");

            return new Remover(container);
        });
    });
}

export * from "./Options/Classes/Remove.js";
export type * from "./Options/Interfaces/IRemove.js";
