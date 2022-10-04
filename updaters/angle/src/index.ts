import type { Engine } from "tsparticles-engine";
import { RotateUpdater } from "./RotateUpdater";

export async function loadAngleUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("rotate", (container) => new RotateUpdater(container));
}
