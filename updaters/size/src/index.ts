import type { Engine } from "tsparticles-engine";
import { SizeUpdater } from "./SizeUpdater";

export async function loadSizeUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("size", () => new SizeUpdater());
}
