import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine instance to load the updater for
 * @param refresh -
 */
export async function loadOpacityUpdater(engine: Engine, refresh = true): Promise<void> {
    const { OpacityUpdater } = await import("./OpacityUpdater.js");

    await engine.addParticleUpdater("opacity", (container) => new OpacityUpdater(container), refresh);
}
