import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadColorUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "color",
        async container => {
            const { ColorUpdater } = await import("./ColorUpdater.js");

            return new ColorUpdater(container);
        },
        refresh,
    );
}
