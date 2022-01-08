import type { Engine } from "../../engine";
import { TiltUpdater } from "./TiltUpdater";

export async function loadTiltUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("tilt", (container) => new TiltUpdater(container));
}
