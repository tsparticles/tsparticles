import type { Engine } from "tsparticles-engine";
import { Remover } from "./Remover";

export function loadExternalRemoveInteraction(engine: Engine): void {
    engine.addInteractor("externalRemove", (container) => new Remover(container));
}

export * from "./Options/Classes/Remove";
export * from "./Options/Interfaces/IRemove";
