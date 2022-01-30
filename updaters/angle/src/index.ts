import { AngleUpdater } from "./AngleUpdater";
import type { Engine } from "tsparticles-engine";

export async function loadAngleUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("angle", (container) => new AngleUpdater(container));
}
