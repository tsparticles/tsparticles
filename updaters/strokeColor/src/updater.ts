import type { Main } from "tsparticles-core";
import { StrokeColorUpdater } from "./StrokeColorUpdater";

export function loadUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater((container) => new StrokeColorUpdater(container));
}
