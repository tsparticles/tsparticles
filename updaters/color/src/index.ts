import type { Main } from "tsparticles-engine";
import { ColorUpdater } from "./ColorUpdater";

export async function loadColorUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
