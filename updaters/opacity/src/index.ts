import type { Main } from "tsparticles-core";
import { OpacityUpdater } from "./OpacityUpdater";

export function loadOpacityUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
