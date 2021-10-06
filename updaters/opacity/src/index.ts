import type { Main } from "tsparticles-engine";
import { OpacityUpdater } from "./OpacityUpdater";

export function loadOpacityUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
