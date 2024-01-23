import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadRollUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "roll",
        async () => {
            const { RollUpdater } = await import("./RollUpdater.js");

            return new RollUpdater();
        },
        refresh,
    );
}
