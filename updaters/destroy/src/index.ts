import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadDestroyUpdater(engine: Engine, refresh = true): Promise<void> {
    const { DestroyUpdater } = await import("./DestroyUpdater.js");

    await engine.addParticleUpdater("destroy", (container) => new DestroyUpdater(engine, container), refresh);
}
