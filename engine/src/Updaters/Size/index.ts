import type { Main } from "../../main";
import { SizeUpdater } from "./SizeUpdater";

export function loadSizeUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("size", () => new SizeUpdater());
}
