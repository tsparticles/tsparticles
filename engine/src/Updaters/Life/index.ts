import type { Engine } from "../../engine";
import { LifeUpdater } from "./LifeUpdater";

export async function loadLifeUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("life", (container) => new LifeUpdater(container));
}
