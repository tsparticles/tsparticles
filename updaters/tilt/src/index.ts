import type { Main } from "tsparticles-engine";
import { TiltUpdater } from "./TiltUpdater";

export async function loadTiltUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("tilt", (container) => new TiltUpdater(container));
}
