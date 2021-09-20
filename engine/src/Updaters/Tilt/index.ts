import type { Main } from "../../main";
import { TiltUpdater } from "./TiltUpdater";

export function loadTiltUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("tilt", (container) => new TiltUpdater(container));
}
