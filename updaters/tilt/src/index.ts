import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine to load the updater for
 * @param refresh -
 */
export async function loadTiltUpdater(engine: Engine, refresh = true): Promise<void> {
    const { TiltUpdater } = await import("./TiltUpdater.js");

    await engine.addParticleUpdater("tilt", (container) => new TiltUpdater(container), refresh);
}
