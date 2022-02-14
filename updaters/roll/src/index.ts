import type { Engine } from "tsparticles-engine";
import { RollUpdater } from "./RollUpdater";

export async function loadRollUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("roll", () => new RollUpdater());
}
