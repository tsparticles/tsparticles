import type { Main } from "../../main";
import { OpacityUpdater } from "./OpacityUpdater";

export async function loadOpacityUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
