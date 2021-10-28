import type { Main } from "tsparticles-engine";
import { SizeUpdater } from "./SizeUpdater";

export async function loadSizeUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("size", () => new SizeUpdater());
}
