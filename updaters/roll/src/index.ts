import type { Main } from "tsparticles-engine";
import { RollUpdater } from "./RollUpdater";

export function loadRollUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("roll", () => new RollUpdater());
}
