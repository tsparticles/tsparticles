import type { Main } from "tsparticles-core";
import { OpacityUpdater } from "./OpacityUpdater";

export function loadUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater((container) => new OpacityUpdater(container));
}
