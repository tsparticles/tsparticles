import type { Main } from "tsparticles-core";
import { LifeUpdater } from "./LifeUpdater";

export function loadUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater((container) => new LifeUpdater(container));
}
