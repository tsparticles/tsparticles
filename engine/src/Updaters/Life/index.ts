import type { Engine } from "../../engine";
import { LifeUpdater } from "./LifeUpdater";

export async function loadLifeUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("life", (container) => new LifeUpdater(container));
}
