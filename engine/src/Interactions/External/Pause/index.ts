import type { Engine } from "../../../engine";
import { Pauser } from "./Pauser";

export async function loadExternalPauseInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalPause", (container) => new Pauser(container));
}
