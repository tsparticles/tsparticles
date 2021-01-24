import type { Main } from "tsparticles-core";
import { AngleUpdater } from "./AngleUpdater";

export function loadUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater((container) => new AngleUpdater(container));
}
