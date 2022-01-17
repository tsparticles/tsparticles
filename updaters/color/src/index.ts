import { ColorUpdater } from "./ColorUpdater";
import type { Engine } from "tsparticles-engine";

export async function loadColorUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
