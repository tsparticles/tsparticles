import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRotateUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "rotate",
        async (container) => {
            const { RotateUpdater } = await import("./RotateUpdater.js");

            return new RotateUpdater(container);
        },
        refresh,
    );
}
