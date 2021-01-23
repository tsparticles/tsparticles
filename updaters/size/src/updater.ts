import type { Main } from "tsparticles-core";
import { SizeUpdater } from "./SizeUpdater";

export function loadUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater((container) => new SizeUpdater(container));
}
