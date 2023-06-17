import type { Engine } from "tsparticles-engine";
import { Pauser } from "./Pauser";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPauseInteraction(engine: Engine, refresh = false): Promise<void> {
    await engine.addInteractor("externalPause", (container) => new Pauser(container), refresh);
}
