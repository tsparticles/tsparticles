import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadWobbleUpdater(engine: Engine, refresh = true): Promise<void> {
    const { WobbleUpdater } = await import("./WobbleUpdater.js");

    await engine.addParticleUpdater("wobble", (container) => new WobbleUpdater(container), refresh);
}
