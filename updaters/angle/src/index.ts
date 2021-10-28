import type { Main } from "tsparticles-engine";
import { AngleUpdater } from "./AngleUpdater";

export async function loadAngleUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("angle", (container) => new AngleUpdater(container));
}
