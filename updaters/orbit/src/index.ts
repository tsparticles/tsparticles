import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadOrbitUpdater(engine: Engine, refresh = true): Promise<void> {
    const { OrbitUpdater } = await import("./OrbitUpdater.js");

    await engine.addParticleUpdater("orbit", (container) => new OrbitUpdater(container), refresh);
}
