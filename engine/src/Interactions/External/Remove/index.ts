import type { Engine } from "../../../engine";
import { Remover } from "./Remover";

export function loadExternalRemoveInteraction(engine: Engine): void {
    engine.addInteractor("externalRemove", (container) => new Remover(container));
}
