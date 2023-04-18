import type { Engine } from "tsparticles-engine";
import { Pauser } from "./Pauser";

/**
 *
 * @param engine
 */
export async function loadExternalPauseInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalPause", (container) => new Pauser(container));
}
