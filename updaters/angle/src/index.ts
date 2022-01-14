import type { Engine } from "tsparticles-engine";
import { AngleUpdater } from "./AngleUpdater";

export async function loadAngleUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("angle", (container) => new AngleUpdater(container));
}
