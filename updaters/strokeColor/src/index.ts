import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStrokeColorUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "strokeColor",
        async container => {
            const { StrokeColorUpdater } = await import("./StrokeColorUpdater.js");

            return new StrokeColorUpdater(container);
        },
        refresh,
    );
}
