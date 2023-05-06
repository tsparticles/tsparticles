import type { Engine } from "@tsparticles/engine";
import { Pauser } from "./Pauser";

/**
 *
 * @param engine
 */
export function loadExternalPauseInteraction(engine: Engine): void {
    engine.addInteractor("externalPause", (container) => new Pauser(container));
}
