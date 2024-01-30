import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalRemoveInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalRemove",
        async (container) => {
            const { Remover } = await import("./Remover.js");

            return new Remover(container);
        },
        refresh,
    );
}

export * from "./Options/Classes/Remove.js";
export * from "./Options/Interfaces/IRemove.js";
