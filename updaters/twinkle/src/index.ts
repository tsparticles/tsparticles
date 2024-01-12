import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTwinkleUpdater(engine: Engine, refresh = true): Promise<void> {
    const { TwinkleUpdater } = await import("./TwinkleUpdater.js");

    await engine.addParticleUpdater("twinkle", () => new TwinkleUpdater(), refresh);
}
