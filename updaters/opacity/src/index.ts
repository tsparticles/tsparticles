import type { Engine } from "tsparticles-engine";
import { OpacityUpdater } from "./OpacityUpdater";

export async function loadOpacityUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
