import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTwinkleUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "twinkle",
        async () => {
            const { TwinkleUpdater } = await import("./TwinkleUpdater.js");

            return new TwinkleUpdater();
        },
        refresh,
    );
}
