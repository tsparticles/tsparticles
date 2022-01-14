import type { Engine } from "tsparticles-engine";
import { ColorUpdater } from "./ColorUpdater";

export async function loadColorUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
