import type { Main } from "../../main";
import { LifeUpdater } from "./LifeUpdater";

export async function loadLifeUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("life", (container) => new LifeUpdater(container));
}
