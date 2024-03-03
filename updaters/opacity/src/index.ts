import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine instance to load the updater for
 * @param refresh -
 */
export async function loadOpacityUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "opacity",
        async container => {
            const { OpacityUpdater } = await import("./OpacityUpdater.js");

            return new OpacityUpdater(container);
        },
        refresh,
    );
}
