import type { Main } from "tsparticles-engine";
import { RollUpdater } from "./RollUpdater";

export async function loadRollUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("roll", () => new RollUpdater());
}
