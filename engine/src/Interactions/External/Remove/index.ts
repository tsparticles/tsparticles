import type { Engine } from "../../../engine";
import { Remover } from "./Remover";

export async function loadExternalRemoveInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalRemove", (container) => new Remover(container));
}
