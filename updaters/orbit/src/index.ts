import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadOrbitUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "orbit",
        async (container) => {
            const { OrbitUpdater } = await import("./OrbitUpdater.js");

            return new OrbitUpdater(container);
        },
        refresh,
    );
}
