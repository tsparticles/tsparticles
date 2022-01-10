import type { Engine } from "tsparticles-engine";
import { Pauser } from "./Pauser";

export function loadExternalPauseInteraction(engine: Engine): void {
    engine.addInteractor("externalPause", (container) => new Pauser(container));
}
