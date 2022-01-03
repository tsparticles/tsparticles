import type { Engine } from "../../engine";
import { AngleUpdater } from "./AngleUpdater";

export async function loadAngleUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("angle", (container) => new AngleUpdater(container));
}
