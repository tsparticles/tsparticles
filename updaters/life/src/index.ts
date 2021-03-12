import type { Main } from "tsparticles-engine";
import { LifeUpdater } from "./LifeUpdater";

export function loadLifeUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("life", (container) => new LifeUpdater(container));
}
