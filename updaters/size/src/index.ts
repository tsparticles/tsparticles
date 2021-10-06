import type { Main } from "tsparticles-engine";
import { SizeUpdater } from "./SizeUpdater";

export function loadSizeUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("size", () => new SizeUpdater());
}
