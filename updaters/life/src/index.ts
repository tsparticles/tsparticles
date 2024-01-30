import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLifeUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "life",
        async (container) => {
            const { LifeUpdater } = await import("./LifeUpdater.js");

            return new LifeUpdater(container);
        },
        refresh,
    );
}
