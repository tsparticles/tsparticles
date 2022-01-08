import type { Engine } from "../../engine";
import { OpacityUpdater } from "./OpacityUpdater";

export async function loadOpacityUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
