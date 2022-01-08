import type { Engine } from "../../engine";
import { RollUpdater } from "./RollUpdater";

export async function loadRollUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("roll", () => new RollUpdater());
}
