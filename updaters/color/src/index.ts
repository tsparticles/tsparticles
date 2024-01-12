import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadColorUpdater(engine: Engine, refresh = true): Promise<void> {
    const { ColorUpdater } = await import("./ColorUpdater.js");

    await engine.addParticleUpdater("color", (container) => new ColorUpdater(container), refresh);
}
