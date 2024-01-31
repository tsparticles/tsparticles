import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadGradientUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "gradient",
        async () => {
            const { GradientUpdater } = await import("./GradientUpdater.js");

            return new GradientUpdater();
        },
        refresh,
    );
}
