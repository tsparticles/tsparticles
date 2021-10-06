import type { Main } from "tsparticles-engine";
import { TiltUpdater } from "./TiltUpdater";

export function loadTiltUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("tilt", (container) => new TiltUpdater(container));
}
