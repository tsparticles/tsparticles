import type { Engine } from "@tsparticles/engine";
import { LifeUpdater } from "./LifeUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLifeUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("life", (container) => new LifeUpdater(container), refresh);
}
