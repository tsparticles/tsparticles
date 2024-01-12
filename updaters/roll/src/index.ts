import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadRollUpdater(engine: Engine, refresh = true): Promise<void> {
    const { RollUpdater } = await import("./RollUpdater.js");

    await engine.addParticleUpdater("roll", () => new RollUpdater(), refresh);
}
