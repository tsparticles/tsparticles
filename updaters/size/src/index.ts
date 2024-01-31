import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSizeUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "size",
        async () => {
            const { SizeUpdater } = await import("./SizeUpdater.js");

            return new SizeUpdater();
        },
        refresh,
    );
}
