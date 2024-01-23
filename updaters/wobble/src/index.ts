import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadWobbleUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "wobble",
        async (container) => {
            const { WobbleUpdater } = await import("./WobbleUpdater.js");

            return new WobbleUpdater(container);
        },
        refresh,
    );
}
