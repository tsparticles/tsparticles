import type { Main } from "tsparticles-core";
import { ColorUpdater } from "./ColorUpdater";

export function loadUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater((container) => new ColorUpdater(container));
}
