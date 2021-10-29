import type { Main } from "tsparticles-engine";
import { LifeUpdater } from "./LifeUpdater";

export async function loadLifeUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("life", (container) => new LifeUpdater(container));
}
