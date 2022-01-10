import type { Engine } from "tsparticles-engine";
import { ColorUpdater } from "./ColorUpdater";

export async function loadColorUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
