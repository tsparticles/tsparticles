import type { Main } from "../../main";
import { RollUpdater } from "./RollUpdater";

export function loadRollUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("roll", () => new RollUpdater());
}
