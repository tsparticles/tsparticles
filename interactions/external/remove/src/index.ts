import type { Engine } from "tsparticles-engine";
import { Remover } from "./Remover";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalRemoveInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("externalRemove", (container) => new Remover(container), refresh);
}

export * from "./Options/Classes/Remove";
export * from "./Options/Interfaces/IRemove";
