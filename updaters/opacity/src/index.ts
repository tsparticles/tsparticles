import type { Main } from "tsparticles-engine";
import { OpacityUpdater } from "./OpacityUpdater";

export async function loadOpacityUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
