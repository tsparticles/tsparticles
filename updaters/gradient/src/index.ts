import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadGradientUpdater(engine: Engine, refresh = true): Promise<void> {
    const { GradientUpdater } = await import("./GradientUpdater.js");

    await engine.addParticleUpdater("gradient", () => new GradientUpdater(), refresh);
}
