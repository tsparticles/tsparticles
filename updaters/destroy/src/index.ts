import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadDestroyUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "destroy",
        async container => {
            const { DestroyUpdater } = await import("./DestroyUpdater.js");

            return new DestroyUpdater(engine, container);
        },
        refresh,
    );
}
