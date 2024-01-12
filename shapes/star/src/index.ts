import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadStarShape(engine: Engine, refresh = true): Promise<void> {
    const { StarDrawer } = await import("./StarDrawer.js");

    await engine.addShape("star", new StarDrawer(), refresh);
}
