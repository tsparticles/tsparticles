import type { Engine } from "tsparticles-engine";
import { RollUpdater } from "./RollUpdater";

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadRollUpdater(engine: Engine, refresh = false): Promise<void> {
    await engine.addParticleUpdater("roll", () => new RollUpdater(), refresh);
}
