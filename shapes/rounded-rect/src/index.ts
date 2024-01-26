import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRoundedRectShape(engine: Engine, refresh = true): Promise<void> {
    const { RoundedRectDrawer } = await import("./RoundedRectDrawer.js");

    await engine.addShape("rounded-rect", new RoundedRectDrawer(), refresh);
}
