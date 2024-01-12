import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParallaxMover(engine: Engine, refresh = true): Promise<void> {
    const { ParallaxMover } = await import("./ParallaxMover.js");

    await engine.addMover("parallax", () => new ParallaxMover(), refresh);
}
