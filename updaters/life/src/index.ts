import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLifeUpdater(engine: Engine, refresh = true): Promise<void> {
    const { LifeUpdater } = await import("./LifeUpdater.js");

    await engine.addParticleUpdater("life", (container) => new LifeUpdater(container), refresh);
}
