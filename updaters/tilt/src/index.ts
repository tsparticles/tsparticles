import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine to load the updater for
 * @param refresh -
 */
export async function loadTiltUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "tilt",
        async (container) => {
            const { TiltUpdater } = await import("./TiltUpdater.js");

            return new TiltUpdater(container);
        },
        refresh,
    );
}
