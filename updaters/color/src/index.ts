import type { Main } from "tsparticles-core";
import { ColorUpdater } from "./ColorUpdater";

export function loadColorUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
