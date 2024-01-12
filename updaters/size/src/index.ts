import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSizeUpdater(engine: Engine, refresh = true): Promise<void> {
    const { SizeUpdater } = await import("./SizeUpdater.js");

    await engine.addParticleUpdater("size", () => new SizeUpdater(), refresh);
}
