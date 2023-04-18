import type { Engine } from "tsparticles-engine";
import { Remover } from "./Remover";

/**
 * @param engine -
 */
export async function loadExternalRemoveInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalRemove", (container) => new Remover(container));
}

export * from "./Options/Classes/Remove";
export * from "./Options/Interfaces/IRemove";
