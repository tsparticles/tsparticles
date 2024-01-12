import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRotateUpdater(engine: Engine, refresh = true): Promise<void> {
    const { RotateUpdater } = await import("./RotateUpdater.js");

    await engine.addParticleUpdater("rotate", (container) => new RotateUpdater(container), refresh);
}
