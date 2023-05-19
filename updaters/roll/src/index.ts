import type { Engine } from "tsparticles-engine";
import { RollUpdater } from "./RollUpdater";

/**
 * @param engine - The engine instance
 */
export async function loadRollUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("roll", () => new RollUpdater());
}
