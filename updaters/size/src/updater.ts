import type { Main } from "tsparticles-core";
import { SizeUpdater } from "./SizeUpdater";

export function loadSizeUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("size", (container) => new SizeUpdater(container));
}
