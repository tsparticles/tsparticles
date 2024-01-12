import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStrokeColorUpdater(engine: Engine, refresh = true): Promise<void> {
    const { StrokeColorUpdater } = await import("./StrokeColorUpdater.js");

    await engine.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container), refresh);
}
