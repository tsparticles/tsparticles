import type { Engine } from "tsparticles-engine";
import { LifeUpdater } from "./LifeUpdater";

export async function loadLifeUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("life", (container) => new LifeUpdater(container));
}
