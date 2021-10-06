import type { Main } from "tsparticles-engine";
import { AngleUpdater } from "./AngleUpdater";

export function loadAngleUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("angle", (container) => new AngleUpdater(container));
}
