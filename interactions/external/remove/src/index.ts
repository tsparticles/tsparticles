import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalRemoveInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Remover } = await import("./Remover.js");

    await engine.addInteractor("externalRemove", (container) => new Remover(container), refresh);
}

export * from "./Options/Classes/Remove.js";
export * from "./Options/Interfaces/IRemove.js";
