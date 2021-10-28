import type { Main } from "../../main";
import { AngleUpdater } from "./AngleUpdater";

export async function loadAngleUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("angle", (container) => new AngleUpdater(container));
}
